import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertOctagon, 
  DollarSign, 
  Sliders, 
  Sparkles,
  ArrowRight,
  Layers,
  Award
} from 'lucide-react';
import { ENTERPRISE_ROI_DATA } from '../data/governanceData';

export function RoiImpactPage({ onNavigateToAssurance }) {
  // Interactive ROI Calculator State
  const [hourlyOutageCost, setHourlyOutageCost] = useState(280000); // ₹2,80,000 / hr
  const [monitoredServices, setMonitoredServices] = useState(18);
  const [monthlyAgentActions, setMonthlyAgentActions] = useState(120);

  // Computed ROI metrics
  const calculatedAvoidedMinutes = 18;
  const calculatedSavings = Math.round((hourlyOutageCost / 60) * calculatedAvoidedMinutes);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#0d5934] font-bold tracking-wider">
              ENTERPRISE BUSINESS VALUE & ROI
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5] font-semibold">
              Simulated Enterprise Metrics
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#092218] mt-1">
            Operational Reliability & SRE Cost Avoidance
          </h2>
          <p className="text-xs text-[#526d60] mt-0.5 max-w-3xl leading-relaxed">
            Quantifying the financial and operational risk mitigation delivered by Vector's pre-execution decision assurance layer.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-[#092218] text-white font-mono text-xs font-bold flex items-center gap-2 flex-shrink-0">
          <Award className="w-4 h-4 text-[#34d399]" />
          <span>78% MTTR Reduction</span>
        </div>
      </div>

      {/* Hero Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Cost Avoided */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2ede5] shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-[#526d60] uppercase font-bold text-[11px]">
              Downtime Cost Avoided
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934]">
              ESTIMATED
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#059669]">
            {ENTERPRISE_ROI_DATA.costAvoidedFormatted}
          </div>
          <p className="text-xs text-[#526d60] mt-1">
            ~{ENTERPRISE_ROI_DATA.usdEquivalent} avoided in SLA downtime penalties.
          </p>
        </div>

        {/* Metric 2: Downtime Minutes */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2ede5] shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-[#526d60] uppercase font-bold text-[11px]">
              Potential Outage Avoided
            </span>
            <Clock className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#092218]">
            18 Minutes
          </div>
          <p className="text-xs text-[#526d60] mt-1">
            Based on 2 catastrophic cascading failures prevented.
          </p>
        </div>

        {/* Metric 3: Risky Actions Blocked */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2ede5] shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-[#526d60] uppercase font-bold text-[11px]">
              Risky Actions Blocked
            </span>
            <AlertOctagon className="w-4 h-4 text-[#dc2626]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#dc2626]">
            7 Blocked
          </div>
          <p className="text-xs text-[#526d60] mt-1">
            Stopped AI agents from saturating database connections & IOPS.
          </p>
        </div>

        {/* Metric 4: Autonomous Remediations */}
        <div className="bg-white rounded-2xl p-5 border border-[#e2ede5] shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-mono text-[#526d60] uppercase font-bold text-[11px]">
              Safe Remediations
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#092218]">
            14 Auto-Applied
          </div>
          <p className="text-xs text-[#526d60] mt-1">
            Zero-toil autonomous cluster optimizations executed with 91+ Trust.
          </p>
        </div>
      </div>

      {/* Interactive Enterprise Value & ROI Calculator */}
      <div className="bg-[#092218] text-white rounded-2xl p-5 sm:p-6 border border-[#163e2e] shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#163e2e]">
          <div>
            <div className="flex items-center gap-2 text-[#34d399] text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Enterprise ROI Calculator</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
              Simulate Your Organization's Downtime Risk & Cost Savings
            </h3>
            <p className="text-xs text-[#86a394] mt-0.5">
              Adjust parameters to project Vector's annual risk mitigation impact.
            </p>
          </div>

          <div className="text-right bg-[#163e2e] border border-[#2b654c] px-4 py-2.5 rounded-xl">
            <span className="text-[10px] font-mono text-[#86a394] uppercase block">
              Simulated Incident Savings
            </span>
            <span className="text-xl sm:text-2xl font-mono font-extrabold text-[#34d399]">
              ₹{calculatedSavings.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Slider 1: Hourly Outage Cost */}
          <div className="space-y-2 bg-[#0e2c20] p-4 rounded-xl border border-[#1d4c38]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#86a394]">Avg. Outage Cost (/hr):</span>
              <span className="font-bold text-[#34d399]">₹{hourlyOutageCost.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="50000" 
              max="1000000" 
              step="25000"
              value={hourlyOutageCost}
              onChange={(e) => setHourlyOutageCost(Number(e.target.value))}
              className="w-full accent-[#34d399] cursor-pointer"
            />
            <span className="text-[10px] text-[#86a394] block">Based on enterprise revenue tier & user scale.</span>
          </div>

          {/* Slider 2: Monitored Services */}
          <div className="space-y-2 bg-[#0e2c20] p-4 rounded-xl border border-[#1d4c38]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#86a394]">Production Services:</span>
              <span className="font-bold text-[#34d399]">{monitoredServices} Tiers</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="100" 
              step="1"
              value={monitoredServices}
              onChange={(e) => setMonitoredServices(Number(e.target.value))}
              className="w-full accent-[#34d399] cursor-pointer"
            />
            <span className="text-[10px] text-[#86a394] block">Protected microservices in the Digital Twin replica.</span>
          </div>

          {/* Slider 3: Monthly Agent Actions */}
          <div className="space-y-2 bg-[#0e2c20] p-4 rounded-xl border border-[#1d4c38]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#86a394]">Monthly AI Actions:</span>
              <span className="font-bold text-[#34d399]">{monthlyAgentActions} Actions</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="500" 
              step="10"
              value={monthlyAgentActions}
              onChange={(e) => setMonthlyAgentActions(Number(e.target.value))}
              className="w-full accent-[#34d399] cursor-pointer"
            />
            <span className="text-[10px] text-[#86a394] block">Autonomous infrastructure mutations evaluated.</span>
          </div>
        </div>
      </div>

      {/* Prevented Outages Breakdown Table */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] space-y-4">
        <h3 className="text-base font-extrabold text-[#092218]">
          Prevented Outage Log (Historical Interception Savings)
        </h3>
        <p className="text-xs text-[#526d60]">
          Specific incidents where Vector intercepted high-risk AI proposals before production impact.
        </p>

        <div className="space-y-3">
          {ENTERPRISE_ROI_DATA.breakdown.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-[#e2ede5] bg-[#f8fbf9] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#059669]">SAVED {item.savedMinutes} MIN DOWNTIME</span>
                  <span className="text-[11px] font-mono text-[#86a394]">• Value: {item.savedCost}</span>
                </div>
                <h4 className="text-sm font-bold text-[#092218]">
                  {item.incident}
                </h4>
                <p className="text-xs text-[#526d60] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => onNavigateToAssurance && onNavigateToAssurance('dangerous')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#d8e6db] text-xs font-mono font-bold text-[#092218] hover:bg-[#edf5ee] flex-shrink-0 cursor-pointer shadow-2xs"
              >
                <span>Inspect Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
