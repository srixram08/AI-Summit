import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  Zap, 
  TrendingDown, 
  TrendingUp, 
  Minus 
} from 'lucide-react';

export function WhatIfComparison({ scenarioKey = 'safe', onNavigateToAssurance }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationCompleted, setSimulationCompleted] = useState(false);
  const isDangerous = scenarioKey === 'dangerous';

  const metrics = isDangerous
    ? [
        { name: 'Cluster CPU', current: '78%', after: '34%', change: '↓ 44%', changeType: 'warning', note: 'Severe node fragmentation' },
        { name: 'Memory Pressure', current: '71%', after: '89%', change: '↑ 18%', changeType: 'danger', note: 'Approaching node eviction' },
        { name: 'P99 API Latency', current: '42ms', after: '220ms', change: '↑ 178ms', changeType: 'danger', note: 'Database queue stall' },
        { name: 'Replica Count', current: '3 pods', after: '20 pods', change: '+17 pods', changeType: 'danger', note: 'Violates Max 10 Pod Policy' },
        { name: 'DB Connection Pool', current: '54%', after: '210%', change: '↑ 156%', changeType: 'danger', note: 'CRITICAL POOL EXHAUSTION' },
        { name: 'Monthly Cost Delta', current: '$1,420', after: '$2,440', change: '+$1,020', changeType: 'warning', note: 'Budget ceiling exceeded' }
      ]
    : [
        { name: 'Cluster CPU', current: '82%', after: '55%', change: '↓ 27%', changeType: 'good', note: 'Restores healthy headroom' },
        { name: 'Memory Pressure', current: '74%', after: '61%', change: '↓ 13%', changeType: 'good', note: 'Balanced distribution' },
        { name: 'P99 API Latency', current: '420ms', after: '210ms', change: '↓ 50%', changeType: 'good', note: 'Preserves customer SLA' },
        { name: 'Replica Count', current: '3 pods', after: '6 pods', change: '+3 pods', changeType: 'good', note: 'Approved (Within 10 limit)' },
        { name: 'DB Connection Pool', current: '54%', after: '72%', change: '+18%', changeType: 'good', note: 'Safe (< 85% safety cutoff)' },
        { name: 'Monthly Cost Delta', current: '$1,420', after: '$1,600', change: '+$180', changeType: 'neutral', note: 'Within authorized budget' }
      ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationCompleted(false);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationCompleted(true);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#edf3ee]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#0d5934] font-bold tracking-wider">
              WHAT-IF TWIN ANALYSIS
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#edf5ee] text-[#092218] border border-[#d8e6db] font-semibold">
              15-Min Forward Projection
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-extrabold text-[#092218] mt-0.5">
            Predictive Impact Comparison: Current State vs. Proposed Action
          </h3>
          <p className="text-xs text-[#526d60] mt-0.5">
            Vector simulates the blast radius and multi-tier telemetry consequences before manifests touch production.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-xs cursor-pointer ${
              isSimulating
                ? 'bg-[#edf5ee] text-[#86a394] border border-[#d8e6db]'
                : 'bg-[#092218] hover:bg-[#163e2e] text-white hover:scale-[1.01]'
            }`}
          >
            {isSimulating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-[#092218] border-t-transparent rounded-full animate-spin" />
                <span>Simulating Load...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-[#34d399]" />
                <span>{simulationCompleted ? 'Re-run Simulation' : 'Run Simulation'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comparative Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="border-b border-[#e2ede5] text-[11px] font-mono text-[#526d60] uppercase tracking-wider bg-[#f8fbf9]">
              <th className="py-3 px-3 rounded-l-xl font-bold">Metric Dimension</th>
              <th className="py-3 px-3 font-bold text-right">Current State</th>
              <th className="py-3 px-3 font-bold text-right">After Action (Twin)</th>
              <th className="py-3 px-3 font-bold text-center">Projected Change</th>
              <th className="py-3 px-3 rounded-r-xl font-bold">Assurance Safety Assessment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#edf3ee]">
            {metrics.map((row, idx) => (
              <tr 
                key={idx} 
                className={`transition-colors hover:bg-[#f8fbf9] ${
                  simulationCompleted ? 'animate-fadeIn' : ''
                }`}
              >
                <td className="py-3 px-3 font-semibold text-[#092218] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                  <span>{row.name}</span>
                </td>
                <td className="py-3 px-3 text-right font-mono font-medium text-[#526d60]">
                  {row.current}
                </td>
                <td className="py-3 px-3 text-right font-mono font-extrabold text-[#092218]">
                  {row.after}
                </td>
                <td className="py-3 px-3 text-center">
                  <span className={`inline-flex items-center gap-1 font-mono text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    row.changeType === 'good'
                      ? 'bg-[#d7f2df] text-[#0d5934] border-[#b9e5c5]'
                      : row.changeType === 'danger'
                      ? 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]'
                      : 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]'
                  }`}>
                    {row.change}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-[11px] font-mono font-medium flex items-center gap-1.5 ${
                    row.changeType === 'danger' ? 'text-[#dc2626] font-bold' : 'text-[#334e40]'
                  }`}>
                    {row.changeType === 'danger' && <AlertTriangle className="w-3.5 h-3.5 text-[#dc2626] flex-shrink-0" />}
                    {row.changeType === 'good' && <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] flex-shrink-0" />}
                    <span>{row.note}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decision Callout */}
      <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
        isDangerous
          ? 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]'
          : 'bg-[#e6f7ec] border-[#b8e8c6] text-[#065f46]'
      }`}>
        <div className="flex items-center gap-3">
          {isDangerous ? (
            <AlertTriangle className="w-5 h-5 text-[#dc2626] flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#059669] flex-shrink-0" />
          )}
          <div>
            <span className="font-mono font-bold block text-sm">
              {isDangerous ? 'WHAT-IF VERDICT: BLOCKED BY SIMULATION' : 'WHAT-IF VERDICT: SAFE TO EXECUTE'}
            </span>
            <span className="text-[11px] leading-relaxed">
              {isDangerous 
                ? 'Simulation proves proposed change causes downstream database exhaustion (210%). Autonomous execution halted.'
                : 'Simulation validates multi-tier capacity headroom and sub-210ms P99 latency SLA preservation.'}
            </span>
          </div>
        </div>

        {onNavigateToAssurance && (
          <button
            onClick={() => onNavigateToAssurance(scenarioKey)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border font-mono font-bold text-xs text-[#092218] hover:bg-[#f8fbf9] shadow-2xs flex-shrink-0 cursor-pointer"
          >
            <span>Inspect Evidence</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
