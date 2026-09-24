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
import { WhatIfComparison } from '../components/common/WhatIfComparison';

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
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-[#0d5934] font-bold tracking-wider">
                Digital Twin Sandbox
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5] font-semibold">
                100% Isolated Manifest Simulation
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#092218] mt-1 font-sans">
              Synthetic Infrastructure Replica: Inventra ERP
            </h2>
            <p className="text-xs text-[#526d60] mt-1 max-w-3xl font-sans leading-relaxed">
              The Vector Digital Twin mirrors production topology in an offline virtual sandbox. When an AI agent proposes a change, Vector executes synthetic load profiles against this twin to measure cascading failures before applying manifests to production.
            </p>
          </div>

          <button
            onClick={() => onNavigateToAssurance(currentScenario)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#092218] hover:bg-[#123829] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-sm flex-shrink-0 cursor-pointer self-start md:self-auto hover:scale-[1.02]"
          >
            <span>Proceed to Decision Assurance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Connected Architecture Topology */}
      <ArchitectureTopology scenarioResult={assuranceResult} />

      {/* What-If Side-by-Side Comparison */}
      <WhatIfComparison scenarioKey={currentScenario} onNavigateToAssurance={onNavigateToAssurance} />

      {/* Simulation Controls & Side-by-Side Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Simulation Parameter Inspector */}
        <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#edf3ee]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#059669]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#092218]">
                Simulation Testbed Controls
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#526d60]">
              Active: <strong className="text-[#092218]">{currentScenario.toUpperCase()}</strong>
            </span>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => onSelectScenario('safe')}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                !isDangerous
                  ? 'bg-[#e6f7ec] border-[#b8e8c6] shadow-xs'
                  : 'bg-[#f8fbf9] border-[#e2ede5] hover:border-[#cbdfd1]'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#092218] uppercase">Scenario A</span>
                  <Badge variant="safe" size="sm">SAFE</Badge>
                </div>
                <div className="text-sm font-bold text-[#092218] mt-1 font-sans">Scale API 3 → 6 replicas</div>
                <p className="text-xs text-[#526d60] mt-0.5">Absorbs +34% traffic; downstream DB pool at 72%.</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-[#059669] font-extrabold block">Score: 91</span>
                <span className="text-[10px] text-[#0d5934] font-semibold">AUTO EXECUTE</span>
              </div>
            </button>

            <button
              onClick={() => onSelectScenario('dangerous')}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                isDangerous
                  ? 'bg-[#fef2f2] border-[#fca5a5] shadow-xs'
                  : 'bg-[#f8fbf9] border-[#e2ede5] hover:border-[#cbdfd1]'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#092218] uppercase">Scenario B</span>
                  <Badge variant="dangerous" size="sm">DANGEROUS</Badge>
                </div>
                <div className="text-sm font-bold text-[#092218] mt-1 font-sans">Scale API 3 → 20 replicas</div>
                <p className="text-xs text-[#526d60] mt-0.5">DB connection pool exhausted (210%). Policy limit exceeded.</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-[#dc2626] font-extrabold block">Score: 38</span>
                <span className="text-[10px] text-[#dc2626] font-semibold">BLOCKED</span>
              </div>
            </button>
          </div>
        </div>

        {/* Live Side-by-Side Simulation Delta */}
        <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#edf3ee]">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#059669]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#092218]">
                Predicted 15-Min Telemetry Delta
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#0d5934] bg-[#d7f2df] px-2 py-0.5 rounded-full border border-[#b9e5c5] font-semibold">
              SYNTHETIC MODEL
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-[#f8fbf9] border border-[#e2ede5] flex items-center justify-between">
              <span className="text-[#526d60]">Active Replicas</span>
              <div className="flex items-center gap-3">
                <span className="text-[#698a78]">Prod: 3</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#059669]" />
                <span className={`font-bold ${isDangerous ? 'text-[#dc2626]' : 'text-[#059669]'}`}>
                  Twin: {isDangerous ? '20' : '6'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fbf9] border border-[#e2ede5] flex items-center justify-between">
              <span className="text-[#526d60]">API Gateway CPU</span>
              <div className="flex items-center gap-3">
                <span className="text-[#698a78]">Prod: 78%</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#059669]" />
                <span className={`font-bold ${isDangerous ? 'text-[#d97706]' : 'text-[#059669]'}`}>
                  Twin: {assuranceResult.telemetryImpact.cpuAfter}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fbf9] border border-[#e2ede5] flex items-center justify-between">
              <span className="text-[#526d60]">Database Connection Pool</span>
              <div className="flex items-center gap-3">
                <span className="text-[#698a78]">Prod: 64%</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#059669]" />
                <span className={`font-bold ${isDangerous ? 'text-[#dc2626] animate-pulse' : 'text-[#059669]'}`}>
                  Twin: {assuranceResult.telemetryImpact.dbPool}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f8fbf9] border border-[#e2ede5] flex items-center justify-between">
              <span className="text-[#526d60]">Edge Response Latency</span>
              <div className="flex items-center gap-3">
                <span className="text-[#698a78]">Prod: 42ms</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#059669]" />
                <span className={`font-bold ${isDangerous ? 'text-[#dc2626]' : 'text-[#059669]'}`}>
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
