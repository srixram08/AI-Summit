import React from 'react';
import { 
  ChevronDown, 
  Settings, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight,
  Sliders,
  Calendar
} from 'lucide-react';
import { DeliveriesCard } from '../components/dashboard/DeliveriesCard';
import { RevenueCostsChart } from '../components/dashboard/RevenueCostsChart';
import { BalanceCostsCard } from '../components/dashboard/BalanceCostsCard';
import { CostsByCategoryCard } from '../components/dashboard/CostsByCategoryCard';
import { InvoicesTableCard } from '../components/dashboard/InvoicesTableCard';

export function Dashboard({ 
  clusterHealth, 
  telemetry, 
  recommendations, 
  onNavigateToAssurance 
}) {
  return (
    <div className="space-y-5 font-sans">
      {/* Sub-Header Context Bar matching Dribbble shot */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#526d60]">
        <div className="flex flex-wrap items-center gap-3">
          {/* Date range filter dropdown */}
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e2ede5] text-[#092218] font-medium shadow-2xs hover:bg-[#f8fbf9] cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#86a394]" />
            <span>Changes: <strong className="font-semibold">Last month (Jul 20 - Aug 20)</strong></span>
            <ChevronDown className="w-3.5 h-3.5 text-[#86a394]" />
          </button>

          {/* Sync indicator */}
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#86a394]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
            <span>Last update: 3 min ago</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Hero Simulation Button */}
          <button
            onClick={() => onNavigateToAssurance('safe')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#092218] hover:bg-[#163e2e] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:scale-[1.01] cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#34d399]" />
            <span>Simulate AI Decision</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Manage Layout icon */}
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#e2ede5] text-[#526d60] hover:text-[#092218] shadow-2xs hover:bg-[#f8fbf9] cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Manage layout</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid (Left ~58%, Right ~42%) matching Dribbble screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (Span 7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* 1. Deliveries Card (Fleet Utilization equalizer, gauge, sparkline) */}
          <DeliveriesCard />

          {/* 2. Revenue and Costs Multi-Line Telemetry Chart */}
          <RevenueCostsChart />

          {/* 3. Bottom Row: Balance & Costs + Costs by Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <BalanceCostsCard />
            <CostsByCategoryCard />
          </div>
        </div>

        {/* Right Column (Span 5) - Invoices / Intercepted Actions Table */}
        <div className="lg:col-span-5">
          <InvoicesTableCard onInspect={(scenarioKey) => onNavigateToAssurance(scenarioKey)} />
        </div>
      </div>
    </div>
  );
}
