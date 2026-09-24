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
      className={`relative rounded-2xl p-4 sm:p-5 border transition-all duration-200 group ${
        isHero
          ? 'bg-[#e6f7ec] border-[#b8e8c6] shadow-[0_4px_20px_-2px_rgba(9,34,24,0.06)]'
          : 'bg-white border-[#e2ede5] hover:border-[#cbdfd1] hover:bg-[#f8fbf9]'
      }`}
    >
      {isHero && (
        <div className="absolute -top-2.5 left-5 px-2.5 py-0.5 rounded-full bg-[#092218] text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
          <Zap className="w-3 h-3 fill-current text-[#34d399]" />
          <span>Active Testbed Scenario</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Agent & Action Details */}
        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-xs ${
            isHero ? 'bg-white border border-[#b8e8c6]' : 'bg-[#edf5ee] border border-[#d8e6db]'
          }`}>
            {agentAvatar || '🤖'}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#092218]">
                {agent}
              </span>
              <span className="text-[11px] text-[#698a78] font-mono">
                • {timestamp}
              </span>
              <span className="text-[11px] font-mono font-semibold text-[#0d5934] bg-[#d7f2df] px-2 py-0.5 rounded-md border border-[#b9e5c5]">
                {targetService}
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-[#092218] tracking-tight group-hover:text-[#059669] transition-colors font-sans">
              {action}
            </h4>

            <p className="text-xs text-[#526d60] max-w-2xl font-sans leading-relaxed">
              {reason}
            </p>
          </div>
        </div>

        {/* Right: Risk Badge & Inspect Button */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#d8e6db]">
          <div className="flex items-center gap-2">
            <Badge variant={riskLevel}>
              {riskLevel}
            </Badge>

            <span className={`text-xs font-mono px-2.5 py-1 rounded-full border font-semibold ${
              status.includes('Blocked') 
                ? 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]'
                : status.includes('Auto')
                ? 'bg-[#d7f2df] text-[#0d5934] border-[#b9e5c5]'
                : 'bg-[#edf5ee] text-[#526d60] border-[#d8e6db]'
            }`}>
              {status}
            </span>
          </div>

          <button
            onClick={() => onInspect(scenarioKey || 'safe')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer shadow-xs ${
              isHero
                ? 'bg-[#092218] text-white hover:bg-[#123829] shadow-sm hover:scale-[1.02]'
                : 'bg-[#edf5ee] text-[#092218] hover:bg-[#d8e6db] border border-[#d8e6db]'
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
