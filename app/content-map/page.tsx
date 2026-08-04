import React from "react";

export default function ContentMapPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] p-8 md:p-16 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-[#38bdf8] mb-2">
          Through-Line & Content Map
        </h1>
        <p className="text-[#94a3b8]">
          Application architecture, one-line claim, section ordering, and call-to-action ladder.
        </p>
      </div>

      {/* One-Line Claim */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">1. One-Line Claim (The Anchor)</h2>
        <blockquote className="p-4 bg-[#0f172a] rounded-lg border-l-4 border-[#38bdf8] text-lg font-medium text-white">
          "I build production-ready, data-driven Next.js applications that deliver real-time insights with ultra-fast performance."
        </blockquote>
      </section>

      {/* Content Map Table */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">2. Page Structure & Action Ladder</h2>
        <div className="space-y-6">
          {/* Home */}
          <div className="p-4 bg-[#0f172a] rounded-lg border border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#38bdf8]">Home Page (/)</h3>
              <span className="text-xs px-2 py-1 bg-sky-500/10 text-[#38bdf8] rounded font-mono">CTA: Explore Live Dashboard</span>
            </div>
            <p className="text-xs text-[#94a3b8]"><strong>Sections:</strong> Hero (Claim) → Lead Project Showcase (WeatherPulse) → System Architecture Highlights → Identity Links</p>
          </div>

          {/* Dashboard */}
          <div className="p-4 bg-[#0f172a] rounded-lg border border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#38bdf8]">Dashboard Page (/dashboard)</h3>
              <span className="text-xs px-2 py-1 bg-sky-500/10 text-[#38bdf8] rounded font-mono">CTA: View Forecast Details</span>
            </div>
            <p className="text-xs text-[#94a3b8]"><strong>Sections:</strong> Live Search Bar → Primary Weather Card → Detailed Metrics Grid → Code Proof Footer</p>
          </div>

          {/* Identity & Manifest */}
          <div className="p-4 bg-[#0f172a] rounded-lg border border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-[#38bdf8]">System Design (/identity & /image-manifest)</h3>
              <span className="text-xs px-2 py-1 bg-sky-500/10 text-[#38bdf8] rounded font-mono">CTA: Check System Health</span>
            </div>
            <p className="text-xs text-[#94a3b8]"><strong>Sections:</strong> Design Tokens → Typography & Palette → AI Curation Audit → Rejection Log</p>
          </div>
        </div>
      </section>

      {/* Still Need to Gather List */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">3. Honest "Still Need to Gather" List</h2>
        <ul className="space-y-2 text-sm text-[#94a3b8] list-disc list-inside">
          <li><strong className="text-slate-200">OpenWeatherMap API Key:</strong> Configuring production secrets safely in Vercel environment.</li>
          <li><strong className="text-slate-200">Lighthouse Benchmarks:</strong> PageSpeed & Core Web Vitals audit metrics once API integration is live.</li>
          <li><strong className="text-slate-200">Dynamic Edge Case Screenshots:</strong> Real captures of error states (e.g., city not found, network retry).</li>
        </ul>
      </section>
    </div>
  );
}