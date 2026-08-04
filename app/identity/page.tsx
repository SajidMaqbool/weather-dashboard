import React from "react";

export default function IdentityKitPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] p-8 md:p-16 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-[#38bdf8] mb-2">
          Identity Kit
        </h1>
        <p className="text-[#94a3b8]">
          Design tokens, typography, palette, and style guidelines for WeatherPulse.
        </p>
      </div>

      {/* Logo / Favicon Section */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">1. Logo / Monogram</h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#38bdf8] text-[#0f172a] flex items-center justify-center font-bold text-2xl shadow-lg">
            WP
          </div>
          <div>
            <span className="text-2xl font-bold tracking-tight text-[#f8fafc]">
              Weather<span className="text-[#38bdf8]">Pulse</span>
            </span>
            <p className="text-xs text-[#94a3b8]">Clean monogram & typography logo</p>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">2. Typography</h2>
        <div className="space-y-2">
          <p className="text-sm text-[#94a3b8]">Font Family: <strong className="text-white">Inter</strong> (Google Font)</p>
          <div className="p-4 bg-[#0f172a] rounded-lg space-y-2">
            <h3 className="text-2xl font-bold text-[#f8fafc]">Heading Preview (Bold - Inter)</h3>
            <p className="text-base text-[#94a3b8]">
              Body Text Preview: Crisp, highly legible sans-serif type for displaying weather metrics and forecasts seamlessly across all screen sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">3. Color Palette</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="h-20 bg-[#0f172a] rounded-lg border border-slate-700"></div>
            <p className="text-xs font-mono">#0f172a</p>
            <p className="text-xs text-[#94a3b8]">Background</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-[#1e293b] rounded-lg border border-slate-700"></div>
            <p className="text-xs font-mono">#1e293b</p>
            <p className="text-xs text-[#94a3b8]">Surface / Card</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-[#f8fafc] rounded-lg"></div>
            <p className="text-xs font-mono">#f8fafc</p>
            <p className="text-xs text-[#94a3b8]">Primary Text</p>
          </div>
          <div className="space-y-2">
            <div className="h-20 bg-[#38bdf8] rounded-lg"></div>
            <p className="text-xs font-mono">#38bdf8</p>
            <p className="text-xs text-[#94a3b8]">Accent Sky</p>
          </div>
        </div>
      </section>

      {/* Style Note */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-2">
        <h2 className="text-xl font-semibold text-slate-200">4. Two-Line Style Note</h2>
        <blockquote className="p-4 bg-[#0f172a] rounded-lg italic text-[#94a3b8] border-l-4 border-[#38bdf8]">
          "Font: Inter (Headings & Body). Palette: Background #0f172a, Text #f8fafc, Surface #1e293b, Accent #38bdf8. Mood: Minimalist, calm, and modern atmosphere framing weather metrics cleanly."
        </blockquote>
      </section>
    </div>
  );
}