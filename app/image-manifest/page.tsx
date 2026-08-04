import React from "react";

export default function ImageManifestPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] p-8 md:p-16 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-[#38bdf8] mb-2">
          Image Curation & Manifest
        </h1>
        <p className="text-[#94a3b8]">
          Ruthless curation log, AI discernment note, and real vs generated asset mapping.
        </p>
      </div>

      {/* Asset Audit Table */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">1. Final Asset Inventory (The Keepers)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#94a3b8]">
            <thead className="bg-[#0f172a] text-xs uppercase text-[#38bdf8]">
              <tr>
                <th className="p-3">Asset Needed</th>
                <th className="p-3">Source Type</th>
                <th className="p-3">Rationale / Strategic Call</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="p-3 font-medium text-white">Profile Photo</td>
                <td className="p-3 text-emerald-400 font-semibold">Real Photo</td>
                <td className="p-3">Personal headshot builds trust & authenticity. No AI avatars used.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-white">App UI Showcase</td>
                <td className="p-3 text-emerald-400 font-semibold">Real Capture</td>
                <td className="p-3">Actual screenshot of Next.js App Router live deployment to prove real code execution.</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-white">Weather Condition Icons</td>
                <td className="p-3 text-sky-400 font-semibold">AI Generated</td>
                <td className="p-3">Consistently styled minimal line-art vectors matching our #38bdf8 palette.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Discernment / Rejection Log */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">2. Discernment & AI Rejection Log</h2>
        <div className="p-4 bg-[#0f172a] rounded-lg border-l-4 border-rose-500 space-y-2">
          <p className="text-sm font-semibold text-rose-400">Rejected Image Concept:</p>
          <p className="text-sm text-slate-300">
            3D Hyper-realistic Glassmorphic Weather Icons with glossy light reflections and colorful ambient glows.
          </p>
          <p className="text-sm font-semibold text-sky-400 pt-2">Why It Was Rejected (Curatorial Judgment):</p>
          <p className="text-sm text-[#94a3b8]">
            Though visually flashy, the glossy 3D assets clashed with our strict <strong>Identity Kit</strong> guidelines (Minimalist, calm, and dark slate palette). The excessive reflections created cognitive clutter that distracted users from reading actual weather data metrics. We opted instead for unified 2D flat vector line-art that lets the weather content remain the loudest thing on the screen.
          </p>
        </div>
      </section>

      {/* Real Capture Call */}
      <section className="p-6 bg-[#1e293b] rounded-xl border border-slate-700/50 space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">3. Real Captures Over AI</h2>
        <p className="text-sm text-[#94a3b8]">
          Every instance showing software functionality (e.g., our Vercel deployments, Next.js routes, and responsive UI layout) uses <strong>100% unedited real application captures</strong>. AI generation was strictly limited to abstract secondary UI symbols (icons/textures) to ensure complete integrity in showing real engineering work.
        </p>
      </section>
    </div>
  );
}