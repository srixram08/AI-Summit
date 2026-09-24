import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Zap, 
  Activity, 
  Sliders, 
  AlertTriangle,
  RotateCcw,
  Scale,
  Sparkles,
  Server,
  ChevronRight
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { VectorLogo } from '../components/common/VectorLogo';

export function LandingPage({ onNavigateToLogin, onLaunchDemo }) {
  const [activePreviewScenario, setActivePreviewScenario] = useState('safe');

  return (
    <div className="min-h-screen bg-[#edf5ee] text-[#092218] flex flex-col font-sans selection:bg-[#092218] selection:text-white page-transition-3d">
      {/* 1. Keyvo Sticky Navigation Header */}
      <header className="border-b border-[#d8e6db] bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Mark with User Uploaded Shield Logo */}
          <VectorLogo size="md" />

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#3b594b]">
            <a href="#platform" className="hover:text-[#092218] transition-colors">Platform</a>
            <a href="#twin" className="hover:text-[#092218] transition-colors">Digital Twin</a>
            <a href="#matrix" className="hover:text-[#092218] transition-colors">Guardrail Matrix</a>
            <a href="#security" className="hover:text-[#092218] transition-colors">Assurance SLA</a>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToLogin}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#092218] hover:bg-[#dceade] border border-[#cbdfd1] transition-all cursor-pointer hover:shadow-xs"
            >
              Sign In
            </button>
            <button
              onClick={onLaunchDemo}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#092218] hover:bg-[#153e2d] shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Top Hero Section */}
      <section className="pt-12 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* 3 Value Pillars with 3D Card Hover Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <div className="p-4 bg-white/70 rounded-2xl border border-[#d8e6db] card-3d">
            <h4 className="text-sm font-bold text-[#092218] mb-1">
              Autonomous Risk Models
            </h4>
            <p className="text-xs text-[#526d60] leading-relaxed">
              Traditional SRE tools were not built for the unique speed and cascading risk of speculative AI actions.
            </p>
          </div>
          <div className="p-4 bg-white/70 rounded-2xl border border-[#d8e6db] card-3d">
            <h4 className="text-sm font-bold text-[#092218] mb-1">
              Capital-Grade Digital Twin
            </h4>
            <p className="text-xs text-[#526d60] leading-relaxed">
              Synthetically stress-tests upstream API spikes and DB connection pool saturation before production.
            </p>
          </div>
          <div className="p-4 bg-white/70 rounded-2xl border border-[#d8e6db] card-3d">
            <h4 className="text-sm font-bold text-[#092218] mb-1">
              Zero Unverified Drift
            </h4>
            <p className="text-xs text-[#526d60] leading-relaxed">
              Deterministic guardrail verification, explainable trust scores, and instant &lt;2s rollback SLA.
            </p>
          </div>
        </div>

        {/* Center 3D Logo & Main Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* 3D Animated Hero Logo with Pulse */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="radar-pulse-3d" />
              <div className="w-20 h-20 rounded-3xl bg-black p-1 border-2 border-[#10b981]/50 shadow-[0_0_35px_rgba(16,185,129,0.35)] logo-3d flex items-center justify-center">
                <img 
                  src="/vector-logo.png" 
                  alt="Vector Shield Logo" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]" 
                />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d7f2df] border border-[#b9e5c5] text-[#0d5934] text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>THE ASSURANCE PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#092218] tracking-tight leading-[1.12]">
            Full confidence in every action.
          </h1>

          <p className="text-base sm:text-lg text-[#526d60] max-w-2xl mx-auto leading-relaxed">
            The pre-execution decision assurance layer for autonomous AIOps. Safeguard your production Kubernetes infrastructure from hallucinated mutations.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToLogin}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#092218] hover:bg-[#153e2d] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started • Enterprise SSO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onLaunchDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#d7f2df] hover:bg-[#c3ebd0] text-[#0d5934] border border-[#b9e5c5] font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Instant Interactive Demo</span>
              <Sparkles className="w-4 h-4 text-[#059669]" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Hero Interactive Console Teaser Preview (3D Perspective) */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-6xl mx-auto w-full" id="platform">
        <div className="rounded-3xl border border-[#c8ddcf] bg-white p-4 sm:p-7 shadow-[0_24px_60px_-12px_rgba(9,34,24,0.12)] hero-console-3d">
          {/* Simulated Console Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#e2ede5] gap-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#f87171]" />
              <div className="w-3 h-3 rounded-full bg-[#fbbf24]" />
              <div className="w-3 h-3 rounded-full bg-[#34d399]" />
              <span className="text-xs font-mono font-bold text-[#092218] ml-2">
                vector-assurance.cluster.local
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#526d60]">Active Testbed:</span>
              <button
                onClick={() => setActivePreviewScenario('safe')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activePreviewScenario === 'safe'
                    ? 'bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5]'
                    : 'bg-[#edf5ee] text-[#526d60]'
                }`}
              >
                Scenario A (Safe)
              </button>
              <button
                onClick={() => setActivePreviewScenario('dangerous')}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  activePreviewScenario === 'dangerous'
                    ? 'bg-[#fee2e2] text-[#dc2626] border border-[#fca5a5]'
                    : 'bg-[#edf5ee] text-[#526d60]'
                }`}
              >
                Scenario B (Dangerous)
              </button>
            </div>
          </div>

          {/* Interactive Preview Rows (Keyvo Inventory Style) */}
          <div className="py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold text-[#092218]">
                  Intercepted AIOps Recommendations
                </h3>
                <p className="text-xs text-[#526d60]">
                  Real-time telemetry evaluation against 5 guardrail verification vectors.
                </p>
              </div>
              <Badge variant={activePreviewScenario === 'safe' ? 'safe' : 'danger'} size="sm">
                {activePreviewScenario === 'safe' ? '91 TRUST SCORE' : '58 BLOCKED'}
              </Badge>
            </div>

            {/* Table Mockup */}
            <div className="overflow-x-auto rounded-2xl border border-[#e2ede5]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#f8fbf9] border-b border-[#e2ede5] text-[#526d60]">
                  <tr>
                    <th className="py-3 px-4">Action Target</th>
                    <th className="py-3 px-4">AI Confidence</th>
                    <th className="py-3 px-4">Digital Twin Risk</th>
                    <th className="py-3 px-4">Policy Check</th>
                    <th className="py-3 px-4">Decision SLA</th>
                    <th className="py-3 px-4 text-right">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2ede5]">
                  <tr className={activePreviewScenario === 'safe' ? 'bg-[#e6f7ec]' : 'bg-white'}>
                    <td className="py-3.5 px-4 font-bold text-[#092218]">
                      Scale inventra-api: 3 → 6 replicas
                    </td>
                    <td className="py-3.5 px-4 text-[#059669] font-bold">94%</td>
                    <td className="py-3.5 px-4 text-[#0d5934]">12 / 100 (Low)</td>
                    <td className="py-3.5 px-4 text-[#0d5934]">✓ POL-402 Pass</td>
                    <td className="py-3.5 px-4 text-[#526d60]">&lt; 2.0s RTO</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="px-2.5 py-1 rounded-full bg-[#092218] text-white text-[10px] font-bold uppercase">
                        AUTO EXECUTE
                      </span>
                    </td>
                  </tr>
                  <tr className={activePreviewScenario === 'dangerous' ? 'bg-[#fff1f2]' : 'bg-white'}>
                    <td className="py-3.5 px-4 font-bold text-[#092218]">
                      Scale inventra-api: 3 → 20 replicas
                    </td>
                    <td className="py-3.5 px-4 text-[#d97706] font-bold">86%</td>
                    <td className="py-3.5 px-4 text-[#dc2626] font-bold">78 / 100 (Severe)</td>
                    <td className="py-3.5 px-4 text-[#dc2626] font-bold">✕ POL-402 Exceeded</td>
                    <td className="py-3.5 px-4 text-[#526d60]">Memory Exhaustion</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="px-2.5 py-1 rounded-full bg-[#fef2f2] text-[#dc2626] border border-[#fecaca] text-[10px] font-bold uppercase">
                        ACTION BLOCKED
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick launch teaser footer */}
            <div className="mt-5 p-4 rounded-xl bg-[#f8fbf9] border border-[#e2ede5] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#059669]" />
                <span className="text-xs text-[#092218] font-medium">
                  {activePreviewScenario === 'safe'
                    ? 'Safe scenario passed all 5 guardrails. Deterministic sandbox validated zero noisy neighbor contention.'
                    : 'Dangerous scenario rejected. Digital twin detected 210% database connection starvation.'}
                </span>
              </div>
              <button
                onClick={onLaunchDemo}
                className="text-xs font-bold text-[#0d5934] hover:text-[#092218] flex items-center gap-1.5 cursor-pointer underline flex-shrink-0"
              >
                <span>Open full interactive matrix</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Three Feature Deep-Dives */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full" id="twin">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#092218]">
            Built for High-Stakes Autonomous Operations
          </h2>
          <p className="text-sm text-[#526d60] mt-2">
            AI agents shouldn't execute direct Kubernetes mutations in the dark. Vector provides a continuous airgap of proof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-7 border border-[#e2ede5] shadow-xs flex flex-col justify-between card-3d">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#edf5ee] border border-[#d8e6db] flex items-center justify-center text-[#059669] mb-5 shadow-xs">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#092218] mb-2">
                1. Connected Digital Twin
              </h3>
              <p className="text-xs text-[#526d60] leading-relaxed">
                Mirrors production topologies including ingress gateways, database connection pools, and Redis caches in an isolated offline sandbox.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#edf3ee] text-[11px] font-mono text-[#0d5934] font-semibold">
              Zero Production Contention
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-7 border border-[#e2ede5] shadow-xs flex flex-col justify-between card-3d">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#edf5ee] border border-[#d8e6db] flex items-center justify-center text-[#059669] mb-5 shadow-xs">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#092218] mb-2">
                2. 5-Vector Policy Guardrails
              </h3>
              <p className="text-xs text-[#526d60] leading-relaxed">
                Simultaneously verifies blast radius limits, AI variance, quota ceilings, SLA commitments, and strict rollback feasibility.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#edf3ee] text-[11px] font-mono text-[#0d5934] font-semibold">
              Deterministic Verification
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-7 border border-[#e2ede5] shadow-xs flex flex-col justify-between card-3d">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#edf5ee] border border-[#d8e6db] flex items-center justify-center text-[#059669] mb-5 shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#092218] mb-2">
                3. Trust Score & Escalation
              </h3>
              <p className="text-xs text-[#526d60] leading-relaxed">
                Actions above 90 Trust Score auto-execute with zero latency. Anomalous or dangerous mutations trigger instant human approval workflows.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#edf3ee] text-[11px] font-mono text-[#0d5934] font-semibold">
              Automated Human-in-the-Loop
            </div>
          </div>
        </div>
      </section>

      {/* 5. Assurance Metrics Row */}
      <section className="py-12 bg-white border-y border-[#d8e6db]" id="security">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#092218] font-mono">
                99.98%
              </div>
              <div className="text-xs text-[#526d60] font-sans mt-1">
                Blast Radius Reduction
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#059669] font-mono">
                &lt; 2.0s
              </div>
              <div className="text-xs text-[#526d60] font-sans mt-1">
                Rollback SLA Guarantee
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#092218] font-mono">
                100%
              </div>
              <div className="text-xs text-[#526d60] font-sans mt-1">
                Deterministic Traceability
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#059669] font-mono">
                0
              </div>
              <div className="text-xs text-[#526d60] font-sans mt-1">
                Unverified Production Mutations
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Ready to Assure Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full text-center">
        <div className="rounded-3xl bg-[#092218] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#a7f3d0] font-semibold">
              ENTERPRISE READINESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to safeguard your production clusters?
            </h2>
            <p className="text-sm text-[#86a394] leading-relaxed">
              Experience the pre-execution decision engine trusted by enterprise platform teams.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onNavigateToLogin}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-[#092218] hover:bg-[#edf5ee] font-bold text-sm tracking-wide transition-all cursor-pointer shadow-md"
              >
                Sign In to Console
              </button>
              <button
                onClick={onLaunchDemo}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#163e2e] hover:bg-[#1d4d3a] text-white border border-[#2b654c] font-bold text-sm tracking-wide transition-all cursor-pointer"
              >
                Instant Staff SRE Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-[#d8e6db] bg-[#edf5ee] py-10 text-xs font-mono text-[#526d60]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <VectorLogo size="sm" />
          <div className="flex items-center gap-6 text-[#526d60]">
            <a href="#platform" className="hover:text-[#092218]">Platform</a>
            <a href="#twin" className="hover:text-[#092218]">Digital Twin</a>
            <button onClick={onNavigateToLogin} className="hover:text-[#092218] cursor-pointer">Console Login</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
