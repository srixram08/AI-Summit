import React, { useState } from 'react';
import { 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  Play, 
  Layers, 
  ArrowRight,
  AlertTriangle,
  FileCode,
  Sparkles
} from 'lucide-react';
import { ROLLBACK_REGISTRY } from '../data/governanceData';

export function RollbackPage({ onNavigateToAssurance }) {
  const [activePlan, setActivePlan] = useState(ROLLBACK_REGISTRY[0]);
  const [drillStage, setDrillStage] = useState(0); // 0: idle, 1..5: active step, 6: completed
  const [isDrillRunning, setIsDrillRunning] = useState(false);

  const startRollbackDrill = () => {
    setIsDrillRunning(true);
    setDrillStage(1);

    const stepInterval = setInterval(() => {
      setDrillStage((prev) => {
        if (prev >= 5) {
          clearInterval(stepInterval);
          setIsDrillRunning(false);
          return 6; // Done
        }
        return prev + 1;
      });
    }, 700);
  };

  const resetDrill = () => {
    setDrillStage(0);
    setIsDrillRunning(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#0d5934] font-bold tracking-wider">
              DETERMINISTIC RESILIENCE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5] font-semibold">
              RTO &lt; 2.0s Sub-Second Recovery
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#092218] mt-1">
            Automated Rollback Planner & Standby Registry
          </h2>
          <p className="text-xs text-[#526d60] mt-0.5 max-w-3xl leading-relaxed">
            Vector refuses to approve autonomous infrastructure mutations unless an atomic, zero-downtime rollback manifest is pre-compiled and cryptographically attested in cold standby.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5] font-mono text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
            <span>Rollback Ready ✓</span>
          </div>
        </div>
      </div>

      {/* Main Rollback Plan Details Card */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] space-y-6">
        {/* Active Action Metadata */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#edf3ee]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#86a394]">ACTION ID: {activePlan.actionId}</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#edf5ee] text-[#092218] border border-[#d8e6db]">
                Target: {activePlan.target}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#092218] font-mono">
              Action: {activePlan.action}
            </h3>
            <p className="text-xs text-[#526d60] font-mono">
              Cryptographic Standby Digest: <strong className="text-[#092218]">{activePlan.manifestHash}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-[#526d60] uppercase block font-semibold">
                Guaranteed Recovery Time
              </span>
              <span className="text-xl font-mono font-extrabold text-[#059669]">
                {activePlan.rto}
              </span>
            </div>

            <button
              onClick={startRollbackDrill}
              disabled={isDrillRunning}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-xs cursor-pointer ${
                isDrillRunning
                  ? 'bg-[#edf5ee] text-[#86a394] border border-[#d8e6db]'
                  : 'bg-[#092218] hover:bg-[#163e2e] text-white hover:scale-[1.01]'
              }`}
            >
              {isDrillRunning ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-[#092218] border-t-transparent rounded-full animate-spin" />
                  <span>Drill in Progress...</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-[#34d399]" />
                  <span>Simulate Dry-Run Drill</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5-Step Verified Rollback Plan Timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#526d60]">
              Verified Execution Sequence (Automated Canary Step-Down)
            </h4>
            {drillStage > 0 && (
              <button
                onClick={resetDrill}
                className="text-[11px] font-mono text-[#059669] hover:underline cursor-pointer"
              >
                Reset Drill
              </button>
            )}
          </div>

          <div className="space-y-3">
            {activePlan.steps.map((step) => {
              const isCurrent = drillStage === step.id;
              const isDone = drillStage > step.id || drillStage === 6;

              return (
                <div
                  key={step.id}
                  className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                    isDone
                      ? 'bg-[#f2faf5] border-[#b8e8c6] text-[#0d5934]'
                      : isCurrent
                      ? 'bg-[#fffbeb] border-[#fde68a] text-[#b45309] shadow-sm scale-[1.01]'
                      : 'bg-white border-[#e2ede5] text-[#526d60]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 ${
                    isDone
                      ? 'bg-[#059669] text-white'
                      : isCurrent
                      ? 'bg-[#d97706] text-white animate-pulse'
                      : 'bg-[#edf5ee] text-[#526d60]'
                  }`}>
                    {isDone ? '✓' : step.id}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs sm:text-sm font-bold font-mono text-[#092218]">
                        Step {step.id}: {step.title}
                      </h5>
                      <span className="text-[10px] font-mono font-semibold">
                        {isDone ? 'COMPLETED' : isCurrent ? 'EXECUTING...' : 'STANDBY'}
                      </span>
                    </div>
                    <p className="text-xs text-[#526d60] mt-1 font-sans leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drill Success Confirmation Banner */}
        {drillStage === 6 && (
          <div className="p-4 rounded-xl bg-[#d7f2df] border border-[#b9e5c5] text-[#0d5934] flex items-center justify-between gap-3 text-xs animate-fadeIn font-mono">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#059669] flex-shrink-0" />
              <div>
                <span className="font-bold block">DRY-RUN ROLLBACK DRILL VALIDATED SUCCESSFULLY</span>
                <span className="text-[11px] font-sans">
                  Simulated cluster step-down completed in 1.84 seconds. Zero dropped connections, telemetry fully restored.
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigateToAssurance && onNavigateToAssurance('safe')}
              className="px-3 py-1.5 rounded-lg bg-[#092218] text-white font-bold text-xs hover:bg-[#163e2e] cursor-pointer flex-shrink-0"
            >
              Return to Assurance
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
