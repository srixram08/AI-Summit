import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight,
  Cpu,
  HardDrive,
  Clock,
  Server,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  AlertTriangle
} from 'lucide-react';
import { KpiCard } from '../components/dashboard/KpiCard';
import { TelemetryChart } from '../components/dashboard/TelemetryChart';
import { RecommendationCard } from '../components/dashboard/RecommendationCard';
import { ENTERPRISE_ROI_DATA } from '../data/governanceData';

export function Dashboard({ 
  clusterHealth, 
  telemetry, 
  recommendations, 
  onNavigateToAssurance 
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Filter recommendations based on active tab
  const filteredRecommendations = (recommendations || []).filter((rec) => {
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'PENDING') return rec.status.toLowerCase().includes('pending');
    if (filterStatus === 'BLOCKED') return rec.status.toLowerCase().includes('blocked');
    if (filterStatus === 'AUTO') return rec.status.toLowerCase().includes('auto');
    return true;
  });

  const latestCpu = telemetry && telemetry.length > 0 ? telemetry[telemetry.length - 1].cpu : (clusterHealth?.cpu || 78);
  const latestMem = telemetry && telemetry.length > 0 ? telemetry[telemetry.length - 1].memory : (clusterHealth?.memory || 71);
  const latestLatency = telemetry && telemetry.length > 0 ? telemetry[telemetry.length - 1].latency : (clusterHealth?.latency || 42);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner / Cluster Context Bar */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#092218] text-[#34d399] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-[#092218]">
                {clusterHealth?.name || "Vector Production Cluster (us-east-1)"}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5]">
                {clusterHealth?.region || "AWS us-east-1"}
              </span>
            </div>
            <p className="text-xs text-[#526d60] mt-0.5 font-medium flex items-center gap-2">
              <span>Kubernetes: <strong className="font-mono text-[#092218]">{clusterHealth?.kubernetesVersion || "v1.30.2-eks"}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#059669]">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                Live Telemetry Synchronized
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToAssurance('safe')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#092218] hover:bg-[#163e2e] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:scale-[1.01] cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#34d399]" />
            <span>Simulate AI Decision</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Enterprise Operational Impact Summary Bar */}
      <div className="bg-[#092218] text-white rounded-2xl p-4 sm:p-5 border border-[#163e2e] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#163e2e] text-[#34d399] flex items-center justify-center flex-shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#34d399] uppercase">
                Vector Operational Impact (Simulated)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-[#163e2e] text-[#a7f3d0]">
                Demo Metrics
              </span>
            </div>
            <p className="text-xs text-[#86a394] mt-0.5 font-mono">
              Potential Downtime Avoided: <strong className="text-white">18 min</strong> • Risky Actions Blocked: <strong className="text-[#fca5a5]">7</strong> • Estimated Cost Avoided: <strong className="text-[#34d399]">{ENTERPRISE_ROI_DATA.costAvoidedFormatted}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateToAssurance('dangerous')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#163e2e] hover:bg-[#205740] border border-[#2b654c] text-white font-mono font-bold text-xs transition-all cursor-pointer flex-shrink-0"
        >
          <span>Inspect Blocked Scenario</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#34d399]" />
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Trust Score"
          value={clusterHealth?.trustScore || 91}
          unit="/100"
          subtitle="Pre-Execution Confidence"
          status="safe"
          trend="+3.2%"
          trendDirection="up"
          icon={ShieldCheck}
        />
        <KpiCard
          title="Cluster CPU"
          value={latestCpu}
          unit="%"
          subtitle="Across 18 worker nodes"
          status="warning"
          trend={clusterHealth?.cpuTrend || "+2.4%"}
          trendDirection="up"
          icon={Cpu}
        />
        <KpiCard
          title="Memory Usage"
          value={latestMem}
          unit="%"
          subtitle="56.8 GB / 80 GB Allocated"
          status="healthy"
          trend={clusterHealth?.memoryTrend || "-0.8%"}
          trendDirection="down"
          icon={HardDrive}
        />
        <KpiCard
          title="P99 API Latency"
          value={latestLatency}
          unit="ms"
          subtitle="Inventra API Gateway"
          status="safe"
          trend={clusterHealth?.latencyTrend || "-3ms"}
          trendDirection="down"
          icon={Clock}
        />
      </div>

      {/* Telemetry Real-time Sliding Buffer Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <TelemetryChart
          title="CPU Utilization"
          dataKey="cpu"
          data={telemetry || []}
          color="#059669"
          unit="%"
          currentValue={latestCpu}
          domain={[40, 100]}
          trendLabel="Operating in Range"
          icon={Cpu}
        />
        <TelemetryChart
          title="Memory Consumption"
          dataKey="memory"
          data={telemetry || []}
          color="#2563eb"
          unit="%"
          currentValue={latestMem}
          domain={[40, 100]}
          trendLabel="Safe Headroom"
          icon={HardDrive}
        />
        <TelemetryChart
          title="P99 Latency (Response)"
          dataKey="latency"
          data={telemetry || []}
          color="#d97706"
          unit="ms"
          currentValue={latestLatency}
          domain={[20, 100]}
          trendLabel="Optimal SLA"
          icon={Clock}
        />
      </div>

      {/* AI Recommendations & Decision Intercepts Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#059669]" />
              <h2 className="text-base sm:text-lg font-extrabold text-[#092218]">
                AI-Generated Action Pipeline (Pre-Execution Intercepts)
              </h2>
            </div>
            <p className="text-xs text-[#526d60] mt-0.5">
              Vector intercepts autonomous AIOps agent proposals to verify safety, blast radius, and policy constraints before cluster execution.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white border border-[#e2ede5] rounded-xl text-xs font-mono">
            {[
              { id: 'ALL', label: 'All Actions' },
              { id: 'PENDING', label: 'Pending' },
              { id: 'BLOCKED', label: 'Blocked' },
              { id: 'AUTO', label: 'Auto Exec' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  filterStatus === tab.id
                    ? 'bg-[#092218] text-white shadow-xs'
                    : 'text-[#526d60] hover:text-[#092218] hover:bg-[#edf5ee]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* List of Recommendation Cards */}
        <div className="space-y-3">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onInspect={(scenarioKey) => onNavigateToAssurance(scenarioKey)}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#e2ede5]">
              <p className="text-xs font-mono text-[#526d60]">No actions match the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
