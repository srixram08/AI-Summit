import React from 'react';
import { ShieldCheck, ShieldAlert, ArrowRight, Zap, CheckCircle2, AlertOctagon } from 'lucide-react';
import { Badge } from '../common/Badge';

export function ScenarioSelector({ currentScenario, onSelectScenario }) {
  const isSafe = currentScenario === 'safe';

  return (
    <div className="bg-[#0d1424] rounded-xl border border-slate-800/80 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              INTERCEPTED ACTION SIMULATION
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
              Interactive Testbed
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            Evaluate AI Recommendation Scenarios
          </h3>
          <p className="text-xs text-slate-400">
            Compare how Vector's decision engine evaluates safe vs. hazardous speculative infrastructure changes.
          </p>
        </div>

        {/* Current State Indicator */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0a0f1d] border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Current State:</span>
          <span className="text-white font-bold">API Replicas = 3</span>
        </div>
      </div>

      {/* Scenario Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario A: SAFE */}
        <button
          onClick={() => onSelectScenario('safe')}
          className={`relative text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
            isSafe
              ? 'bg-emerald-950/20 border-emerald-500 shadow-[0_0_25px_rgba(0,245,155,0.15)] ring-1 ring-emerald-500/40'
              : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
          }`}
        >
          {isSafe && (
            <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-mono font-extrabold uppercase tracking-wider flex items-center gap-1 shadow">
              <CheckCircle2 className="w-3 h-3" />
              <span>Active Scenario</span>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Scenario A
                </span>
              </div>
              <Badge variant="safe" size="sm">
                SAFE
              </Badge>
            </div>

            <div className="text-lg font-bold text-white font-mono flex items-center gap-2 mt-1">
              <span>Scale API 3 → 6 replicas</span>
            </div>
            
            <p className="text-xs text-slate-400 mt-2 font-sans">
              Proportional scale-out to absorb sustained +34% traffic surge. Within approved cluster quota.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Projected Trust Score:</span>
            <span className="text-emerald-400 font-bold">91 / 100 (AUTO EXECUTE)</span>
          </div>
        </button>

        {/* Scenario B: DANGEROUS */}
        <button
          onClick={() => onSelectScenario('dangerous')}
          className={`relative text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
            !isSafe
              ? 'bg-rose-950/20 border-rose-500 shadow-[0_0_25px_rgba(255,51,75,0.15)] ring-1 ring-rose-500/40'
              : 'bg-[#0a0f1d] border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
          }`}
        >
          {!isSafe && (
            <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-rose-500 text-slate-950 text-[10px] font-mono font-extrabold uppercase tracking-wider flex items-center gap-1 shadow">
              <AlertOctagon className="w-3 h-3" />
              <span>Active Scenario</span>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Scenario B
                </span>
              </div>
              <Badge variant="danger" size="sm">
                DANGEROUS
              </Badge>
            </div>

            <div className="text-lg font-bold text-white font-mono flex items-center gap-2 mt-1">
              <span>Scale API 3 → 20 replicas</span>
            </div>

            <p className="text-xs text-slate-400 mt-2 font-sans">
              Aggressive speculative surge. Exceeds max policy tier limits and threatens database connection starvation.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Projected Trust Score:</span>
            <span className="text-rose-400 font-bold">58 / 100 (ACTION BLOCKED)</span>
          </div>
        </button>
      </div>
    </div>
  );
}
