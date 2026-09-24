import React from 'react';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  Layers,
  ArrowRight,
  Sparkles,
  Bot
} from 'lucide-react';
import { KpiCard } from '../components/dashboard/KpiCard';
import { TelemetryChart } from '../components/dashboard/TelemetryChart';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';

export function Dashboard({ 
  clusterHealth, 
  telemetry, 
  recommendations, 
  onNavigateToAssurance 
}) {
  const currentCpu = telemetry.length > 0 ? telemetry[telemetry.length - 1].cpu : clusterHealth.cpu;
  const currentMem = telemetry.length > 0 ? telemetry[telemetry.length - 1].memory : clusterHealth.memory;
  const currentLatency = telemetry.length > 0 ? telemetry[telemetry.length - 1].latency : clusterHealth.latency;

  return (
    <div className="space-y-6">
      {/* Hero Intercept Callout Banner */}
      <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-emerald-950/40 via-[#0d162a] to-cyan-950/30 border border-emerald-500/30 shadow-[0_0_30px_rgba(0,245,155,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(0,245,155,0.2)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                Pre-Execution Assurance Active
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% Intercept Rate
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-1">
              "What happens if an AI agent changes the infrastructure?"
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5 font-sans">
              Vector intercepts autonomous agent recommendations before execution, running deterministic Digital Twin simulations and policy guardrails.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToAssurance('safe')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,245,155,0.3)] hover:scale-[1.02] flex-shrink-0 cursor-pointer self-start md:self-auto"
        >
          <span>Simulate Hero Decision</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <KpiCard
          title="Cluster Health"
          value={clusterHealth.health}
          status="healthy"
          subtitle="All 18 nodes normal"
          icon={Activity}
        />
        <KpiCard
          title="Current CPU"
          value={currentCpu}
          unit="%"
          status={currentCpu > 85 ? 'warning' : 'safe'}
          subtitle="Cluster load"
          trend="+2.4%"
          trendDirection="up"
          icon={Cpu}
        />
        <KpiCard
          title="Memory"
          value={currentMem}
          unit="%"
          status="safe"
          subtitle="Allocated RAM"
          trend="-0.8%"
          trendDirection="down"
          icon={HardDrive}
        />
        <KpiCard
          title="Latency"
          value={currentLatency}
          unit="ms"
          status={currentLatency > 60 ? 'warning' : 'cyan'}
          subtitle="P95 edge latency"
          trend="-3ms"
          trendDirection="down"
          icon={Clock}
        />
        <KpiCard
          title="Trust Score"
          value={clusterHealth.trustScore}
          unit="/100"
          status="safe"
          subtitle="High Assurance"
          trend="+1.2"
          trendDirection="up"
          icon={ShieldCheck}
        />
        <KpiCard
          title="Active Incidents"
          value={clusterHealth.activeIncidents}
          status={clusterHealth.activeIncidents > 0 ? 'warning' : 'safe'}
          subtitle="Mitigated alert"
          icon={AlertTriangle}
        />
      </div>

      {/* 3 Telemetry Line Charts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white">
              Live Cluster Telemetry
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Auto-streaming every 2.5s • Synthetic NOC Feed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TelemetryChart
            title="CPU Utilization"
            dataKey="cpu"
            data={telemetry}
            color="#00f59b"
            unit="%"
            currentValue={currentCpu}
            domain={[40, 100]}
            trendLabel="Steady"
            icon={Cpu}
          />
          <TelemetryChart
            title="Memory Utilization"
            dataKey="memory"
            data={telemetry}
            color="#38bdf8"
            unit="%"
            currentValue={currentMem}
            domain={[40, 100]}
            trendLabel="Optimal"
            icon={HardDrive}
          />
          <TelemetryChart
            title="API Latency"
            dataKey="latency"
            data={telemetry}
            color="#a78bfa"
            unit="ms"
            currentValue={currentLatency}
            domain={[20, 100]}
            trendLabel="P95 Normal"
            icon={Clock}
          />
        </div>
      </div>

      {/* Recent AI Recommendations Panel */}
      <div className="bg-[#0d1424] rounded-2xl border border-slate-800/80 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-white">
                Recent AI Recommendations
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                5 Intercepted
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous agents propose changes. Vector evaluates safety, blast radius, and policy before allowing production execution.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Click <strong className="text-emerald-400">Assure in Twin</strong> to inspect decision logic
          </div>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              onInspect={(scenarioKey) => onNavigateToAssurance(scenarioKey)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
