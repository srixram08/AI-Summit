import React, { useState } from 'react';
import { 
  FileText, 
  Code2, 
  Copy, 
  Check, 
  X, 
  Download, 
  Search, 
  Filter, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Terminal,
  ArrowRight
} from 'lucide-react';
import { FORENSICS_AUDIT_TRAIL } from '../data/governanceData';

export function ForensicsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [copied, setCopied] = useState(false);
  const [filterType, setFilterType] = useState('ALL');

  const filteredEvents = FORENSICS_AUDIT_TRAIL.filter(event => {
    if (filterType === 'ALL') return true;
    if (filterType === 'BLOCK') return event.status === 'HARD_BLOCK';
    if (filterType === 'PASS') return event.status === 'PASS' || event.status === 'APPROVED';
    return true;
  });

  const sampleEvidenceJson = {
    schemaVersion: "vector.assurance.receipt.v1",
    receiptId: "vr-8924b-sec-081",
    timestamp: "2026-09-24T22:18:08.012Z",
    cluster: {
      id: "prod-us-east-k8s",
      region: "aws-us-east-1",
      kubernetesVersion: "v1.30.2-eks"
    },
    actionProposal: {
      proposalId: "PROP-2026-081",
      agent: "AI Capacity Agent (v2.4.1)",
      target: "Deployment/inventra-api",
      intent: "Scale API replicas 3 → 6",
      reason: "Sustained traffic surge (+34% over sliding 15-minute buffer)"
    },
    vectorAssuranceVerdict: {
      trustScore: 91,
      directive: "SAFE_TO_EXECUTE",
      autonomousExecutionAllowed: true,
      evaluatedRisk: 12,
      confidenceScore: 94
    },
    policyEvaluation: {
      policiesChecked: 6,
      passedCount: 6,
      failedCount: 0,
      enforcedRules: [
        { id: "POL-402", name: "Max Replicas Per Deployment Tier", threshold: 10, value: 6, status: "PASS" },
        { id: "POL-204", name: "Downstream Connection Blast Radius", threshold: "85%", value: "72%", status: "PASS" },
        { id: "POL-505", name: "Zero-Downtime Rollback Required", threshold: "5.0s", value: "1.8s", status: "PASS" }
      ]
    },
    twinSimulationTensors: {
      simulatedDurationSeconds: 900,
      predictedCpuPeak: "52%",
      predictedMemoryPeak: "58%",
      predictedLatencyP99: "28ms",
      databaseConnectionPoolSaturation: "72%"
    },
    rollbackAttestation: {
      verified: true,
      standbyManifestSha256: "sha256:7f9a2b8e4c1901a5e01c9201948baee7",
      estimatedRtoSeconds: 1.8
    },
    cryptographicProof: {
      algorithm: "ECDSA_P256_SHA256",
      controllerSigner: "vector-decision-assurance-ca",
      signature: "MEUCIQDw92ka9s8df0...v8df028nfa092ndsa8f"
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(sampleEvidenceJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#0d5934] font-bold tracking-wider">
              IMMUTABLE AUDIT TRAIL
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5] font-semibold">
              Microsecond Forensic Precision
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#092218] mt-1">
            Incident Forensics & Decision Verification Ledger
          </h2>
          <p className="text-xs text-[#526d60] mt-0.5 max-w-3xl leading-relaxed">
            Every autonomous AI decision, simulated projection, policy assessment, and execution directive is signed and recorded for compliance audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedEvent(sampleEvidenceJson)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#092218] hover:bg-[#163e2e] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            <Code2 className="w-4 h-4 text-[#34d399]" />
            <span>View Evidence JSON</span>
          </button>
        </div>
      </div>

      {/* Forensic Audit Events Table */}
      <div className="bg-white rounded-2xl border border-[#e2ede5] p-5 sm:p-6 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#edf3ee]">
          <div>
            <h3 className="text-base font-extrabold text-[#092218]">
              Forensic Event Timeline: Autonomous Scale & Remediation Drill
            </h3>
            <p className="text-xs text-[#526d60] mt-0.5">
              Sequence showing AI detection → forecast → proposal → Vector assurance → apply → cluster recovery.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#f8fbf9] border border-[#e2ede5] rounded-xl text-xs font-mono">
            {[
              { id: 'ALL', label: 'All Events' },
              { id: 'PASS', label: 'Verified & Executed' },
              { id: 'BLOCK', label: 'Policy Blocked' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-[#092218] text-white shadow-2xs'
                    : 'text-[#526d60] hover:text-[#092218]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#e2ede5] text-[11px] font-mono text-[#526d60] uppercase bg-[#f8fbf9]">
                <th className="py-3 px-3 rounded-l-xl font-bold">Timestamp</th>
                <th className="py-3 px-3 font-bold">Event ID & Actor</th>
                <th className="py-3 px-3 font-bold">Target Resource</th>
                <th className="py-3 px-3 font-bold">Audit Summary</th>
                <th className="py-3 px-3 font-bold text-center">Trust Score</th>
                <th className="py-3 px-3 rounded-r-xl font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf3ee]">
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="hover:bg-[#f8fbf9] transition-colors">
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#526d60] font-semibold">
                    {evt.time}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="font-mono font-bold text-[#092218] block">{evt.id}</span>
                    <span className="text-[11px] text-[#0d5934] font-mono">{evt.actor}</span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-[11px] text-[#526d60]">
                    {evt.target}
                  </td>
                  <td className="py-3.5 px-3 text-[#334e40] font-sans max-w-md leading-relaxed">
                    {evt.summary}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-center">
                    {evt.trustScore ? (
                      <span className={evt.trustScore >= 80 ? 'text-[#059669]' : 'text-[#dc2626]'}>
                        {evt.trustScore}/100
                      </span>
                    ) : (
                      <span className="text-[#86a394]">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                      evt.status === 'PASS' || evt.status === 'APPROVED' || evt.status === 'APPLIED'
                        ? 'bg-[#d7f2df] text-[#0d5934] border-[#b9e5c5]'
                        : evt.status === 'HARD_BLOCK'
                        ? 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]'
                        : 'bg-[#fffbeb] text-[#b45309] border-[#fde68a]'
                    }`}>
                      {evt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evidence JSON Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#092218] text-white rounded-2xl border border-[#2b654c] max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#163e2e]">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-[#34d399]" />
                <div>
                  <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    Cryptographic Decision Receipt (Evidence JSON)
                  </h3>
                  <span className="text-[11px] font-mono text-[#86a394]">
                    Receipt ID: vr-8924b-sec-081 • SHA256 Verified
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#163e2e] text-xs font-mono font-bold text-white hover:bg-[#245842] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#34d399]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="p-1.5 rounded-lg hover:bg-[#163e2e] text-[#86a394] hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-5 overflow-y-auto flex-1 font-mono text-xs text-[#a7f3d0] bg-black/50">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {JSON.stringify(sampleEvidenceJson, null, 2)}
              </pre>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#163e2e] flex items-center justify-between text-xs text-[#86a394] font-mono">
              <span>Standard: IEEE 2801 Compliant AIOps Attestation</span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-1.5 rounded-lg bg-white text-[#092218] font-bold hover:bg-[#edf5ee] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
