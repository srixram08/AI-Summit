import React from 'react';
import { 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Layers, 
  LayoutDashboard,
  CheckCircle2,
  RefreshCw,
  Terminal
} from 'lucide-react';
import { StatusDot } from '../common/StatusDot';

export function Header({ 
  currentTab, 
  onSelectTab, 
  demoMode, 
  setDemoMode, 
  lastSyncTime = 'just now' 
}) {
  const titles = {
    dashboard: {
      title: 'Command Center',
      subtitle: 'Real-time infrastructure health and AI recommendation monitoring'
    },
    'digital-twin': {
      title: 'Digital Twin Topology',
      subtitle: 'Simulate AI actions across microservice tiers before applying changes'
    },
    assurance: {
      title: 'Digital Twin & Decision Assurance',
      subtitle: 'Simulate AI actions before they touch production.'
    }
  };

  const currentInfo = titles[currentTab] || titles.dashboard;

  return (
    <header className="sticky top-0 z-30 bg-[#080c14]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Title & Subtitle */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              {currentInfo.title}
            </h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <StatusDot status="healthy" size="sm" />
              <span className="font-semibold tracking-wider">LIVE</span>
            </div>
            <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
              Last updated: {lastSyncTime}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {currentInfo.subtitle}
          </p>
        </div>

        {/* Right: Controls & Demo Mode */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-2.5 py-1 rounded font-medium ${
                currentTab === 'dashboard' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
              }`}
            >
              Dash
            </button>
            <button
              onClick={() => onSelectTab('digital-twin')}
              className={`px-2.5 py-1 rounded font-medium ${
                currentTab === 'digital-twin' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
              }`}
            >
              Twin
            </button>
            <button
              onClick={() => onSelectTab('assurance')}
              className={`px-2.5 py-1 rounded font-medium ${
                currentTab === 'assurance' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
              }`}
            >
              Assurance
            </button>
          </div>

          {/* Local Simulation Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>LOCAL SIMULATION</span>
          </div>

          {/* Demo Mode Toggle */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-medium text-slate-300">DEMO MODE</span>
            <button
              type="button"
              role="switch"
              aria-checked={demoMode}
              onClick={() => setDemoMode(!demoMode)}
              className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                demoMode ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  demoMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
