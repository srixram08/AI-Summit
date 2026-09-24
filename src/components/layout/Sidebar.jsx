import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Activity,
  Layers,
  LogOut,
  User,
  Zap,
  RotateCcw,
  Sliders,
  FileText,
  TrendingUp
} from 'lucide-react';

export function Sidebar({ currentTab, onSelectTab, user, onLogout }) {
  const operationsNav = [
    {
      id: 'dashboard',
      label: 'Mission Control',
      icon: LayoutDashboard,
      badge: 'LIVE',
      description: 'Real-time Telemetry & Health'
    },
    {
      id: 'chaos',
      label: 'Chaos Lab',
      icon: Zap,
      badge: 'DEMO',
      description: 'Inject Faults & Run Pipeline'
    },
    {
      id: 'assurance',
      label: 'Decision Assurance',
      icon: ShieldCheck,
      badge: 'HERO',
      description: 'Pre-Execution Verification'
    },
    {
      id: 'digital-twin',
      label: 'Digital Twin & What-If',
      icon: Layers,
      badge: 'TWIN',
      description: 'Connected Infrastructure Model'
    }
  ];

  const governanceNav = [
    {
      id: 'policies',
      label: 'Policies',
      icon: Sliders,
      badge: 'RULES',
      description: 'Enterprise Guardrails Console'
    },
    {
      id: 'rollback',
      label: 'Rollback Center',
      icon: RotateCcw,
      badge: 'READY',
      description: 'Verified Standby Manifests'
    },
    {
      id: 'forensics',
      label: 'Incident Forensics',
      icon: FileText,
      badge: 'AUDIT',
      description: 'Decision Evidence JSON'
    },
    {
      id: 'roi',
      label: 'Impact / ROI',
      icon: TrendingUp,
      badge: 'VALUE',
      description: 'SRE Cost & Downtime Avoided'
    }
  ];

  const renderNavGroup = (title, items) => (
    <div className="px-3 mb-4">
      <div className="text-[10px] font-mono uppercase text-[#698a78] tracking-wider px-3 mb-1.5 font-bold">
        {title}
      </div>
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 group text-left cursor-pointer ${
                isActive
                  ? 'bg-[#163e2e] text-white shadow-sm border border-[#276149]'
                  : 'text-[#86a394] hover:text-white hover:bg-[#103325] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-3.5 h-3.5 transition-colors ${
                    isActive ? 'text-[#34d399]' : 'text-[#86a394] group-hover:text-white'
                  }`}
                />
                <span className="font-sans font-medium">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full uppercase font-bold ${
                    isActive
                      ? 'bg-[#0d2a1d] text-[#6ee7b7] border border-[#245842]'
                      : 'bg-[#0d2a1d]/60 text-[#698a78] border border-[#163e2e]'
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
  );

  return (
    <aside className="w-64 bg-[#092218] border-r border-[#153e2d] flex flex-col justify-between flex-shrink-0 min-h-screen select-none text-slate-100">
      {/* Top Branding */}
      <div>
        <div className="p-4 border-b border-[#153e2d]/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-black border border-[#2b654c] p-0.5 flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
              <img src="/vector-logo.png" alt="Vector Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-lg text-white font-sans">
                  VECTOR
                </span>
                <span className="text-[9px] font-mono uppercase bg-[#163e2e] text-[#a7f3d0] px-1.5 py-0.5 rounded-full border border-[#2b654c]">
                  ENTERPRISE
                </span>
              </div>
              <p className="text-[11px] text-[#86a394] font-medium leading-none mt-0.5">
                Decision Assurance Layer
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="py-4">
          {renderNavGroup("OPERATIONS", operationsNav)}
          {renderNavGroup("ENTERPRISE GOVERNANCE", governanceNav)}
        </div>
      </div>

      {/* Bottom Status & User Panel */}
      <div className="p-3 border-t border-[#153e2d] bg-[#071b13] space-y-2.5">
        {/* User Card with Sign Out */}
        <div className="p-2 rounded-xl bg-[#0c271c] border border-[#194531] flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#163e2e] border border-[#2b654c] text-[#34d399] font-bold text-xs flex items-center justify-center flex-shrink-0">
              {user?.avatarInitials || 'AC'}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate leading-none">
                {user?.name || 'Alex Chen'}
              </div>
              <div className="text-[10px] text-[#698a78] font-mono truncate mt-0.5">
                Staff SRE
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign Out"
            className="p-1 rounded-lg text-[#86a394] hover:text-white hover:bg-[#163e2e] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
