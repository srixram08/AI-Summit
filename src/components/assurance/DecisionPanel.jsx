import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  ShieldCheck, 
  ShieldAlert, 
  UserCheck, 
  Send, 
  Clock, 
  Check, 
  RefreshCw,
  Cpu,
  Lock,
  ArrowRight
} from 'lucide-react';
import { TrustScore } from './TrustScore';
import { ExplainabilityPanel } from './ExplainabilityPanel';
import { Badge } from '../common/Badge';

export function DecisionPanel({
  scenarioResult,
  executionState,
  onAutoExecute,
  onRequestHumanApproval,
  onResetExecution,
}) {
  const isDangerous = scenarioResult.key === 'dangerous';
  const isAuto = scenarioResult.decision === 'AUTO_EXECUTE';

  return (
    <div
      className={`rounded-2xl border-2 p-6 sm:p-8 transition-all duration-500 relative overflow-hidden ${
        isDangerous
          ? 'bg-[#120a11] border-rose-500/60 shadow-[0_0_50px_rgba(255,51,75,0.18)]'
          : 'bg-[#071714] border-emerald-500/60 shadow-[0_0_50px_rgba(0,245,155,0.18)]'
      }`}
    >
      {/* Background radial accent glow */}
      <div
        className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isDangerous ? 'bg-rose-500' : 'bg-emerald-500'
        }`}
      />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
              PRE-EXECUTION ASSURANCE VERDICT
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
              isDangerous 
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}>
              {scenarioResult.confidenceTier}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1 flex items-center gap-2">
            VECTOR DECISION ENGINE
          </h2>
        </div>

        {/* Pipeline Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-[#090f1d]/80 p-3 rounded-xl border border-slate-800">
          {scenarioResult.pipelineChecks.map((check) => {
            const isFailed = check.status === 'failed';
            const isFlagged = check.status === 'flagged';
            return (
              <div
                key={check.id}
                className={`flex items-center gap-2 ${
                  isFailed
                    ? 'text-rose-400'
                    : isFlagged
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {isFailed ? (
                  <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                ) : isFlagged ? (
                  <AlertOctagon className="w-3.5 h-3.5 flex-shrink-0" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                )}
                <span className="text-[11px] font-medium tracking-tight">
                  {check.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Decision Core */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-center">
        {/* Left: Trust Score SVG Radial Ring */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-[#0a0f1d]/60 rounded-xl border border-slate-800/80">
          <TrustScore
            score={scenarioResult.trustScore}
            maxScore={100}
            isDangerous={isDangerous}
          />
          <div className="mt-2 text-center">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                isDangerous
                  ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                  : 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
              }`}
            >
              {scenarioResult.confidenceTier}
            </span>
          </div>
        </div>

        {/* Right: Decision Banner & Massive Action Button */}
        <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
          {/* Verdict Description */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                DECISION DIRECTIVE
              </span>
              <span className="text-xs font-mono text-slate-400">•</span>
              <span className="text-xs font-mono text-cyan-400">
                Action: {scenarioResult.title}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
              {scenarioResult.actionCopy}
            </p>
          </div>

          {/* Massive Action Button / Badge */}
          <div className="space-y-4">
            {isAuto ? (
              /* Scenario A: Auto Execute */
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onAutoExecute}
                  className="flex-1 group py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-mono font-extrabold text-base sm:text-lg tracking-wider uppercase transition-all duration-300 shadow-[0_0_35px_rgba(0,245,155,0.4)] hover:shadow-[0_0_50px_rgba(0,245,155,0.6)] hover:scale-[1.02] flex items-center justify-center gap-3 cursor-pointer"
                >
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <span>✓ AUTO EXECUTE</span>
                </button>
              </div>
            ) : (
              /* Scenario B: Action Blocked + Human Approval */
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-mono font-extrabold text-base sm:text-lg tracking-wider uppercase shadow-[0_0_35px_rgba(255,51,75,0.35)] flex items-center justify-center gap-3 border border-rose-400/30">
                  <XCircle className="w-6 h-6 flex-shrink-0 text-rose-200" />
                  <div className="text-left leading-tight">
                    <div>✕ ACTION BLOCKED</div>
                    <div className="text-[11px] font-normal text-rose-200 uppercase tracking-normal">
                      Human Approval Required
                    </div>
                  </div>
                </div>

                <button
                  onClick={onRequestHumanApproval}
                  className="py-4 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-sm tracking-wide transition-all duration-200 border border-slate-600 shadow-md flex items-center justify-center gap-2.5 cursor-pointer hover:border-slate-500 flex-shrink-0"
                >
                  <UserCheck className="w-5 h-5 text-amber-400" />
                  <span>REQUEST HUMAN APPROVAL</span>
                </button>
              </div>
            )}

            {/* Interactive Feedback State */}
            {executionState.status !== 'idle' && (
              <div
                className={`p-4 rounded-xl border font-mono text-xs transition-all duration-300 animate-fadeIn ${
                  executionState.status === 'authorized'
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="flex items-center gap-2">
                    {executionState.status === 'authorized' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-400" />
                    )}
                    {executionState.message}
                  </span>
                  <button
                    onClick={onResetExecution}
                    className="text-[10px] text-slate-400 hover:text-white underline"
                  >
                    Reset
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap gap-4">
                  <span>Assigned Reviewer: <strong className="text-white">{executionState.reviewer}</strong></span>
                  <span>Timestamp: <strong className="text-white">{executionState.timestamp}</strong></span>
                  <span>Simulation Status: <strong className="text-emerald-400">Isolated Sandbox</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Explainability Breakdown Section */}
      <div className="mt-8">
        <ExplainabilityPanel scenarioResult={scenarioResult} />
      </div>
    </div>
  );
}
