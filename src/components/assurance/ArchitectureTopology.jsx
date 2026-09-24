import React from 'react';
import { 
  Server, 
  Database, 
  Globe, 
  ArrowRight, 
  Zap, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Layers,
  Cpu,
  Activity
} from 'lucide-react';
import { APPLICATION_TOPOLOGY } from '../../data/mockData';
import { StatusDot } from '../common/StatusDot';

export function ArchitectureTopology({ scenarioResult }) {
  const isDangerous = scenarioResult.key === 'dangerous';
  const proposedReplicas = scenarioResult.proposedReplicas;
  const currentReplicas = scenarioResult.currentReplicas;
  return (
    <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 transition-all duration-300 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
      {/* Topology Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#edf3ee]">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#059669]" />
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-[#092218]">
              Application Architecture Topology
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#edf5ee] text-[#0d5934] border border-[#d8e6db]">
              {APPLICATION_TOPOLOGY.name}
            </span>
          </div>
          <p className="text-xs text-[#526d60] mt-1 font-sans">
            Real-time Digital Twin state modeling downstream cascade & resource pressure
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#edf5ee] border border-[#d8e6db] text-[11px] font-mono text-[#092218]">
            <span className="text-[#698a78]">Environment:</span>
            <span className="text-[#0d5934] font-bold">Production (us-east-1)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#edf5ee] border border-[#d8e6db] text-[11px] font-mono">
            <span className="text-[#698a78]">Twin Simulation:</span>
            <span className={isDangerous ? 'text-[#dc2626] font-extrabold' : 'text-[#059669] font-extrabold'}>
              {isDangerous ? 'PRESSURE DETECTED' : 'NOMINAL'}
            </span>
          </div>
        </div>
      </div>

      {/* Nodes Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 relative items-stretch">
        
        {/* Node 1: Frontend Tier */}
        <div className="relative rounded-2xl p-4 bg-[#f8fbf9] border border-[#e2ede5] flex flex-col justify-between group hover:border-[#b8e8c6] transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-white border border-[#d8e6db] text-[#059669] shadow-xs">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#092218] uppercase">Frontend Tier</h4>
                  <span className="text-[10px] text-[#526d60] font-mono">Inventra Web Client</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#0d5934] bg-[#d7f2df] px-2.5 py-0.5 rounded-full border border-[#b9e5c5] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                <span>Healthy</span>
              </div>
            </div>

            <div className="space-y-2 mt-4 text-xs font-mono">
              <div className="flex justify-between text-[#526d60] py-1 border-b border-[#edf3ee]">
                <span>Active Pods:</span>
                <span className="text-[#092218] font-bold">2 replicas</span>
              </div>
              <div className="flex justify-between text-[#526d60] py-1 border-b border-[#edf3ee]">
                <span>CPU Load:</span>
                <span className="text-[#092218] font-medium">54%</span>
              </div>
              <div className="flex justify-between text-[#526d60] py-1 border-b border-[#edf3ee]">
                <span>Memory:</span>
                <span className="text-[#092218] font-medium">62%</span>
              </div>
              <div className="flex justify-between text-[#526d60] pt-1">
                <span>Stack:</span>
                <span className="text-[#698a78]">Next.js / NGINX</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#edf3ee] flex items-center justify-between text-[11px] font-mono text-[#526d60]">
            <span>Inbound QPS</span>
            <span className="text-[#059669] font-bold">3,850 req/s</span>
          </div>

          {/* Desktop Right Connector Arrow */}
          <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#b8e8c6] items-center justify-center text-[#059669] shadow-sm">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Node 2: API Tier (TARGET OF CHANGE) */}
        <div
          className={`relative rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 ${
            isDangerous
              ? 'bg-[#fff1f2] border-2 border-[#fecdd3] shadow-[0_4px_20px_-2px_rgba(220,38,38,0.06)]'
              : 'bg-[#e6f7ec] border-2 border-[#b8e8c6] shadow-[0_4px_20px_-2px_rgba(9,34,24,0.06)]'
          }`}
        >
          {/* Target of AI Action Badge */}
          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm ${
            isDangerous
              ? 'bg-[#dc2626] text-white'
              : 'bg-[#092218] text-white'
          }`}>
            <Zap className={`w-3 h-3 fill-current ${isDangerous ? 'text-white' : 'text-[#34d399]'}`} />
            <span>Target of AI Change</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 mt-1">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl border ${
                  isDangerous 
                    ? 'bg-white border-[#fecaca] text-[#dc2626]' 
                    : 'bg-white border-[#b8e8c6] text-[#059669]'
                }`}>
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#092218] uppercase">API Tier (Target)</h4>
                  <span className="text-[10px] text-[#526d60] font-mono">Inventra API Gateway</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#0d5934] bg-white px-2.5 py-0.5 rounded-full border border-[#b9e5c5] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                <span>Healthy</span>
              </div>
            </div>

            {/* Current vs Proposed Highlight Box */}
            <div className={`rounded-xl p-2.5 my-3 border bg-white ${
              isDangerous ? 'border-[#fecaca]' : 'border-[#b8e8c6]'
            }`}>
              <div className="text-[10px] font-mono uppercase text-[#698a78] tracking-wider mb-1 font-semibold">
                Simulated Replica Change
              </div>
              <div className="flex items-center justify-between font-mono">
                <div>
                  <span className="text-xs text-[#526d60]">Current: </span>
                  <span className="text-sm font-bold text-[#092218]">{currentReplicas}</span>
                </div>
                <ArrowRight className={`w-4 h-4 ${isDangerous ? 'text-[#dc2626]' : 'text-[#059669]'}`} />
                <div>
                  <span className="text-xs text-[#526d60]">Proposed: </span>
                  <span className={`text-base font-extrabold ${isDangerous ? 'text-[#dc2626]' : 'text-[#092218]'}`}>
                    {proposedReplicas} replicas
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className={`flex justify-between py-1 border-b ${isDangerous ? 'border-[#fecdd3]' : 'border-[#b8e8c6]/50'}`}>
                <span className="text-[#526d60]">Current CPU:</span>
                <span className="text-[#092218] font-semibold">78%</span>
              </div>
              <div className={`flex justify-between py-1 border-b ${isDangerous ? 'border-[#fecdd3]' : 'border-[#b8e8c6]/50'}`}>
                <span className="text-[#526d60]">Simulated CPU:</span>
                <span className={`font-bold ${isDangerous ? 'text-[#d97706]' : 'text-[#059669]'}`}>
                  {scenarioResult.telemetryImpact.cpuAfter}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#526d60]">Orchestrator:</span>
                <span className="text-[#092218] font-medium">Kubernetes v1.30</span>
              </div>
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
            isDangerous ? 'border-[#fecdd3] text-[#dc2626]' : 'border-[#b8e8c6] text-[#0d5934]'
          }`}>
            <span className="font-semibold">Twin Blast Radius</span>
            <span className="font-extrabold">{isDangerous ? 'HIGH RISK' : 'LOW RISK'}</span>
          </div>

          {/* Desktop Right Connector Arrow */}
          <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border border-[#b8e8c6] items-center justify-center text-[#059669] shadow-sm">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Node 3: Database Tier */}
        <div
          className={`relative rounded-2xl p-4 bg-[#f8fbf9] border flex flex-col justify-between group transition-all duration-300 ${
            isDangerous
              ? 'border-2 border-[#fde68a] bg-[#fffbeb] shadow-[0_4px_20px_-2px_rgba(217,119,6,0.06)]'
              : 'border border-[#e2ede5] hover:border-[#b8e8c6]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl border ${
                  isDangerous 
                    ? 'bg-white border-[#fde68a] text-[#d97706]' 
                    : 'bg-white border-[#d8e6db] text-[#059669]'
                }`}>
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#092218] uppercase">Database Tier</h4>
                  <span className="text-[10px] text-[#526d60] font-mono">PostgreSQL Primary</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#0d5934] bg-white px-2.5 py-0.5 rounded-full border border-[#b9e5c5] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                <span>Healthy</span>
              </div>
            </div>

            <div className="space-y-2 mt-4 text-xs font-mono">
              <div className="flex justify-between text-[#526d60] py-1 border-b border-[#edf3ee]">
                <span>Current Pool:</span>
                <span className="text-[#092218] font-bold">64% utilized</span>
              </div>
              <div className="flex justify-between text-[#526d60] py-1 border-b border-[#edf3ee]">
                <span>Simulated Pool:</span>
                <span className={`font-bold ${isDangerous ? 'text-[#dc2626] animate-pulse' : 'text-[#059669]'}`}>
                  {scenarioResult.telemetryImpact.dbPool}
                </span>
              </div>
              <div className="flex justify-between text-[#526d60] py-1 border-b border-[#edf3ee]">
                <span>Topology:</span>
                <span className="text-[#092218] font-medium">1 primary + 1 replica</span>
              </div>
              <div className="flex justify-between text-[#526d60] pt-1">
                <span>Engine:</span>
                <span className="text-[#698a78]">Aurora PG 16</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#edf3ee]">
            {isDangerous ? (
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#dc2626] bg-[#fef2f2] p-2 rounded-xl border border-[#fecaca]">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate font-bold">Exceeds pool capacity cutoff</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[11px] font-mono text-[#0d5934]">
                <span>Connection Pool</span>
                <span className="font-bold">72% Peak (Optimal)</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
