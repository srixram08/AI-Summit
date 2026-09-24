import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Cpu, 
  HelpCircle, 
  ArrowLeft,
  Zap,
  Info
} from 'lucide-react';
import { ArchitectureTopology } from '../components/assurance/ArchitectureTopology';
import { ScenarioSelector } from '../components/assurance/ScenarioSelector';
import { AssuranceMatrix } from '../components/assurance/AssuranceMatrix';
import { DecisionPanel } from '../components/assurance/DecisionPanel';

export function Assurance({
  currentScenario,
  onSelectScenario,
  assuranceResult,
  executionState,
  onAutoExecute,
  onRequestHumanApproval,
  onResetExecution,
  onBackToDashboard
}) {
  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Workflow Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/60">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Center</span>
        </button>

        {/* 5-step visual pipeline indicator */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-slate-300">AI Recommendation</span>
          <span className="text-slate-600">→</span>
          <span className="text-cyan-400 font-bold">Vector Intercept</span>
          <span className="text-slate-600">→</span>
          <span className="text-purple-400 font-bold">Digital Twin</span>
          <span className="text-slate-600">→</span>
          <span className="text-amber-400 font-bold">Policy & Risk</span>
          <span className="text-slate-600">→</span>
          <span className="text-emerald-400 font-bold">Assurance Verdict</span>
        </div>
      </div>

      {/* Hero Visualizer: Application Architecture Topology */}
      <section aria-label="Digital Twin Architecture Topology">
        <ArchitectureTopology scenarioResult={assuranceResult} />
      </section>

      {/* Interactive Scenario Selector */}
      <section aria-label="AI Proposed Action Scenario Selector">
        <ScenarioSelector
          currentScenario={currentScenario}
          onSelectScenario={onSelectScenario}
        />
      </section>

      {/* Assurance Matrix (5 Guardrail Checks) */}
      <section aria-label="Vector Assurance Matrix">
        <AssuranceMatrix scenarioResult={assuranceResult} />
      </section>

      {/* Climax Section: Vector Decision Engine & Trust Score */}
      <section aria-label="Vector Decision Engine Climax">
        <DecisionPanel
          scenarioResult={assuranceResult}
          executionState={executionState}
          onAutoExecute={onAutoExecute}
          onRequestHumanApproval={onRequestHumanApproval}
          onResetExecution={onResetExecution}
        />
      </section>
    </div>
  );
}
