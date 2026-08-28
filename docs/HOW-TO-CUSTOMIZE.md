# How to Customize — Undangan Digital Elegan

Panduan ini menjelaskan cara menyesuaikan website undangan digital **Adinda & Raka** tanpa mengubah struktur aplikasi secara besar. Proyek menggunakan React, TypeScript, Vite, Tailwind CSS, dan aset visual yang disimpan melalui penyimpanan proyek WebDev.

> **File utama untuk kustomisasi:** `client/src/pages/Home.tsx`, `client/src/index.css`, dan `client/index.html`.

## 1. Menjalankan Website Secara Lokal

Pastikan Node.js dan pnpm tersedia, kemudian jalankan perintah berikut dari root repository:

```bash
pnpm install
pnpm dev
```

Untuk memeriksa tipe dan membuat build produksi:

```bash
pnpm check
pnpm build
```

Perubahan pada file frontend akan dimuat ulang otomatis oleh Vite saat mode development berjalan.

## 2. Mengubah Nama Pasangan, Tanggal, dan Teks

Sebagian besar konten undangan berada di `client/src/pages/Home.tsx`. Cari teks pasangan pada cover, navigasi, hero, cerita, acara, RSVP, hadiah, dan footer, lalu ganti langsung sesuai kebutuhan.

| Bagian | Contoh teks saat ini | Lokasi di `Home.tsx` |
|---|---|---|
| Cover | `Adinda & Raka` | Komponen cover sebelum `if (!opened)` |
| Tanggal | `14 · 02 · 2027` | Cover dan countdown |
| Kota | `Seminyak, Bali` | Detail acara |
| Akad | `16.00 — 17.00 WITA` | Kartu acara pertama |
| Resepsi | `18.00 — selesai` | Kartu acara kedua |
| Rekening | `1234 5678 90` | Fungsi `copyAccount` dan bagian hadiah |
| Nama pemilik rekening | `Adinda Putri` | Bagian hadiah |

Countdown menggunakan tanggal ISO di dalam pemanggilan berikut:

```tsx
const countdown = useCountdown("2027-02-14T16:00:00+07:00");
```

Gunakan format ISO dengan zona waktu yang benar. Contoh untuk 10 Oktober 2027 pukul 16.00 WIB adalah `2027-10-10T16:00:00+07:00`.

## 3. Personalisasi Nama Tamu dari URL

Website membaca parameter URL bernama `to` pada halaman depan. Contoh URL berikut akan menampilkan “Keluarga Budi” pada cover:

```text
https://domain-anda.com/?to=Keluarga%20Budi
```

Spasi dapat ditulis sebagai `%20` atau `+`. Jika parameter `to` tidak dikirim, website menggunakan fallback `Bapak / Ibu / Saudara/i`.

Logika ini berada pada efek berikut:

```tsx
const [guestName, setGuestName] = useState("Bapak / Ibu / Saudara/i");

useEffect(() => {
  const raw = new URLSearchParams(window.location.search).get("to")?.trim();
  if (raw) setGuestName(raw.replace(/\+/g, " "));
}, []);
```

Jika ingin mengganti fallback, ubah nilai awal `guestName`. Untuk daftar tamu, buat URL unik per tamu dan gunakan URL tersebut pada undangan atau pesan WhatsApp.

## 4. Mengganti Foto Galeri dan Hero

Semua sumber foto didefinisikan pada array `gallery` dan elemen hero di `Home.tsx`:

```tsx
const gallery = [
  { src: "/manus-storage/gallery-01_7c43b00a.jpg", alt: "Detail undangan dan cap lilin" },
  { src: "/manus-storage/gallery-02_c6f1c7c2.jpg", alt: "Cincin pernikahan" },
  { src: "/manus-storage/gallery-03_0ba7dcde.jpg", alt: "Meja makan di taman" },
];
```

Untuk menambah atau mengganti aset, simpan file asli di luar folder project, kemudian unggah melalui alur aset WebDev. Gunakan storage path yang dikembalikan, bukan path lokal komputer. Jangan menyimpan foto besar di `client/public` atau `client/src/assets` karena dapat memperlambat deployment.

Setiap gambar harus memiliki `alt` yang menjelaskan isi visualnya. Jangan menggunakan foto yang sama berulang kali untuk hero dan galeri kecuali memang diperlukan.

## 5. Mengganti Logo atau Mark

Mark digunakan pada cover, navigasi, dan footer melalui path berikut:

```tsx
/manus-storage/brand-mark_b7be897b.png
```

Gunakan PNG transparan dengan bentuk yang sederhana dan mudah dikenali. Jika mengganti mark, perbarui semua kemunculan path tersebut di `Home.tsx`. Ukuran tampilan mark diatur oleh kelas `.brand-mark` pada `client/src/index.css`.

## 6. Mengganti Musik Latar

Elemen audio berada di dalam root `.site-shell`:

```tsx
<audio
  ref={audioRef}
  src="/manus-storage/arsip-senja-ambient_f76d1b79.mp3"
  loop
  preload="auto"
  aria-label="Musik latar undangan"
/>
```

Untuk mengganti lagu, unggah file audio baru dan ubah nilai `src` ke storage path baru. Format MP3 yang terkompresi dengan baik disarankan agar waktu muat tetap ringan.

Volume awal diatur pada `.28` di dalam efek ketika undangan dibuka:

```tsx
audioRef.current.volume = .28;
```

