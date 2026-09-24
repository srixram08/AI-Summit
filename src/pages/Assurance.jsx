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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#edf3ee]">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-2 text-xs font-mono font-bold text-[#526d60] hover:text-[#092218] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Command Center</span>
        </button>

        {/* 5-step visual pipeline indicator */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-[#526d60] bg-white px-3.5 py-1.5 rounded-full border border-[#d8e6db] shadow-xs">
          <span className="text-[#698a78]">AI Agent</span>
          <span className="text-[#a4c2b2]">→</span>
          <span className="text-[#092218] font-bold">Vector Intercept</span>
          <span className="text-[#a4c2b2]">→</span>
          <span className="text-[#059669] font-bold">Digital Twin</span>
          <span className="text-[#a4c2b2]">→</span>
          <span className="text-[#d97706] font-bold">Policy & Risk</span>
          <span className="text-[#a4c2b2]">→</span>
          <span className="text-[#0d5934] font-extrabold bg-[#d7f2df] px-2 py-0.5 rounded-full border border-[#b9e5c5]">Assurance Verdict</span>
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
