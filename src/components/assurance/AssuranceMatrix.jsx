import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Sliders, 
  Cpu, 
  Database,
  AlertTriangle,
  Scale
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function AssuranceMatrix({ scenarioResult }) {
  const isDangerous = scenarioResult.key === 'dangerous';

  const checks = [
    {
      id: 'risk',
      name: 'OPERATIONAL RISK',
      value: `${scenarioResult.risk} / 100`,
      status: scenarioResult.risk > 50 ? 'danger' : 'safe',
      statusLabel: scenarioResult.risk > 50 ? 'HIGH RISK' : 'LOW RISK',
      icon: scenarioResult.risk > 50 ? ShieldAlert : ShieldCheck,
      description: scenarioResult.risk > 50
        ? 'High operational blast radius; high downstream cascading impact risk.'
        : 'Low projected operational risk; well within tolerable error budgets.',
      metricBar: scenarioResult.risk,
      metricColor: scenarioResult.risk > 50 ? 'bg-rose-500' : 'bg-emerald-400',
    },
    {
      id: 'confidence',
      name: 'AI MODEL CONFIDENCE',
      value: `${scenarioResult.confidence}%`,
      status: scenarioResult.confidence >= 90 ? 'safe' : 'warning',
      statusLabel: scenarioResult.confidence >= 90 ? 'HIGH' : 'MODERATE',
      icon: Activity,
      description: scenarioResult.confidence >= 90
        ? 'Agent telemetry variance < 3%. Historical correlation confirms high repeatability.'
        : 'Agent telemetry variance 14%. Speculative workload pattern with limited precedent.',
      metricBar: scenarioResult.confidence,
      metricColor: scenarioResult.confidence >= 90 ? 'bg-emerald-400' : 'bg-amber-400',
    },
    {
      id: 'policy',
      name: 'GUARDRAIL POLICY COMPLIANCE',
      value: scenarioResult.policy.status === 'PASS' ? '✓ PASS' : '✕ VIOLATION',
      status: scenarioResult.policy.status === 'PASS' ? 'pass' : 'violation',
      statusLabel: scenarioResult.policy.status,
      icon: Scale,
      description: scenarioResult.policy.message,
      policyRule: '#POL-402 (Max 10 replicas per tier)',
    },
    {
      id: 'simulation',
      name: 'DIGITAL TWIN SIMULATION',
      value: scenarioResult.simulation.status === 'PASS' ? '✓ PASS' : '✕ RESOURCE PRESSURE',
      status: scenarioResult.simulation.status === 'PASS' ? 'pass' : 'resource_pressure',
      statusLabel: scenarioResult.simulation.status === 'PASS' ? 'PASS' : 'PRESSURE',
      icon: Cpu,
      description: scenarioResult.simulation.message,
      twinDetails: isDangerous
        ? 'DB pool exceeds 210% saturation cutoff; memory exhaustion warning on 4 nodes.'
        : 'Cluster CPU headroom 42%; connection pool peak 72%; zero noisy neighbor contention.',
    },
    {
      id: 'rollback',
      name: 'ROLLBACK FEASIBILITY',
      value: '✓ READY',
      status: 'ready',
      statusLabel: 'READY',
      icon: RotateCcw,
      description: scenarioResult.rollback.message,
      rto: '< 2.0s RTO (Manifest Standby)',
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#e2ede5]">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#059669]" />
            <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-[#092218]">
              Pre-Execution Assurance Matrix
            </h3>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] font-semibold border border-[#b6e3c5]">
              5 Guardrail Vectors
            </span>
          </div>
          <p className="text-xs text-[#527060] mt-1">
            Simultaneous multi-dimensional safety, policy, and rollback verification prior to applying manifests.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#527060]">Target Change:</span>
          <span className="text-[#092218] font-bold">{scenarioResult.actionSummary}</span>
        </div>
      </div>

      {/* Grid of Assurance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {checks.map((check) => {
          const Icon = check.icon;
          const isCheckViolation = check.status === 'violation' || check.status === 'resource_pressure' || check.status === 'danger';
          const isCheckSafe = check.status === 'pass' || check.status === 'safe' || check.status === 'ready';

          return (
            <div
              key={check.id}
              className={`rounded-xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                isCheckViolation
                  ? 'bg-[#fef2f2] border-[#fecaca] shadow-sm'
                  : isCheckSafe
                  ? 'bg-[#f8fbf9] border-[#e2ede5] hover:border-[#b6e3c5] hover:bg-[#f2faf5]'
                  : 'bg-[#fffbeb] border-[#fde68a]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md border ${
                      isCheckViolation
                        ? 'bg-[#fee2e2] border-[#fca5a5] text-[#dc2626]'
                        : isCheckSafe
                        ? 'bg-[#d7f2df] border-[#b6e3c5] text-[#0d5934]'
                        : 'bg-[#fef3c7] border-[#fde68a] text-[#b45309]'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#092218]">
                      {check.name}
                    </span>
                  </div>

                  <Badge variant={check.status} size="sm">
                    {check.statusLabel}
                  </Badge>
                </div>

                <div className="my-2">
                  <div className={`text-xl font-bold font-mono tracking-tight ${
                    isCheckViolation ? 'text-[#dc2626]' : isCheckSafe ? 'text-[#0d5934]' : 'text-[#b45309]'
                  }`}>
                    {check.value}
                  </div>
                </div>

                {check.metricBar !== undefined && (
                  <div className="w-full bg-[#e2ede5] rounded-full h-1.5 my-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCheckViolation ? 'bg-[#dc2626]' : 'bg-[#059669]'
                      }`}
                      style={{ width: `${check.metricBar}%` }}
                    />
                  </div>
                )}

                <p className="text-xs text-[#527060] mt-2 font-sans leading-relaxed">
                  {check.description}
                </p>
              </div>

              {(check.policyRule || check.twinDetails || check.rto) && (
                <div className="mt-3 pt-2.5 border-t border-[#e2ede5] text-[10px] font-mono text-[#71877b]">
                  {check.policyRule && <span>Rule: {check.policyRule}</span>}
                  {check.twinDetails && <span className="line-clamp-1">{check.twinDetails}</span>}
                  {check.rto && <span>SLA: {check.rto}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
