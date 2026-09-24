import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Activity,
  Layers,
  LogOut,
  User
} from 'lucide-react';

export function Sidebar({ currentTab, onSelectTab, user, onLogout }) {
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
    <aside className="w-64 bg-[#092218] border-r border-[#153e2d] flex flex-col justify-between flex-shrink-0 min-h-screen select-none text-slate-100">
      {/* Top Branding */}
      <div>
        <div className="p-5 border-b border-[#153e2d]/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black border border-[#2b654c] p-0.5 flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
              <img src="/vector-logo.png" alt="Vector Logo" className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-xl text-white font-sans">
                  VECTOR
                </span>
                <span className="text-[10px] font-mono uppercase bg-[#163e2e] text-[#a7f3d0] px-2 py-0.5 rounded-full border border-[#2b654c]">
                  ASSURE
                </span>
              </div>
              <p className="text-xs text-[#86a394] font-medium">
                Decision Assurance Layer
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-6">
          <div className="text-[11px] font-mono uppercase text-[#698a78] tracking-wider px-3 mb-2 font-semibold">
            PLATFORM NAVIGATION
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#163e2e] text-white shadow-sm border border-[#276149]'
                      : 'text-[#86a394] hover:text-white hover:bg-[#103325] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-[#34d399]' : 'text-[#86a394] group-hover:text-white'
                      }`}
                    />
                    <span className="font-sans">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
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

        {/* Intercept Flow Summary Box */}
        <div className="mx-3 p-3.5 rounded-xl bg-[#0c271c] border border-[#1a4732] text-xs space-y-2.5">
          <div className="flex items-center gap-2 text-[#a7f3d0] font-mono text-[11px] font-semibold">
            <Activity className="w-3.5 h-3.5 text-[#34d399]" />
            <span>INTERCEPT WORKFLOW</span>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] text-[#86a394]">
            <div className="flex items-center gap-2">
              <span className="text-[#34d399] font-bold">1.</span> Agent Proposes
            </div>
            <div className="flex items-center gap-2 text-white font-medium">
              <span className="text-[#34d399] font-bold">2.</span> Vector Intercepts
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#6ee7b7] font-bold">3.</span> Twin Simulates
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#fcd34d] font-bold">4.</span> Policy Verification
            </div>
            <div className="flex items-center gap-2 text-[#6ee7b7] font-semibold">
              <span className="text-[#34d399] font-bold">5.</span> Trust Decision
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status & User Panel */}
      <div className="p-3.5 border-t border-[#153e2d] bg-[#071b13] space-y-3">
        {/* User Card with Sign Out */}
        <div className="p-2.5 rounded-xl bg-[#0c271c] border border-[#194531] flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#163e2e] border border-[#2b654c] text-[#34d399] font-bold text-xs flex items-center justify-center flex-shrink-0">
              {user?.avatarInitials || 'AC'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {user?.name || 'Alex Chen'}
              </div>
              <div className="text-[10px] text-[#86a394] truncate">
                {user?.role || 'Staff SRE'}
              </div>
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              title="Sign Out to Website"
              className="p-1.5 rounded-lg text-[#86a394] hover:text-white hover:bg-[#163e2e] transition-colors cursor-pointer flex-shrink-0 ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Runtime status */}
        <div className="flex items-center justify-between text-[11px] text-[#86a394] font-mono px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span>K8s: prod</span>
          </span>
          <span className="text-white font-semibold">1.8ms RTT</span>
        </div>
      </div>
    </aside>
  );
}
