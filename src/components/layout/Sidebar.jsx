import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Activity,
  Layers
} from 'lucide-react';
import { StatusDot } from '../common/StatusDot';

export function Sidebar({ currentTab, onSelectTab }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 'LIVE',
      description: 'Real-time Telemetry & Health'
    },
    {
      id: 'digital-twin',
      label: 'Digital Twin',
      icon: Layers,
      badge: 'TOPOLOGY',
      description: 'Connected Infrastructure Model'
    },
    {
      id: 'assurance',
      label: 'Assurance',
      icon: ShieldCheck,
      badge: 'HERO',
      description: 'Pre-Execution Decision Engine'
    }
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-slate-800/80 flex flex-col justify-between flex-shrink-0 min-h-screen select-none">
      {/* Top Branding */}
      <div>
        <div className="p-5 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(0,245,155,0.2)]">
              <ShieldCheck className="w-6 h-6 text-[#00f59b]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-xl text-white font-mono">
                  VECTOR
                </span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  AI-OPS
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Decision Assurance Layer
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-6">
          <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider px-3 mb-2 font-semibold">
            Control Center
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group text-left ${
                    isActive
                      ? 'bg-emerald-500/15 text-white border border-emerald-500/40 shadow-[0_0_15px_rgba(0,245,155,0.1)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-[#00f59b]' : 'text-slate-400 group-hover:text-slate-300'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold ${
                        isActive
                          ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-slate-800/80 text-slate-400 border border-slate-700/50'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Intercept Flow Summary Box */}
        <div className="mx-3 p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px] font-semibold">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERCEPT WORKFLOW</span>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">1.</span> AI Agent Proposes
            </div>
            <div className="flex items-center gap-1.5 text-cyan-300">
              <span className="text-cyan-400 font-bold">2.</span> Vector Intercepts
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-purple-400">3.</span> Twin Simulates
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-amber-400">4.</span> Policy Verification
            </div>
            <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
              <span className="text-emerald-400 font-bold">5.</span> Trust Decision
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Panel */}
      <div className="p-4 border-t border-slate-800/80 bg-[#080d19]">
        <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider mb-2">
          SYSTEM STATUS
        </div>
        <div className="flex items-center justify-between p-2 rounded-md bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2">
            <StatusDot status="online" size="sm" />
            <span className="text-xs font-mono font-medium text-emerald-400 tracking-tight">
              VECTOR ONLINE
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">v2.4-MVP</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Engine latency</span>
          <span className="text-slate-300">1.8ms</span>
        </div>
      </div>
    </aside>
  );
}
