import React from 'react';
import { ShieldCheck, ShieldAlert, ArrowRight, Zap, CheckCircle2, AlertOctagon } from 'lucide-react';
import { Badge } from '../common/Badge';

export function ScenarioSelector({ currentScenario, onSelectScenario }) {
  const isSafe = currentScenario === 'safe';

  return (
    <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#0d5934] font-bold">
              INTERCEPTED ACTION SIMULATION
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5] font-semibold">
              Interactive Testbed
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#092218] mt-1 font-sans">
            Evaluate AI Recommendation Scenarios
          </h3>
          <p className="text-xs text-[#526d60] font-sans">
            Compare how Vector's decision engine evaluates safe vs. hazardous speculative infrastructure changes.
          </p>
        </div>

        {/* Current State Indicator */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#edf5ee] border border-[#d8e6db] text-xs font-mono">
          <span className="text-[#526d60]">Current State:</span>
          <span className="text-[#092218] font-bold">API Replicas = 3</span>
        </div>
      </div>

      {/* Scenario Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario A: SAFE */}
        <button
          onClick={() => onSelectScenario('safe')}
          className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
            isSafe
              ? 'bg-[#e6f7ec] border-[#b8e8c6] shadow-[0_4px_20px_-2px_rgba(9,34,24,0.08)]'
              : 'bg-[#f8fbf9] border-[#e2ede5] hover:border-[#cbd5e1]'
          }`}
        >
          {isSafe && (
            <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#092218] text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-[#34d399]" />
              <span>Active Scenario</span>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#059669]" />
                <span className="text-xs font-mono font-bold text-[#092218] uppercase tracking-wider">
                  Scenario A
                </span>
              </div>
              <Badge variant="safe" size="sm">
                SAFE
              </Badge>
            </div>

            <div className="text-lg font-bold text-[#092218] font-mono flex items-center gap-2 mt-1">
              <span>Scale API 3 → 6 replicas</span>
            </div>
            
            <p className="text-xs text-[#526d60] mt-2 font-sans leading-relaxed">
              Proportional scale-out to absorb sustained +34% traffic surge. Within approved cluster quota.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#b8e8c6]/60 flex items-center justify-between text-xs font-mono">
            <span className="text-[#526d60]">Projected Trust Score:</span>
            <span className="text-[#059669] font-extrabold">91 / 100 (AUTO EXECUTE)</span>
          </div>
        </button>

        {/* Scenario B: DANGEROUS */}
        <button
          onClick={() => onSelectScenario('dangerous')}
          className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
            !isSafe
              ? 'bg-[#fff1f2] border-[#fecdd3] shadow-[0_4px_20px_-2px_rgba(220,38,38,0.08)]'
              : 'bg-[#f8fbf9] border-[#e2ede5] hover:border-[#cbd5e1]'
          }`}
        >
          {!isSafe && (
            <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-[#dc2626] text-white text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <AlertOctagon className="w-3 h-3 text-white" />
              <span>Active Scenario</span>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#dc2626]" />
                <span className="text-xs font-mono font-bold text-[#092218] uppercase tracking-wider">
                  Scenario B
                </span>
              </div>
              <Badge variant="danger" size="sm">
                DANGEROUS
              </Badge>
            </div>

            <div className="text-lg font-bold text-[#092218] font-mono flex items-center gap-2 mt-1">
              <span>Scale API 3 → 20 replicas</span>
            </div>

            <p className="text-xs text-[#526d60] mt-2 font-sans leading-relaxed">
              Aggressive speculative surge. Exceeds max policy tier limits and threatens database connection starvation.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-[#fecdd3] flex items-center justify-between text-xs font-mono">
            <span className="text-[#526d60]">Projected Trust Score:</span>
            <span className="text-[#dc2626] font-extrabold">58 / 100 (ACTION BLOCKED)</span>
          </div>
        </button>
      </div>
    </div>
  );
}
