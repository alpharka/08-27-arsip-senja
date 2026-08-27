import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, ChevronDown, Clock3, Copy, Gift, Heart, MapPin, Menu, Music2, Navigation, Send, X } from "lucide-react";
import { toast } from "sonner";

/* Arsip Senja: editorial romanticism, warm tactile surfaces, asymmetrical spreads, gentle human pacing. */
const gallery = [
  { src: "/manus-storage/gallery-01_7c43b00a.jpg", alt: "Detail undangan dan cap lilin" },
  { src: "/manus-storage/gallery-02_c6f1c7c2.jpg", alt: "Cincin pernikahan" },
  { src: "/manus-storage/gallery-03_0ba7dcde.jpg", alt: "Meja makan di taman" },
];

function useCountdown(target: string) {
  const calculate = () => {
    const difference = Math.max(0, new Date(target).getTime() - Date.now());
    return {
      days: Math.floor(difference / 86400000),
      hours: Math.floor((difference / 3600000) % 24),
      minutes: Math.floor((difference / 60000) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calculate);
  useEffect(() => { const timer = window.setInterval(() => setTime(calculate()), 1000); return () => window.clearInterval(timer); }, [target]);
  return time;
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const countdown = useCountdown("2027-02-14T16:00:00+07:00");
  const dateLabel = useMemo(() => new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date("2027-02-14T16:00:00+07:00")), []);

  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const copyAccount = async () => { await navigator.clipboard?.writeText("1234 5678 90"); setCopied(true); toast.success("Nomor rekening berhasil disalin"); window.setTimeout(() => setCopied(false), 2200); };

  if (!opened) return (
    <main className="cover-screen">
      <div className="cover-image" />
      <div className="cover-overlay" />
      <div className="cover-content"><div className="cover-paper-note"><span>INVITATION No. 014</span><span>SEMINYAK · BALI</span></div>
        <div className="cover-seal"><img className="brand-mark cover-mark" src="/manus-storage/brand-mark_b7be897b.png" alt="Mark dua daun" /><span>14 · 02 · 27</span></div>
        <p className="eyebrow light">A note from Adinda & Raka</p>
        <h1 className="cover-title">Adinda <em>&</em> Raka</h1>
        <p className="cover-date">14 · 02 · 2027</p>
        <div className="cover-divider" />
        <p className="cover-guest">Kepada Yth.<br /><strong>Bapak / Ibu / Saudara/i</strong></p>
        <button className="button button-light" onClick={() => setOpened(true)}><span>Buka Undangan</span><ChevronDown size={15} /></button>
        <p className="cover-note">Untuk sebuah sore yang ingin kami bagi bersama.</p>
      </div>
    </main>
  );

  return (
    <div className="site-shell">
      <header className="site-nav">
        <button className="nav-brand" onClick={() => scrollTo("home")} aria-label="Kembali ke atas"><img className="brand-mark" src="/manus-storage/brand-mark_b7be897b.png" alt="" /><span>Adinda <i>&</i> Raka</span></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button onClick={() => scrollTo("story")}>Cerita</button><button onClick={() => scrollTo("event")}>Acara</button><button onClick={() => scrollTo("gallery")}>Galeri</button><button onClick={() => scrollTo("rsvp")}>RSVP</button>
        </nav>
        <button className={playing ? "music-toggle playing" : "music-toggle"} onClick={() => { setPlaying(!playing); toast.info(playing ? "Musik dijeda" : "Musik dinyalakan"); }} aria-label="Toggle musik"><Music2 size={17} /></button>
      </header>

      <main id="home">
        <section className="hero-section">
          <div className="hero-copy"><p className="eyebrow">Save the date · Bali, Indonesia</p><h1>Two paths.<br /><em>One home.</em></h1><p className="hero-intro">Dengan penuh sukacita, kami mengundang Anda untuk menjadi bagian dari hari ketika dua cerita memilih satu arah.</p><button className="text-link" onClick={() => scrollTo("event")}>Lihat detail acara <span>↘</span></button></div>
          <div className="hero-visual"><img src="/manus-storage/hero-bali-editorial_90d0a330.jpg" alt="Suasana taman untuk pernikahan" /><div className="hero-caption"><span>01 / 04</span><span>an afternoon in Bali</span></div></div>
          <div className="hero-stamp">A<br />R</div>
        </section>

        <section className="welcome-section section-pad" id="story"><div className="section-kicker">01 — A note from us</div><div className="welcome-grid"><div><p className="display-quote">“Yang terbaik dari perjalanan adalah menemukan seseorang yang membuat setiap tempat terasa seperti pulang.”</p><div className="signature">Dengan hangat,<br /><strong>Adinda & Raka</strong></div></div><div className="welcome-aside"><p>Setelah bertumbuh dalam dua dunia yang berbeda, kami dipertemukan dalam satu percakapan sederhana. Hari ini, kami merayakan bukan hanya sebuah pernikahan, tetapi juga semua langkah kecil yang membawa kami ke sini.</p><span className="aside-line" /></div></div></section>

        <section className="event-section section-pad" id="event"><div className="section-kicker">02 — Mark the day</div><div className="event-heading"><div><h2>Save our<br /><em>afternoon.</em></h2></div><p>{dateLabel}<br /><span>Seminyak, Bali</span></p></div><div className="countdown">{Object.entries(countdown).map(([key, value]) => <div className="count-item" key={key}><strong>{String(value).padStart(2, "0")}</strong><span>{key}</span></div>)}</div><div className="event-cards"><article><div className="event-icon"><Heart size={17} /></div><p className="eyebrow">Akad nikah</p><h3>16.00 — 17.00 WITA</h3><p>Conrad Bali<br />Jl. Pratama No. 168, Tanjung Benoa</p><a href="https://maps.google.com/?q=Conrad+Bali" target="_blank" rel="noreferrer"><Navigation size={14} /> Buka peta</a></article><article><div className="event-icon"><Gift size={17} /></div><p className="eyebrow">Resepsi</p><h3>18.00 — selesai</h3><p>The Garden Terrace<br />Dress code: earth tones</p><a href="https://maps.google.com/?q=Conrad+Bali" target="_blank" rel="noreferrer"><MapPin size={14} /> Lihat lokasi</a></article></div></section>

        <section className="gallery-section section-pad" id="gallery"><div className="section-kicker">03 — Little details</div><div className="gallery-heading"><h2>A day to<br /><em>remember.</em></h2><p>Potongan kecil dari hari yang akan kami simpan selamanya.</p></div><div className="gallery-grid">{gallery.map((item, i) => <figure key={item.src} className={`gallery-item gallery-${i + 1}`}><img src={item.src} alt={item.alt} /><figcaption>0{i + 1} / {item.alt}</figcaption></figure>)}</div></section>

        <section className="rsvp-section section-pad" id="rsvp"><div className="rsvp-card"><div className="section-kicker">04 — Be with us</div><h2>Titipkan<br /><em>doa untuk kami.</em></h2><p>Mohon konfirmasi kehadiran Anda sebelum 31 Januari 2027.</p><form onSubmit={(e) => { e.preventDefault(); toast.success("Terima kasih, konfirmasi Anda sudah tercatat."); }}><label>Nama lengkap<input required placeholder="Tulis nama Anda" /></label><label>Konfirmasi kehadiran<select defaultValue=""><option value="" disabled>Pilih jawaban</option><option>Dengan senang hati, hadir</option><option>Maaf, belum dapat hadir</option></select></label><label>Pesan untuk kami<textarea placeholder="Doa dan ucapan baik Anda..." rows={3} /></label><button className="button button-dark" type="submit">Kirim konfirmasi <Send size={15} /></button></form></div></section>

        <section className="gift-section section-pad"><div className="gift-copy"><div className="section-kicker">05 — A little gift</div><h2>Doa Anda<br /><em>adalah hadiah.</em></h2><p>Bagi yang berkenan berbagi tanda kasih, dapat melalui rekening berikut.</p></div><div className="gift-account"><div><p className="eyebrow">Bank Central Asia</p><strong>1234 5678 90</strong><p>a.n. Adinda Putri</p></div><button onClick={copyAccount} aria-label="Salin nomor rekening">{copied ? <Check size={17} /> : <Copy size={17} />}</button></div></section>
      </main>
      <footer className="footer"><img className="brand-mark" src="/manus-storage/brand-mark_b7be897b.png" alt="" /><p>See you under the Bali sun.</p><span>Adinda & Raka · 2027</span></footer>
    </div>
  );
}
