import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, HelpCircle, ShieldCheck } from 'lucide-react';

export function ExplainabilityPanel({ scenarioResult }) {
  const isDangerous = scenarioResult.key === 'dangerous';

  return (
    <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e2ede5]">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#059669]" />
          <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#092218]">
            WHY DID VECTOR DECIDE THIS?
          </h4>
        </div>
        <span className="text-[10px] font-mono text-[#71877b]">
          Deterministic Rule Trace
        </span>
      </div>

      <div className="space-y-3">
        {scenarioResult.reasons.map((reason) => {
          let Icon = CheckCircle2;
          let colorStyle = 'text-[#0d5934] border-[#b6e3c5] bg-[#f2faf5]';

          if (reason.status === 'violation') {
            Icon = XCircle;
            colorStyle = 'text-[#dc2626] border-[#fecaca] bg-[#fef2f2]';
          } else if (reason.status === 'warning') {
            Icon = AlertTriangle;
            colorStyle = 'text-[#b45309] border-[#fde68a] bg-[#fffbeb]';
          }

          return (
            <div
              key={reason.id}
              className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${colorStyle}`}
            >
              <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="text-xs">
                {reason.title && (
                  <span className="font-mono font-bold block text-[#092218] mb-0.5">
                    {reason.title}:
                  </span>
                )}
                <span className="text-[#334e40] font-sans leading-relaxed">
                  {reason.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Downstream Impact Prediction Summary */}
      <div className="mt-4 pt-3 border-t border-[#e2ede5] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
        <div className="p-2.5 rounded-lg bg-[#f8fbf9] border border-[#e2ede5]">
          <span className="text-[#71877b] block text-[10px]">CPU IMPACT</span>
          <span className={isDangerous ? 'text-[#b45309] font-bold' : 'text-[#0d5934] font-bold'}>
            {scenarioResult.telemetryImpact.cpuAfter}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-[#f8fbf9] border border-[#e2ede5]">
          <span className="text-[#71877b] block text-[10px]">LATENCY</span>
          <span className={isDangerous ? 'text-[#dc2626] font-bold' : 'text-[#0d5934] font-bold'}>
            {scenarioResult.telemetryImpact.latencyAfter}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-[#f8fbf9] border border-[#e2ede5]">
          <span className="text-[#71877b] block text-[10px]">DB POOL</span>
          <span className={isDangerous ? 'text-[#dc2626] font-bold' : 'text-[#0d5934] font-bold'}>
            {scenarioResult.telemetryImpact.dbPool}
          </span>
        </div>
        <div className="p-2.5 rounded-lg bg-[#f8fbf9] border border-[#e2ede5]">
          <span className="text-[#71877b] block text-[10px]">COST DELTA</span>
          <span className="text-[#092218] font-semibold">
            {scenarioResult.telemetryImpact.costDelta}
          </span>
        </div>
      </div>
    </div>
  );
}
