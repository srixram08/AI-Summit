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
    <div className="bg-[#0d1424] rounded-xl border border-slate-800/80 p-5 sm:p-6 transition-all duration-300">
      {/* Topology Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-white">
              Application Architecture Topology
            </h3>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {APPLICATION_TOPOLOGY.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Digital Twin state modeling downstream cascade & resource pressure
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="text-slate-400">Environment:</span>
            <span className="text-cyan-400 font-semibold">Production (us-east-1)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="text-slate-400">Twin Simulation:</span>
            <span className={isDangerous ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
              {isDangerous ? 'PRESSURE DETECTED' : 'NOMINAL'}
            </span>
          </div>
        </div>
      </div>

      {/* Nodes Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 relative items-stretch">
        
        {/* Node 1: Frontend Tier */}
        <div className="relative rounded-xl p-4 bg-[#0a0f1d] border border-slate-800/80 flex flex-col justify-between group hover:border-slate-700 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-cyan-400">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">Frontend Tier</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Inventra Web Client</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                <StatusDot status="healthy" size="sm" />
                <span>Healthy</span>
              </div>
            </div>

            <div className="space-y-2 mt-4 text-xs font-mono">
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/50">
                <span>Active Pods:</span>
                <span className="text-white font-bold">2 replicas</span>
              </div>
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/50">
                <span>CPU Load:</span>
                <span className="text-slate-200">54%</span>
              </div>
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/50">
                <span>Memory:</span>
                <span className="text-slate-200">62%</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1">
                <span>Stack:</span>
                <span className="text-slate-400">Next.js / NGINX</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Inbound QPS</span>
            <span className="text-emerald-400 font-bold">3,850 req/s</span>
          </div>

          {/* Desktop Right Connector Arrow */}
          <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 items-center justify-center text-cyan-400 shadow-md">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Node 2: API Tier (TARGET OF CHANGE) */}
        <div
          className={`relative rounded-xl p-4 flex flex-col justify-between transition-all duration-300 ${
            isDangerous
              ? 'bg-[#180f14] border-rose-500/60 shadow-[0_0_25px_rgba(255,51,75,0.15)] ring-1 ring-rose-500/40'
              : 'bg-[#0b171c] border-emerald-500/60 shadow-[0_0_25px_rgba(0,245,155,0.15)] ring-1 ring-emerald-500/40'
          }`}
        >
          {/* Target of AI Action Badge */}
          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-md ${
            isDangerous
              ? 'bg-rose-500 text-slate-950 ring-2 ring-rose-900'
              : 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-950'
          }`}>
            <Zap className="w-3 h-3 fill-current" />
            <span>Target of AI Change</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 mt-1">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg border ${
                  isDangerous 
                    ? 'bg-rose-950/60 border-rose-500/40 text-rose-400' 
                    : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                }`}>
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">API Tier (Target)</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Inventra API Gateway</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                <StatusDot status="healthy" size="sm" />
                <span>Healthy</span>
              </div>
            </div>

            {/* Current vs Proposed Highlight Box */}
            <div className={`rounded-lg p-2.5 my-3 border ${
              isDangerous 
                ? 'bg-rose-950/30 border-rose-800/60' 
                : 'bg-emerald-950/30 border-emerald-800/60'
            }`}>
              <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-1">
                Simulated Replica Change
              </div>
              <div className="flex items-center justify-between font-mono">
                <div>
                  <span className="text-xs text-slate-400">Current: </span>
                  <span className="text-sm font-bold text-white">{currentReplicas}</span>
                </div>
                <ArrowRight className={`w-4 h-4 ${isDangerous ? 'text-rose-400' : 'text-emerald-400'}`} />
                <div>
                  <span className="text-xs text-slate-400">Proposed: </span>
                  <span className={`text-base font-extrabold ${isDangerous ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {proposedReplicas} replicas
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/50">
                <span>Current CPU:</span>
                <span className="text-slate-200">78%</span>
              </div>
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/50">
                <span>Simulated CPU:</span>
                <span className={isDangerous ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                  {scenarioResult.telemetryImpact.cpuAfter}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1">
                <span>Orchestrator:</span>
                <span className="text-slate-400">Kubernetes v1.30</span>
              </div>
            </div>
          </div>

          <div className={`mt-4 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
            isDangerous ? 'border-rose-900/60 text-rose-300' : 'border-emerald-900/60 text-emerald-300'
          }`}>
            <span>Twin Blast Radius</span>
            <span className="font-bold">{isDangerous ? 'HIGH RISK' : 'LOW RISK'}</span>
          </div>

          {/* Desktop Right Connector Arrow */}
          <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 items-center justify-center text-cyan-400 shadow-md">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Node 3: Database Tier */}
        <div
          className={`relative rounded-xl p-4 bg-[#0a0f1d] border flex flex-col justify-between group transition-all duration-300 ${
            isDangerous
              ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]'
              : 'border-slate-800/80 hover:border-slate-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg border ${
                  isDangerous 
                    ? 'bg-amber-950/40 border-amber-800/40 text-amber-400' 
                    : 'bg-indigo-950/40 border-indigo-800/40 text-indigo-400'
                }`}>
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">Database Tier</h4>
                  <span className="text-[10px] text-slate-400 font-mono">PostgreSQL Primary</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                <StatusDot status="healthy" size="sm" />
                <span>Healthy</span>
              </div>
            </div>

            <div className="space-y-2 mt-4 text-xs font-mono">
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/50">
                <span>Current Pool:</span>
                <span className="text-white font-bold">64% utilized</span>
              </div>
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/50">
                <span>Simulated Pool:</span>
                <span className={`font-bold ${isDangerous ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                  {scenarioResult.telemetryImpact.dbPool}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 py-1 border-b border-slate-800/50">
                <span>Topology:</span>
                <span className="text-slate-300">1 primary + 1 replica</span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1">
                <span>Engine:</span>
                <span className="text-slate-400">Aurora PG 16</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60">
            {isDangerous ? (
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-400 bg-rose-950/40 p-1.5 rounded border border-rose-900/60">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate font-semibold">Exceeds pool capacity cutoff</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
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
