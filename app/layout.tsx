import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "WeatherPulse - Foundations",
  description: "Phase 1 scaffolded weather application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 min-h-screen flex flex-col antialiased">
        <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="font-bold text-lg text-blue-400">WeatherPulse</div>
            <nav className="flex gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link>
              <Link href="/forecast" className="hover:text-blue-400 transition-colors">Forecast</Link>
              <Link href="/settings" className="hover:text-blue-400 transition-colors">Settings</Link>
              <Link href="/health" className="text-emerald-400 hover:underline">Health Check</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8">
          {children}
        </main>

        <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
          Phase 1 Foundations - Built with Next.js App Router
        </footer>
      </body>
    </html>
  );
}