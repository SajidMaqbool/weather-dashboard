async function getHealthData() {
  return {
    status: "ok",
    uptime: "99.99%",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  };
}

export default async function HealthPage() {
  const data = await getHealthData();

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center gap-3">
        <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
        <h1 className="text-2xl font-bold text-slate-100">System Health Check</h1>
      </div>

      <div className="p-6 rounded-xl border border-slate-800 bg-slate-950/60 font-mono text-sm space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-500">STATUS:</span>
          <span className="text-emerald-400 font-semibold">{data.status.toUpperCase()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">UPTIME:</span>
          <span className="text-slate-300">{data.uptime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">ENVIRONMENT:</span>
          <span className="text-slate-300">{data.environment}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">FETCH TIMESTAMP:</span>
          <span className="text-slate-300">{data.timestamp}</span>
        </div>
      </div>
    </div>
  );
}