import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, ShieldCheck } from 'lucide-react';

export function ExplainabilityPanel({ scenarioResult }) {
  const isDangerous = scenarioResult.key === 'dangerous';

  return (
    <div className="bg-[#0a0f1d] rounded-xl border border-slate-800/80 p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white">
            WHY DID VECTOR DECIDE THIS?
          </h4>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Deterministic Rule Trace
        </span>
      </div>

      <div className="space-y-3">
        {scenarioResult.reasons.map((reason) => {
          let Icon = CheckCircle2;
          let colorStyle = 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20';

          if (reason.status === 'violation') {
            Icon = XCircle;
            colorStyle = 'text-rose-400 border-rose-500/30 bg-rose-950/30';
          } else if (reason.status === 'warning') {
            Icon = AlertTriangle;
            colorStyle = 'text-amber-400 border-amber-500/20 bg-amber-950/20';
          }

          return (
            <div
              key={reason.id}
              className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${colorStyle}`}
            >
              <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                {reason.title && (
                  <span className="font-mono font-semibold block text-slate-200 mb-0.5">
                    {reason.title}:
                  </span>
                )}
                <span className="text-slate-300 font-sans leading-relaxed">
                  {reason.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Downstream Impact Prediction Summary */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">CPU IMPACT</span>
          <span className={isDangerous ? 'text-amber-400' : 'text-emerald-400'}>
            {scenarioResult.telemetryImpact.cpuAfter}
          </span>
        </div>
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">LATENCY</span>
          <span className={isDangerous ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
            {scenarioResult.telemetryImpact.latencyAfter}
          </span>
        </div>
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">DB POOL</span>
          <span className={isDangerous ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
            {scenarioResult.telemetryImpact.dbPool}
          </span>
        </div>
        <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">COST DELTA</span>
          <span className="text-slate-300">
            {scenarioResult.telemetryImpact.costDelta}
          </span>
        </div>
      </div>
    </div>
  );
}
