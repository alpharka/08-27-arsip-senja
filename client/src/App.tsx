import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

/* Arsip Senja: the application shell stays quiet so the invitation content owns the experience. */
export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><Home /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
