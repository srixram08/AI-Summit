import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  Play, 
  RotateCcw, 
  Lock, 
  Terminal, 
  Layers, 
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ENTERPRISE_POLICIES, POLICY_VIOLATION_TEST_CASES } from '../data/governanceData';

export function PoliciesPage({ onNavigateToAssurance }) {
  const [policies, setPolicies] = useState(ENTERPRISE_POLICIES);
  const [selectedTestCase, setSelectedTestCase] = useState(POLICY_VIOLATION_TEST_CASES[0]);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const togglePolicy = (policyId) => {
    setPolicies(prev => prev.map(p => 
      p.id === policyId 
        ? { ...p, status: p.status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE' }
        : p
    ));
  };

  const runPolicyEvaluation = (testCase) => {
    setIsEvaluating(true);
    setEvaluationResult(null);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationResult({
        testCase,
        status: testCase.result,
        message: testCase.verdictMessage,
        timestamp: new Date().toLocaleTimeString(),
        policyViolated: testCase.policyId
      });
    }, 600);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#0d5934] font-bold tracking-wider">
              ENTERPRISE GOVERNANCE ENGINE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5] font-semibold">
              Pre-Execution Enforcement
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#092218] mt-1">
            Cluster Policy & Guardrail Enforcement Console
          </h2>
          <p className="text-xs text-[#526d60] mt-0.5 max-w-3xl leading-relaxed">
            Vector acts as an immutable policy firewall for autonomous operations. Any AI agent proposal that breaches infrastructure constraints is halted before manifests are sent to the Kubernetes API.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-[#092218] text-white font-mono text-xs font-bold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#34d399]" />
            <span>6 Active Guardrails</span>
          </div>
        </div>
      </div>

      {/* Interactive Policy Violation Simulator */}
      <div className="bg-[#092218] text-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#163e2e] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#163e2e]">
          <div>
            <div className="flex items-center gap-2 text-[#34d399] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Enterprise Policy Sandbox</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Simulate an Autonomous AI Policy Violation
            </h3>
            <p className="text-xs text-[#86a394] mt-0.5">
              Select an aggressive AI action to witness how Vector deterministically intercepts and blocks non-compliant changes.
            </p>
          </div>

          <button
            onClick={() => runPolicyEvaluation(selectedTestCase)}
            disabled={isEvaluating}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#34d399] hover:bg-[#2bb883] text-[#092218] font-mono font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm"
          >
            {isEvaluating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#092218] border-t-transparent rounded-full animate-spin" />
                <span>Evaluating Rules...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Evaluate Against Policies</span>
              </>
            )}
          </button>
        </div>

        {/* Test Case Selection Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {POLICY_VIOLATION_TEST_CASES.map((tc) => {
            const isSelected = selectedTestCase.id === tc.id;
            return (
              <button
                key={tc.id}
                onClick={() => {
                  setSelectedTestCase(tc);
                  runPolicyEvaluation(tc);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#163e2e] border-[#34d399] shadow-sm'
                    : 'bg-[#0e2c20] border-[#1d4c38] hover:border-[#2b654c]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#86a394] mb-1">
                  <span>{tc.policyId}</span>
                  <span className="text-[#fca5a5] font-semibold">Violation Drill</span>
                </div>
                <h4 className="text-xs font-bold text-white font-mono">
                  {tc.title}
                </h4>
                <p className="text-[11px] text-[#86a394] mt-1 font-sans">
                  Violates: <strong className="text-white">{tc.violatingValue}</strong> (Limit: {tc.threshold})
                </p>
              </button>
            );
          })}
        </div>

        {/* Evaluation Output Terminal */}
        {evaluationResult && (
          <div className="mt-4 p-4 rounded-xl bg-black/60 border border-[#dc2626]/60 space-y-2 font-mono text-xs animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2 text-[#f87171] font-bold">
                <XCircle className="w-4 h-4" />
                <span>INTERCEPTION DIRECTIVE: ❌ BLOCKED BY POLICY</span>
              </div>
              <span className="text-[11px] text-[#86a394]">{evaluationResult.timestamp}</span>
            </div>

            <p className="text-[#fca5a5] leading-relaxed pt-1">
              {evaluationResult.message}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#86a394] border-t border-white/10">
              <span>Resolution: {selectedTestCase.recommendationAction}</span>
              <button
                onClick={() => onNavigateToAssurance && onNavigateToAssurance('dangerous')}
                className="text-[#34d399] hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <span>Inspect in Decision Assurance</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Policies Catalog Table */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#edf3ee]">
          <div>
            <h3 className="text-base font-extrabold text-[#092218]">
              Active Vector Governance Policies Catalog
            </h3>
            <p className="text-xs text-[#526d60] mt-0.5">
              Production guardrails evaluated by the deterministic assurance engine on every proposed action.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-[#526d60]">
            {policies.filter(p => p.status === 'ACTIVE').length} / {policies.length} Enforced
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#e2ede5] text-[11px] font-mono text-[#526d60] uppercase bg-[#f8fbf9]">
                <th className="py-3 px-3 rounded-l-xl font-bold">Policy ID & Name</th>
                <th className="py-3 px-3 font-bold">Category</th>
                <th className="py-3 px-3 font-bold">Scope</th>
                <th className="py-3 px-3 font-bold">Rule Constraint</th>
                <th className="py-3 px-3 font-bold">Enforcement</th>
                <th className="py-3 px-3 rounded-r-xl font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf3ee]">
              {policies.map((policy) => {
                const isActive = policy.status === 'ACTIVE';
                return (
                  <tr key={policy.id} className="hover:bg-[#f8fbf9] transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#092218]">{policy.id}</span>
                        <span className="font-semibold text-[#092218]">• {policy.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#86a394] block mt-0.5">
                        {policy.lastTriggered}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#526d60]">
                      {policy.category}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-[11px] text-[#0d5934] font-semibold">
                      {policy.scope}
                    </td>
                    <td className="py-3.5 px-3 text-[#334e40] max-w-md font-sans leading-relaxed">
                      {policy.rule}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                        policy.enforcement === 'HARD_BLOCK'
                          ? 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]'
                          : 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]'
                      }`}>
                        {policy.enforcement}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => togglePolicy(policy.id)}
                        className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#d7f2df] text-[#0d5934] border-[#b9e5c5] hover:bg-[#c2ebd0]'
                            : 'bg-[#edf5ee] text-[#86a394] border-[#d8e6db]'
                        }`}
                      >
                        {isActive ? '✓ ACTIVE' : 'PAUSED'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
