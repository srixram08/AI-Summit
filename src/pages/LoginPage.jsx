import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Mail, 
  Key, 
  ArrowRight, 
  Sparkles, 
  Eye, 
  EyeOff,
  Terminal,
  CheckCircle2,
  Layers
} from 'lucide-react';

export function LoginPage({ onBackToLanding, onLoginSuccess }) {
  const [email, setEmail] = useState('alex.chen@inventra.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // 3D Animation & Verification State
  const [authStage, setAuthStage] = useState(0); // 0: idle, 1: token, 2: guardrail, 3: twin, 4: complete
  const isAuthenticating = authStage > 0;

  // 3D Card tilt coordinate tracking
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isAuthenticating) return;
    const card = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - card.left) / card.width - 0.5) * 12; // -6 to +6 deg
    const y = ((e.clientY - card.top) / card.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const startAuthSequence = (userObj) => {
    setAuthStage(1);

    setTimeout(() => {
      setAuthStage(2);
    }, 450);

    setTimeout(() => {
      setAuthStage(3);
    }, 900);

    setTimeout(() => {
      setAuthStage(4);
    }, 1350);

    setTimeout(() => {
      onLoginSuccess(userObj);
    }, 1750);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startAuthSequence({
      name: 'Alex Chen',
      role: 'Staff SRE • Platform Assurance',
      email: email || 'alex.chen@inventra.io',
      cluster: 'prod-us-east-k8s',
      avatarInitials: 'AC'
    });
  };

  const handleQuickDemoLogin = () => {
    startAuthSequence({
      name: 'Alex Chen',
      role: 'Staff SRE • Platform Assurance',
      email: 'alex.chen@inventra.io',
      cluster: 'prod-us-east-k8s',
      avatarInitials: 'AC'
    });
  };

  return (
    <div className="min-h-screen bg-[#edf5ee] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#092218] selection:text-white page-transition-3d overflow-hidden">
      {/* Top Bar with Back Navigation */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#526d60] hover:text-[#092218] transition-all cursor-pointer bg-white px-4 py-2 rounded-xl border border-[#d8e6db] shadow-xs hover:shadow-sm hover:-translate-x-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
          <span className="text-xs font-mono text-[#0d5934] font-semibold">
            Cluster Sandbox Online
          </span>
        </div>
      </div>

      {/* Center 3D Perspective Card Area */}
      <div className="max-w-md w-full mx-auto my-6 perspective-1000">
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: isAuthenticating ? 'all 0.5s ease' : 'transform 0.15s ease-out'
          }}
          className="bg-white rounded-3xl border border-[#c8ddcf] p-6 sm:p-8 shadow-[0_24px_60px_-10px_rgba(9,34,24,0.12)] login-card-3d relative overflow-hidden"
        >
          {/* Subtle 3D Top Sheen Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#059669] to-transparent opacity-80" />

          {/* 3D Shield Logo with Glowing Radar Scan Animation */}
          <div className="text-center mb-6">
            <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <div className="radar-pulse-3d" />
              <div className="w-18 h-18 rounded-2xl bg-black p-1 border-2 border-[#10b981]/60 shadow-[0_0_25px_rgba(16,185,129,0.35)] logo-3d flex items-center justify-center">
                <img
                  src="/vector-logo.png"
                  alt="Vector Shield"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-1">
              <h2 className="text-2xl font-extrabold text-[#092218] tracking-tight">
                Vector Console
              </h2>
              <span className="text-[10px] font-mono uppercase bg-[#d7f2df] text-[#0d5934] px-2.5 py-0.5 rounded-full font-bold border border-[#b9e5c5]">
                v2.4
              </span>
            </div>
            <p className="text-xs text-[#526d60]">
              Autonomous Decision Assurance & Digital Twin Sandbox
            </p>
          </div>

          {/* Holographic 3D Verification Overlay (When Authenticating) */}
          {isAuthenticating ? (
            <div className="py-6 space-y-4 font-mono text-xs animate-fadeIn">
              <div className="text-center mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669] block mb-1">
                  SECURE SRE AUTHENTICATION
                </span>
                <span className="text-xs text-[#092218] font-bold">
                  Synchronizing with prod-us-east-k8s
                </span>
              </div>

              {/* Holographic Pipeline Steps */}
              <div className="space-y-2.5 p-4 rounded-2xl bg-[#f8fbf9] border border-[#e2ede5]">
                <div className={`flex items-center justify-between transition-colors ${authStage >= 1 ? 'text-[#0d5934] font-bold' : 'text-[#86a394]'}`}>
                  <span className="flex items-center gap-2">
                    <Key className="w-3.5 h-3.5 text-[#059669]" />
                    <span>1. Validating JWT & RSA Session</span>
                  </span>
                  <span>{authStage >= 1 ? '✓ VERIFIED' : 'WAITING'}</span>
                </div>

                <div className={`flex items-center justify-between transition-colors ${authStage >= 2 ? 'text-[#0d5934] font-bold' : 'text-[#86a394]'}`}>
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                    <span>2. Syncing 5-Vector CIS Guardrails</span>
                  </span>
                  <span>{authStage >= 2 ? '✓ SYNCED' : 'PENDING'}</span>
                </div>

                <div className={`flex items-center justify-between transition-colors ${authStage >= 3 ? 'text-[#0d5934] font-bold' : 'text-[#86a394]'}`}>
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#059669]" />
                    <span>3. Warming Digital Twin Sandbox</span>
                  </span>
                  <span>{authStage >= 3 ? '✓ INITIALIZED' : 'PENDING'}</span>
                </div>

                <div className={`flex items-center justify-between transition-colors ${authStage >= 4 ? 'text-[#0d5934] font-extrabold' : 'text-[#86a394]'}`}>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>4. Launching Command Center</span>
                  </span>
                  <span>{authStage >= 4 ? 'READY' : '...'}</span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full bg-[#e2ede5] rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#059669] to-[#10b981] transition-all duration-300 rounded-full"
                  style={{ width: `${(authStage / 4) * 100}%` }}
                />
              </div>

              <div className="text-center text-[11px] text-[#526d60] pt-1">
                Zero Cloud Dependencies • 100% Deterministic Airgap
              </div>
            </div>
          ) : (
            <>
              {/* Quick Demo Access Bypass Button with 3D Hover */}
              <div className="mb-6 p-4 rounded-2xl bg-[#f2faf5] border border-[#b9e5c5] card-3d">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-[#0d5934] uppercase tracking-wider">
                    Instant Demo Access
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] font-bold border border-[#b9e5c5]">
                    1-CLICK
                  </span>
                </div>
                <p className="text-xs text-[#526d60] mb-3">
                  Log in directly with pre-configured Staff SRE credentials and live cluster telemetry.
                </p>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#092218] hover:bg-[#163e2e] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#34d399]" />
                  <span>Launch Demo Console as Alex Chen</span>
                </button>
              </div>

              <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-[#e2ede5] w-full" />
                <span className="bg-white px-3 text-[11px] font-mono uppercase text-[#86a394] absolute">
                  or enter enterprise SSO
                </span>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#092218] mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#86a394] absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="engineer@company.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d8e6db] bg-[#f8fbf9] text-xs font-mono text-[#092218] placeholder-[#86a394] focus:outline-none focus:border-[#092218] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#092218]">
                      Password
                    </label>
                    <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[11px] text-[#059669] hover:underline">
                      Forgot token?
                    </a>
                  </div>
                  <div className="relative">
                    <Key className="w-4 h-4 text-[#86a394] absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#d8e6db] bg-[#f8fbf9] text-xs font-mono text-[#092218] focus:outline-none focus:border-[#092218] focus:bg-white transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-[#86a394] hover:text-[#092218] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#092218] border-[#c8ddcf] focus:ring-[#092218]"
                    />
                    <span className="text-xs text-[#526d60]">Remember this terminal</span>
                  </label>

                  <span className="text-[11px] font-mono text-[#0d5934] bg-[#d7f2df] px-2 py-0.5 rounded-full border border-[#b9e5c5]">
                    K8s: prod
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#092218] hover:bg-[#163e2e] text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Sign In to Vector Console</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* Security Compliance Badges */}
          <div className="mt-6 pt-5 border-t border-[#e2ede5] flex items-center justify-between text-[10px] font-mono text-[#698a78]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              <span>SOC2 Type II</span>
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#059669]" />
              <span>Zero-Trust Airgap</span>
            </span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-[#059669]" />
              <span>CIS Compliant</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-md w-full mx-auto text-center text-xs font-mono text-[#698a78]">
        Vector Decision Assurance Engine • Enterprise Edition
      </div>
    </div>
  );
}