Nilai berada pada rentang `0` sampai `1`. Gunakan volume rendah agar musik tidak mengganggu pembacaan isi undangan. Pemutaran otomatis dipicu setelah pengguna menekan tombol **Buka Undangan**, karena browser modern dapat membatasi autoplay sebelum ada interaksi pengguna. Tombol kontrol berada di navigasi atas dan memiliki label aksesibilitas dinamis.

## 7. Mengubah Validasi dan Isi Form RSVP

Form RSVP berada di section dengan id `rsvp`. Saat ini tiga data wajib diisi: nama, konfirmasi kehadiran, dan pesan ucapan. Pesan dibatasi 200 karakter menggunakan `maxLength` serta divalidasi ulang saat submit:

```tsx
if (!name || !attending || !message) {
  toast.error("Nama, kehadiran, dan ucapan wajib diisi.");
  return;
}

if (message.length > 200) {
  toast.error("Ucapan maksimal 200 karakter.");
  return;
}
```

Batas karakter dapat diganti secara konsisten pada tiga tempat: `maxLength={200}`, kondisi `message.length > 200`, dan teks penghitung karakter `{messageLength} / 200 karakter`.

Data ucapan saat ini disimpan di browser pengunjung menggunakan key localStorage berikut:

```text
adinda-raka-wishes
```

Konsekuensinya, ucapan belum tersimpan lintas perangkat dan belum dapat dilihat oleh pemilik undangan dari perangkat lain. Untuk kebutuhan produksi, integrasikan RSVP dengan database dan endpoint backend sebelum membagikan website secara luas.

## 8. Mengubah Warna dan Tipografi

Token visual utama berada di bagian `:root` pada `client/src/index.css`:

| Token | Nilai saat ini | Fungsi |
|---|---|---|
| `--ink` | `#2d2924` | Teks utama |
| `--paper` | `#f5f0e9` | Latar ivory |
| `--terracotta` | `#a6533b` | Warna brand dan CTA |
| `--sage` | `#758371` | Section galeri |
| `--gold` | `#b48b56` | Aksen emas |
| `--line` | `#d8ccc0` | Garis dan border |

Font dimuat dari Google Fonts pada baris `@import` di `index.css`. Sistem saat ini menggunakan **Cormorant Garamond** untuk judul dan **DM Sans** untuk teks pendukung. Jika mengganti font, perbarui import dan seluruh deklarasi font-family yang relevan agar hierarki tetap konsisten.

## 9. Mengubah Navigasi dan Section

Navigasi desktop berada di `.site-nav`. Pada mobile, hamburger tidak digunakan; website memakai `.bottom-nav` sticky dengan tombol **Atas, Acara, Galeri, dan RSVP**. Untuk menambah item navigasi, tambahkan tombol baru dengan target id section yang sudah ada:

```tsx
<button onClick={() => scrollTo("story")}>
  <Heart size={16} />
  <span>Cerita</span>
</button>
```

Pastikan target section memiliki `id` unik. Pada mobile, bottom navigation memakai `position: fixed`, sehingga aturan spacing pada footer perlu dipertahankan agar konten terakhir tidak tertutup oleh bar navigasi.

## 10. Mengubah Animasi Scroll

Animasi section menggunakan atribut `data-reveal` dan `IntersectionObserver`. Section akan memulai dari opacity rendah dengan sedikit pergeseran ke bawah, lalu mendapatkan kelas `.is-visible` saat masuk viewport.

Untuk mengatur karakter animasi, ubah deklarasi berikut di `index.css`:

```css
.section-pad[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .75s var(--ease-out), transform .75s var(--ease-out);
}
```

Jangan menghapus dukungan `prefers-reduced-motion`. Pengguna yang menonaktifkan animasi sistem harus tetap dapat membaca seluruh konten tanpa menunggu transisi.

## 11. Menyesuaikan Metadata Browser

Judul halaman, bahasa, deskripsi, dan warna tema berada di `client/index.html`:

```html
<html lang="id">
<title>Adinda & Raka — The Wedding</title>
<meta name="description" content="Undangan pernikahan Adinda dan Raka, 14 Februari 2027 di Bali." />
<meta name="theme-color" content="#f5f0e9" />
```

Ganti title dan description agar sesuai dengan pasangan, tanggal, serta lokasi yang sebenarnya. Gunakan deskripsi singkat yang jelas karena dapat muncul saat URL dibagikan.

## 12. Checklist Sebelum Membagikan Undangan

Pastikan seluruh data pasangan, tanggal, jam, lokasi, link peta, rekening, foto, dan musik telah diganti. Uji URL personal seperti `?to=Nama%20Tamu` di desktop dan mobile. Buka undangan dari awal untuk memastikan musik mulai setelah interaksi, kemudian coba pause dan play kembali. Isi RSVP dengan data kosong dan pesan lebih dari 200 karakter untuk memastikan validasi aktif.

Terakhir, jalankan pemeriksaan berikut:

```bash
pnpm check
pnpm build
```

Setelah hasilnya berhasil, simpan checkpoint proyek agar perubahan tersinkron ke repository GitHub dan versi terbaru website dipublikasikan oleh konfigurasi WebDev yang aktif.

## Struktur File Ringkas

```text
client/
  index.html                 # Metadata browser dan SEO dasar
  src/
    App.tsx                  # Root aplikasi
    index.css                # Token visual, layout, responsive CSS, animasi
    pages/Home.tsx           # Konten dan interaksi utama undangan
    components/ui/           # Komponen UI bawaan template

docs/
  HOW-TO-CUSTOMIZE.md        # Panduan ini
```

Jika menambahkan fitur besar seperti database RSVP, autentikasi, moderasi ucapan, atau dashboard admin, rencanakan upgrade dari project static ke full-stack sebelum implementasi.
