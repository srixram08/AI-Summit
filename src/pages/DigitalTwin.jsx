import React from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  Globe, 
  Server, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Activity,
  AlertTriangle,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { ArchitectureTopology } from '../components/assurance/ArchitectureTopology';
import { StatusDot } from '../components/common/StatusDot';
import { Badge } from '../components/common/Badge';

export function DigitalTwin({
  assuranceResult,
  currentScenario,
  onSelectScenario,
  onNavigateToAssurance
}) {
  const isDangerous = currentScenario === 'dangerous';

  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-[#0d1424] rounded-2xl border border-slate-800/80 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Digital Twin Sandbox
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/60">
                100% Isolated Manifest Simulation
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
              Synthetic Infrastructure Replica: Inventra ERP
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl font-sans">
              The Vector Digital Twin mirrors production topology in an offline virtual sandbox. When an AI agent proposes a change, Vector executes synthetic load profiles against this twin to measure cascading failures before applying manifests to production.
            </p>
          </div>

          <button
            onClick={() => onNavigateToAssurance(currentScenario)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,245,155,0.25)] flex-shrink-0 cursor-pointer self-start md:self-auto"
          >
            <span>Proceed to Decision Assurance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Connected Architecture Topology */}
      <ArchitectureTopology scenarioResult={assuranceResult} />

      {/* Simulation Controls & Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simulation Parameter Inspector */}
        <div className="bg-[#0d1424] rounded-xl border border-slate-800/80 p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Simulation Testbed Controls
              </h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Active Scenario: <strong className="text-white">{currentScenario.toUpperCase()}</strong>
            </span>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onSelectScenario('safe')}
              className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                !isDangerous
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_15px_rgba(0,245,155,0.1)]'
                  : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Scenario A</span>
                  <Badge variant="safe" size="sm">SAFE</Badge>
                </div>
                <div className="text-sm font-semibold text-white mt-1">Scale API 3 → 6 replicas</div>
                <p className="text-xs text-slate-400 mt-0.5">Absorbs +34% traffic; downstream DB pool at 72%.</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-emerald-400 font-bold block">Score: 91</span>
                <span className="text-[10px] text-slate-400">AUTO EXECUTE</span>
              </div>
            </button>

            <button
              onClick={() => onSelectScenario('dangerous')}
              className={`w-full p-3.5 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                isDangerous
                  ? 'bg-rose-950/20 border-rose-500/50 shadow-[0_0_15px_rgba(255,51,75,0.1)]'
                  : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase">Scenario B</span>
                  <Badge variant="danger" size="sm">DANGEROUS</Badge>
                </div>
                <div className="text-sm font-semibold text-white mt-1">Scale API 3 → 20 replicas</div>
                <p className="text-xs text-slate-400 mt-0.5">Surges API; causes 210% DB pool exhaustion.</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-rose-400 font-bold block">Score: 58</span>
                <span className="text-[10px] text-slate-400">BLOCKED</span>
              </div>
            </button>
          </div>
        </div>

        {/* Live Comparison Metrics */}
        <div className="bg-[#0d1424] rounded-xl border border-slate-800/80 p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Live Production vs Twin Projected
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">
              Deterministic Twin Engine
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-[#0a0f1d] border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">API Pods</span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Prod: 3</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                <span className={`font-bold ${isDangerous ? 'text-rose-400' : 'text-emerald-400'}`}>
                  Twin: {assuranceResult.proposedReplicas}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0a0f1d] border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">API Gateway CPU</span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Prod: 78%</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                <span className={`font-bold ${isDangerous ? 'text-amber-400' : 'text-emerald-400'}`}>
                  Twin: {assuranceResult.telemetryImpact.cpuAfter}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0a0f1d] border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Database Connection Pool</span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Prod: 64%</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                <span className={`font-bold ${isDangerous ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                  Twin: {assuranceResult.telemetryImpact.dbPool}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#0a0f1d] border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400">Edge Response Latency</span>
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Prod: 42ms</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                <span className={`font-bold ${isDangerous ? 'text-rose-400' : 'text-emerald-400'}`}>
                  Twin: {assuranceResult.telemetryImpact.latencyAfter}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
