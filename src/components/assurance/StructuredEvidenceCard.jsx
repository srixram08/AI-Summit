import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  Layers, 
  RotateCcw, 
  HelpCircle,
  Cpu,
  Server,
  Zap,
  Sparkles
} from 'lucide-react';

export function StructuredEvidenceCard({ scenarioResult }) {
  const isDangerous = scenarioResult.key === 'dangerous';
  const trustScore = scenarioResult.trustScore || (isDangerous ? 38 : 91);
  const riskScore = scenarioResult.risk || (isDangerous ? 72 : 12);
  const confidence = scenarioResult.confidence || (isDangerous ? 81 : 94);
  const isPassed = !isDangerous && trustScore >= 80;

  return (
    <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] space-y-5">
      {/* Header with Title and Trust Score Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#edf3ee]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#0d5934] font-bold tracking-wider">
              EVIDENCE-BASED EXPLAINABILITY
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#edf5ee] text-[#526d60] border border-[#d8e6db]">
              Deterministic AI Governance
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#092218] mt-1 font-sans">
            Decision Evidence & Safety Justification
          </h3>
          <p className="text-xs text-[#526d60] mt-0.5">
            Vector decomposes every AI action into verifiable dimensions of risk, policy, telemetry, and rollback capability.
          </p>
        </div>

        {/* Big Trust Score Display */}
        <div className="flex items-center gap-3 bg-[#f8fbf9] border border-[#d8e6db] p-2.5 rounded-xl">
          <div className="text-right">
            <span className="text-[10px] font-mono text-[#526d60] uppercase block font-semibold">
              Vector Trust Score
            </span>
            <div className="flex items-baseline justify-end gap-1">
              <span className={`text-2xl font-mono font-black ${
                isPassed ? 'text-[#059669]' : 'text-[#dc2626]'
              }`}>
                {trustScore}
              </span>
              <span className="text-xs font-mono text-[#86a394]">/100</span>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isPassed ? 'bg-[#d7f2df] text-[#0d5934]' : 'bg-[#fef2f2] text-[#dc2626]'
          }`}>
            {isPassed ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Target Action Banner */}
      <div className="bg-[#f8fbf9] rounded-xl p-3.5 border border-[#e2ede5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-bold text-[#526d60] uppercase">Recommended Action:</span>
          <span className="text-xs sm:text-sm font-bold font-mono text-[#092218] bg-white px-2.5 py-1 rounded-lg border border-[#d8e6db]">
            {scenarioResult.title || "Scale API deployment 3 → 6 replicas"}
          </span>
        </div>
        <span className="text-xs font-mono text-[#526d60]">
          Proposed by: <strong className="text-[#092218]">{scenarioResult.agent || "AI Capacity Agent"}</strong>
        </span>
      </div>

      {/* Evidence Grid - 6 Key Enterprise Dimensions */}
      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#526d60] mb-3 flex items-center gap-2">
          <span>Vector Pre-Execution Verification Evidence</span>
          <span className="h-px flex-1 bg-[#edf3ee]" />
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* 1. Risk Metric */}
          <div className="p-3.5 rounded-xl border border-[#e2ede5] bg-white hover:border-[#cbdfd1] transition-all">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-[#526d60] uppercase text-[11px] font-semibold">1. Evaluated Risk</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                riskScore < 30 ? 'bg-[#d7f2df] text-[#0d5934]' : 'bg-[#fef2f2] text-[#dc2626]'
              }`}>
                {riskScore < 30 ? 'LOW RISK' : 'HIGH RISK'}
              </span>
            </div>
            <div className="text-base font-extrabold font-mono text-[#092218]">
              {riskScore}/100
            </div>
            <p className="text-[11px] text-[#526d60] mt-1">
              {riskScore < 30 ? 'Low failure probability, isolated blast radius.' : 'High failure probability, cascades downstream.'}
            </p>
          </div>

          {/* 2. Confidence Metric */}
          <div className="p-3.5 rounded-xl border border-[#e2ede5] bg-white hover:border-[#cbdfd1] transition-all">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-[#526d60] uppercase text-[11px] font-semibold">2. Model Confidence</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934]">
                HIGH CONFIDENCE
              </span>
            </div>
            <div className="text-base font-extrabold font-mono text-[#092218]">
              {confidence}%
            </div>
            <p className="text-[11px] text-[#526d60] mt-1">
              Deterministic inference based on historical 30-day cluster patterns.
            </p>
          </div>

          {/* 3. Policy Status */}
          <div className="p-3.5 rounded-xl border border-[#e2ede5] bg-white hover:border-[#cbdfd1] transition-all">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-[#526d60] uppercase text-[11px] font-semibold">3. Policy Guardrails</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                !isDangerous ? 'bg-[#d7f2df] text-[#0d5934]' : 'bg-[#fef2f2] text-[#dc2626]'
              }`}>
                {!isDangerous ? 'PASSED (0 VIOLATIONS)' : 'VIOLATION DETECTED'}
              </span>
            </div>
            <div className={`text-base font-extrabold font-mono ${!isDangerous ? 'text-[#059669]' : 'text-[#dc2626]'}`}>
              {!isDangerous ? 'Policy #POL-402 Passed' : 'Policy #POL-402 Violated'}
            </div>
            <p className="text-[11px] text-[#526d60] mt-1">
              {!isDangerous ? 'Scale within tier limit (6 <= 10 pods).' : 'Exceeds ceiling: 20 pods requested (max is 10).'}
            </p>
          </div>

          {/* 4. Projected Telemetry Impact */}
          <div className="p-3.5 rounded-xl border border-[#e2ede5] bg-white hover:border-[#cbdfd1] transition-all">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-[#526d60] uppercase text-[11px] font-semibold">4. Projected Telemetry</span>
              <span className="text-[10px] font-mono font-bold text-[#059669]">
                15-Min Twin
              </span>
            </div>
            <div className="text-base font-extrabold font-mono text-[#092218]">
              {!isDangerous ? 'CPU: 78% → 52%' : 'CPU: 78% → 34% (Stall)'}
            </div>
            <p className="text-[11px] text-[#526d60] mt-1">
              {!isDangerous ? 'Latency drops to 28ms; node balance maintained.' : 'DB connection pool saturates to 210% critical.'}
            </p>
          </div>

          {/* 5. Blast Radius */}
          <div className="p-3.5 rounded-xl border border-[#e2ede5] bg-white hover:border-[#cbdfd1] transition-all">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-[#526d60] uppercase text-[11px] font-semibold">5. Blast Radius</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                !isDangerous ? 'bg-[#d7f2df] text-[#0d5934]' : 'bg-[#fef2f2] text-[#dc2626]'
              }`}>
                {!isDangerous ? 'CONTAINED' : 'UNCONTAINED'}
              </span>
            </div>
            <div className="text-base font-extrabold font-mono text-[#092218]">
              {!isDangerous ? '1 Service (API Gateway)' : '3 Services (API, DB, Auth)'}
            </div>
            <p className="text-[11px] text-[#526d60] mt-1">
              {!isDangerous ? 'No downstream cascading connection risks.' : 'Cascading socket exhaustion to PostgreSQL Primary.'}
            </p>
          </div>

          {/* 6. Rollback Availability */}
          <div className="p-3.5 rounded-xl border border-[#e2ede5] bg-white hover:border-[#cbdfd1] transition-all">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-[#526d60] uppercase text-[11px] font-semibold">6. Rollback Checkpoint</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934]">
                READY ✓
              </span>
            </div>
            <div className="text-base font-extrabold font-mono text-[#059669]">
              Verified RTO &lt; 2.0s
            </div>
            <p className="text-[11px] text-[#526d60] mt-1">
              Pre-compiled cold-standby manifest ready with atomic step-down.
            </p>
          </div>
        </div>
      </div>

      {/* Decision Final Verdict Box */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isPassed 
          ? 'bg-[#092218] text-white border-[#153e2d]'
          : 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isPassed ? 'bg-[#163e2e] text-[#34d399]' : 'bg-[#fee2e2] text-[#dc2626]'
          }`}>
            {isPassed ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider block font-bold text-[#86a394]">
              FINAL VECTOR DIRECTIVE
            </span>
            <h4 className="text-base font-mono font-extrabold tracking-tight">
              {isPassed ? 'DECISION: SAFE TO EXECUTE' : 'DECISION: BLOCKED BY POLICY & BLAST RADIUS'}
            </h4>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border ${
            isPassed 
              ? 'bg-[#163e2e] text-[#a7f3d0] border-[#2b654c]' 
              : 'bg-white text-[#dc2626] border-[#fecaca]'
          }`}>
            {isPassed ? 'Autonomous Deployment Authorized' : 'Human Approval Required'}
          </span>
        </div>
      </div>
    </div>
  );
}
