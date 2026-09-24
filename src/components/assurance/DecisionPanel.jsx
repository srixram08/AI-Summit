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
      className={`rounded-2xl border p-6 sm:p-8 transition-all duration-300 relative overflow-hidden bg-white shadow-sm ${
        isDangerous
          ? 'border-[#fecaca]'
          : 'border-[#b6e3c5]'
      }`}
    >
      {/* Background radial accent glow */}
      <div
        className={`absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10 ${
          isDangerous ? 'bg-rose-400' : 'bg-emerald-400'
        }`}
      />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#e2ede5]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#527060] font-semibold">
              PRE-EXECUTION ASSURANCE VERDICT
            </span>
            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              isDangerous 
                ? 'bg-[#fee2e2] text-[#dc2626] border border-[#fca5a5]' 
                : 'bg-[#d7f2df] text-[#0d5934] border border-[#b6e3c5]'
            }`}>
              {scenarioResult.confidenceTier}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#092218] font-mono mt-1 flex items-center gap-2">
            VECTOR DECISION ENGINE
          </h2>
        </div>

        {/* Pipeline Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-[#f8fbf9] p-3 rounded-xl border border-[#e2ede5]">
          {scenarioResult.pipelineChecks.map((check) => {
            const isFailed = check.status === 'failed';
            const isFlagged = check.status === 'flagged';
            return (
              <div
                key={check.id}
                className={`flex items-center gap-2 ${
                  isFailed
                    ? 'text-[#dc2626]'
                    : isFlagged
                    ? 'text-[#b45309]'
                    : 'text-[#0d5934]'
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
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 bg-[#f8fbf9] rounded-2xl border border-[#e2ede5]">
          <TrustScore
            score={scenarioResult.trustScore}
            maxScore={100}
            isDangerous={isDangerous}
          />
          <div className="mt-2 text-center">
            <span
              className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                isDangerous
                  ? 'bg-[#fee2e2] text-[#dc2626] border-[#fca5a5]'
                  : 'bg-[#d7f2df] text-[#0d5934] border-[#b6e3c5]'
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
              <span className="text-xs font-mono uppercase tracking-wider text-[#527060]">
                DECISION DIRECTIVE
              </span>
              <span className="text-xs font-mono text-[#527060]">•</span>
              <span className="text-xs font-mono text-[#059669] font-bold">
                Action: {scenarioResult.title}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#273a30] font-sans leading-relaxed">
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
                  className="flex-1 group py-4 px-6 rounded-xl bg-[#092218] hover:bg-[#163e2e] text-white font-mono font-bold text-base sm:text-lg tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] flex items-center justify-center gap-3 cursor-pointer"
                >
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-[#34d399]" />
                  <span>✓ AUTO EXECUTE</span>
                </button>
              </div>
            ) : (
              /* Scenario B: Action Blocked + Human Approval */
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <div className="flex-1 py-4 px-6 rounded-xl bg-[#fef2f2] text-[#dc2626] font-mono font-extrabold text-base sm:text-lg tracking-wider uppercase shadow-sm flex items-center justify-center gap-3 border border-[#fecaca]">
                  <XCircle className="w-6 h-6 flex-shrink-0 text-[#dc2626]" />
                  <div className="text-left leading-tight">
                    <div>✕ ACTION BLOCKED</div>
                    <div className="text-[11px] font-normal text-[#991b1b] uppercase tracking-normal">
                      Human Approval Required
                    </div>
                  </div>
                </div>

                <button
                  onClick={onRequestHumanApproval}
                  className="py-4 px-6 rounded-xl bg-[#092218] hover:bg-[#163e2e] text-white font-mono font-bold text-sm tracking-wide transition-all duration-200 shadow-md flex items-center justify-center gap-2.5 cursor-pointer flex-shrink-0"
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
                    ? 'bg-[#f2faf5] border-[#b6e3c5] text-[#0d5934]'
                    : 'bg-[#fffbeb] border-[#fde68a] text-[#92400e]'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="flex items-center gap-2">
                    {executionState.status === 'authorized' ? (
                      <Check className="w-4 h-4 text-[#059669]" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-600" />
                    )}
                    {executionState.message}
                  </span>
                  <button
                    onClick={onResetExecution}
                    className="text-[10px] text-[#527060] hover:text-[#092218] underline font-medium"
                  >
                    Reset
                  </button>
                </div>
                <div className="text-[11px] text-[#527060] mt-1 flex flex-wrap gap-4">
                  <span>Assigned Reviewer: <strong className="text-[#092218]">{executionState.reviewer}</strong></span>
                  <span>Timestamp: <strong className="text-[#092218]">{executionState.timestamp}</strong></span>
                  <span>Simulation Status: <strong className="text-[#0d5934]">Isolated Sandbox</strong></span>
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
