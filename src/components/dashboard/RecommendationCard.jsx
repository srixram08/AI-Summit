import React from 'react';
import { ArrowRight, Bot, ShieldAlert, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export function RecommendationCard({ recommendation, onInspect }) {
  const {
    id,
    agent,
    agentAvatar,
    action,
    targetService,
    timestamp,
    riskLevel,
    riskScore,
    status,
    reason,
    isHero,
    scenarioKey
  } = recommendation;

  const isHighRisk = riskLevel.includes('HIGH');

  return (
    <div
      className={`relative rounded-xl p-4 sm:p-5 border transition-all duration-200 group ${
        isHero
          ? 'bg-[#0e172a] border-emerald-500/40 hover:border-emerald-500/60 shadow-[0_0_20px_rgba(0,245,155,0.06)]'
          : 'bg-[#0d1424] border-slate-800/80 hover:border-slate-700'
      }`}
    >
      {isHero && (
        <div className="absolute -top-2.5 left-5 px-2 py-0.5 rounded-full bg-emerald-500 text-[#080c14] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
          <Zap className="w-3 h-3 fill-current" />
          <span>Demo Target Action</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Agent & Action Details */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center text-lg flex-shrink-0 shadow-inner">
            {agentAvatar || '🤖'}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-300">
                {agent}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                • {timestamp}
              </span>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                {targetService}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
              {action}
            </h4>

            <p className="text-xs text-slate-400 max-w-2xl font-sans">
              {reason}
            </p>
          </div>
        </div>

        {/* Right: Risk Badge & Inspect Button */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/60">
          <div className="flex items-center gap-2">
            <Badge variant={riskLevel}>
              {riskLevel}
            </Badge>

            <span className={`text-xs font-mono px-2.5 py-1 rounded-md border font-medium ${
              status.includes('Blocked') 
                ? 'bg-rose-950/40 text-rose-300 border-rose-800/60'
                : status.includes('Auto')
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              {status}
            </span>
          </div>

          <button
            onClick={() => onInspect(scenarioKey || 'safe')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
              isHero
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-[0_0_15px_rgba(0,245,155,0.3)] hover:scale-[1.02]'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <span>Assure in Twin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
