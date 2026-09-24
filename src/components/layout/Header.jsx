import React from 'react';
import { 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Layers, 
  LayoutDashboard,
  CheckCircle2,
  RefreshCw,
  Terminal,
  LogOut,
  User
} from 'lucide-react';
import { StatusDot } from '../common/StatusDot';

export function Header({ 
  currentTab, 
  onSelectTab, 
  demoMode, 
  setDemoMode, 
  lastSyncTime = 'just now',
  user,
  onLogout
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
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#e2ede5] px-4 sm:px-6 py-3.5 transition-all shadow-[0_2px_12px_-4px_rgba(9,34,24,0.03)]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Title & Subtitle */}
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-lg sm:text-xl font-extrabold text-[#092218] tracking-tight flex items-center gap-2 font-sans">
              {currentInfo.title}
            </h1>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d7f2df] border border-[#b9e5c5] text-[#0d5934] text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="tracking-wider">LIVE</span>
            </div>
            <span className="hidden sm:inline-block text-xs text-[#698a78] font-mono">
              Synced: {lastSyncTime}
            </span>
          </div>
          <p className="text-xs text-[#526d60] mt-0.5 font-sans">
            {currentInfo.subtitle}
          </p>
        </div>

        {/* Right: Controls & Demo Mode */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden bg-[#edf5ee] border border-[#d8e6db] rounded-xl p-1 text-xs">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                currentTab === 'dashboard' ? 'bg-[#092218] text-white shadow-xs' : 'text-[#526d60]'
              }`}
            >
              Dash
            </button>
            <button
              onClick={() => onSelectTab('digital-twin')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                currentTab === 'digital-twin' ? 'bg-[#092218] text-white shadow-xs' : 'text-[#526d60]'
              }`}
            >
              Twin
            </button>
            <button
              onClick={() => onSelectTab('assurance')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                currentTab === 'assurance' ? 'bg-[#092218] text-white shadow-xs' : 'text-[#526d60]'
              }`}
            >
              Assurance
            </button>
          </div>

          {/* Local Simulation Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#edf5ee] border border-[#d8e6db] text-[11px] font-mono font-semibold text-[#0d5934]">
            <Terminal className="w-3.5 h-3.5 text-[#059669]" />
            <span>LOCAL ENGINE • 0 CLOUD CALLS</span>
          </div>

          {/* Demo Mode Toggle */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#d8e6db] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
            <span className="text-xs font-mono font-bold text-[#092218]">DEMO MODE</span>
            <button
              type="button"
              role="switch"
              aria-checked={demoMode}
              onClick={() => setDemoMode(!demoMode)}
              className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                demoMode ? 'bg-[#059669]' : 'bg-[#c4ded0]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  demoMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* User Sign Out Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-[#526d60] hover:text-[#092218] bg-[#edf5ee] hover:bg-[#dceade] border border-[#d8e6db] transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
