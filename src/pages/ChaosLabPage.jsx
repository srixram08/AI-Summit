import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  HardDrive, 
  TrendingUp, 
  AlertOctagon, 
  Database, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Activity,
  Cpu,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';
import { CHAOS_SCENARIOS } from '../data/governanceData';

export function ChaosLabPage({ onNavigateToAssurance, onNavigateToForensics }) {
  const [selectedChaos, setSelectedChaos] = useState(CHAOS_SCENARIOS[0]);
  const [activeStage, setActiveStage] = useState(0); // 0: idle, 1..8: pipeline steps
  const [isSimulating, setIsSimulating] = useState(false);

  const pipelineSteps = [
    { id: 1, label: "Fault Injected", sublabel: selectedChaos.initialMetric, icon: Zap },
    { id: 2, label: "Predictive Forecast", sublabel: selectedChaos.forecastAlert, icon: Clock },
    { id: 3, label: "AI Candidate Proposal", sublabel: selectedChaos.aiCandidateAction, icon: Activity },
    { id: 4, label: "Vector Intercept Gate", sublabel: "Pre-execution halt engaged", icon: ShieldCheck },
    { id: 5, label: "Digital Twin What-If", sublabel: selectedChaos.twinSimulationResult, icon: Layers },
    { id: 6, label: "Policy Guardrails", sublabel: selectedChaos.policyResult, icon: CheckCircle2 },
    { id: 7, label: "Trust Score & Verdict", sublabel: selectedChaos.verdict, icon: Sparkles },
    { id: 8, label: "Rollback & Forensics Log", sublabel: selectedChaos.rollbackReady ? "Rollback Ready ✓ Audit Logged" : "Block Logged in Audit Trail", icon: FileText }
  ];

  const runChaosSimulation = (scenario) => {
    setSelectedChaos(scenario);
    setIsSimulating(true);
    setActiveStage(1);

    let stage = 1;
    const interval = setInterval(() => {
      stage += 1;
      if (stage > 8) {
        clearInterval(interval);
        setIsSimulating(false);
      } else {
        setActiveStage(stage);
      }
    }, 750);
  };

  const resetChaos = () => {
    setActiveStage(0);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#dc2626] font-bold tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ef4444] animate-ping" />
              SYNTHETIC RESILIENCE LAB
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#fef2f2] text-[#dc2626] border border-[#fecaca] font-semibold">
              Closed-Loop Autonomous Demo
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#092218] mt-1">
            Chaos Injection & Autonomous Interception Lab
          </h2>
          <p className="text-xs text-[#526d60] mt-0.5 max-w-3xl leading-relaxed">
            Trigger real-time synthetic infrastructure disruptions to witness the complete end-to-end Vector pipeline:
            Anomaly Detection → AI Proposal → Vector Intercept → Twin Simulation → Policy Evaluation → Trust Score Verdict.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeStage > 0 && (
            <button
              onClick={resetChaos}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#d8e6db] text-[#526d60] text-xs font-mono font-bold hover:bg-[#f8fbf9] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          )}
        </div>
      </div>

      {/* Fault Injection Control Bar */}
      <div className="bg-[#092218] text-white rounded-2xl p-5 sm:p-6 border border-[#163e2e] shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#163e2e]">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#34d399]" />
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-white">
              SELECT FAULT TO INJECT INTO CLUSTER:
            </h3>
          </div>
          <span className="text-xs font-mono text-[#86a394]">
            5 Autonomous Scenarios Ready
          </span>
        </div>

        {/* 5 Fault Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CHAOS_SCENARIOS.map((chaos) => {
            const isSelected = selectedChaos.id === chaos.id;
            return (
              <button
                key={chaos.id}
                onClick={() => runChaosSimulation(chaos)}
                disabled={isSimulating}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected && activeStage > 0
                    ? 'bg-[#163e2e] border-[#34d399] shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                    : 'bg-[#0d2a1d] border-[#1f503a] hover:border-[#34d399] hover:bg-[#133827]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase" style={{ backgroundColor: `${chaos.color}25`, color: chaos.color }}>
                    {chaos.id.replace('-', ' ')}
                  </span>
                </div>
                <h4 className="text-xs font-bold font-mono text-white tracking-tight">
                  {chaos.name.split(' (')[0]}
                </h4>
                <span className="text-[10px] text-[#86a394] font-sans block mt-1">
                  Click to execute
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 8-Stage Visual Pipeline Stepper */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#edf3ee]">
          <div>
            <h3 className="text-base font-extrabold text-[#092218]">
              Vector Autonomous Interception Pipeline
            </h3>
            <p className="text-xs text-[#526d60] mt-0.5">
              Live progression of the pre-execution decision assurance pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#526d60]">
              Status:
            </span>
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
              activeStage === 0
                ? 'bg-[#edf5ee] text-[#526d60]'
                : activeStage < 8
                ? 'bg-[#fffbeb] text-[#b45309] animate-pulse'
                : selectedChaos.decisionType === 'AUTO_EXECUTE'
                ? 'bg-[#d7f2df] text-[#0d5934]'
                : 'bg-[#fef2f2] text-[#dc2626]'
            }`}>
              {activeStage === 0 ? 'IDLE (Select Fault)' : activeStage < 8 ? `STEP ${activeStage} OF 8` : 'PIPELINE COMPLETE'}
            </span>
          </div>
        </div>

        {/* Step-by-Step Interactive Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            const isCompleted = activeStage >= step.id;
            const isCurrent = activeStage === step.id;

            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#f8fbf9] border-[#b8e8c6] shadow-2xs'
                    : 'bg-white border-[#e2ede5] opacity-60'
                } ${isCurrent ? 'ring-2 ring-[#059669] scale-[1.02] opacity-100' : ''}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#86a394] font-bold">
                    STEP {step.id}
                  </span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    isCompleted ? 'bg-[#d7f2df] text-[#0d5934]' : 'bg-[#edf5ee] text-[#86a394]'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="text-xs font-bold font-mono text-[#092218]">
                  {step.label}
                </h4>
                <p className="text-[11px] text-[#526d60] mt-1 font-sans leading-tight">
                  {step.sublabel}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pipeline Completed Final Summary Callout */}
        {activeStage === 8 && (
          <div className={`p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn ${
            selectedChaos.decisionType === 'AUTO_EXECUTE'
              ? 'bg-[#092218] text-white border-[#163e2e]'
              : 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]'
          }`}>
            <div className="flex items-center gap-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                selectedChaos.decisionType === 'AUTO_EXECUTE'
                  ? 'bg-[#163e2e] text-[#34d399]'
                  : 'bg-[#fee2e2] text-[#dc2626]'
              }`}>
                {selectedChaos.decisionType === 'AUTO_EXECUTE' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider block font-bold text-[#86a394]">
                  FINAL PIPELINE VERDICT
                </span>
                <h4 className="text-base font-extrabold font-mono">
                  {selectedChaos.verdict}
                </h4>
                <p className="text-xs mt-0.5 opacity-90 font-sans">
                  {selectedChaos.decisionType === 'AUTO_EXECUTE'
                    ? 'All pre-execution safety gates passed. Rollback manifest verified. Production deployment simulated successfully.'
                    : 'Critical policy violation detected. Cascading downstream blast radius prevented.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigateToAssurance && onNavigateToAssurance(selectedChaos.decisionType === 'AUTO_EXECUTE' ? 'safe' : 'dangerous')}
                className="px-4 py-2 rounded-xl bg-white text-[#092218] font-mono font-bold text-xs hover:bg-[#edf5ee] cursor-pointer shadow-xs"
              >
                Inspect in Assurance
              </button>
              <button
                onClick={() => onNavigateToForensics && onNavigateToForensics()}
                className="px-4 py-2 rounded-xl bg-[#163e2e] text-white border border-[#2b654c] font-mono font-bold text-xs hover:bg-[#1d4c38] cursor-pointer"
              >
                View Forensics Log
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
