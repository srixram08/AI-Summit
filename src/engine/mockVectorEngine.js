/**
 * Vector Mock Decision Assurance Engine
 * 
 * Pre-execution decision assurance layer for AIOps.
 * Evaluates AI-generated infrastructure actions BEFORE execution, simulates impact
 * through the Digital Twin, verifies policy boundaries, checks rollback feasibility,
 * and issues a deterministic Trust Score and execution directive.
 * 
 * Designed to be drop-in replaced by real API: /api/vector/assess
 */

import { INITIAL_CLUSTER_DATA, INITIAL_RECOMMENDATIONS, INITIAL_TELEMETRY } from '../data/mockData';

export const SCENARIO_DEFINITIONS = {
  safe: {
    id: "scenario-safe",
    key: "safe",
    name: "Scenario A: Safe Scale Out",
    shortLabel: "Scenario A",
    badgeLabel: "SAFE",
    type: "SAFE",
    title: "Scale API replicas 3 → 6",
    actionSummary: "Scale API deployment from 3 → 6 replicas",
    agent: "AI Capacity Agent",
    targetService: "Inventra API Gateway",
    currentReplicas: 3,
    proposedReplicas: 6,
    
    // Core Engine Metrics
    risk: 12,
    confidence: 94,
    trustScore: 91,
    decision: "AUTO_EXECUTE",
    confidenceTier: "HIGH CONFIDENCE",

    // Assurance Checks
    policy: {
      status: "PASS",
      label: "PASS",
      title: "Cluster Scaling Policy #POL-402",
      message: "Within approved scaling policy limits (max 10 replicas per tier)"
    },
    simulation: {
      status: "PASS",
      label: "PASS",
      title: "Digital Twin 15-Minute Load Simulation",
      message: "No significant resource pressure. Node cluster headroom: 42%"
    },
    rollback: {
      status: "READY",
      label: "READY",
      title: "Automated Rollback Checkpoint",
      message: "Instant replica step-down manifest verified (<2s RTO)"
    },

    // Execution & Verification State
    pipelineChecks: [
      { id: "twin", label: "DIGITAL TWIN SIMULATION COMPLETE", status: "completed" },
      { id: "policy", label: "POLICY EVALUATION COMPLETE", status: "completed" },
      { id: "risk", label: "RISK ANALYSIS COMPLETE", status: "completed" },
      { id: "rollback", label: "ROLLBACK CHECK COMPLETE", status: "completed" },
    ],

    // Explainability Matrix
    reasons: [
      {
        id: "r1",
        status: "pass",
        title: "Policy Boundary Check",
        text: "Requested replica count (6) is comfortably within tier maximum (10)."
      },
      {
        id: "r2",
        status: "pass",
        title: "Compute & Memory Twin Simulation",
        text: "Simulation shows sufficient cluster compute & memory headroom across worker nodes."
      },
      {
        id: "r3",
        status: "pass",
        title: "Downstream Connection Blast Radius",
        text: "PostgreSQL connection pool projected at 72% peak, well below the 85% safety cutoff."
      },
      {
        id: "r4",
        status: "pass",
        title: "Zero-Downtime Rollback Path",
        text: "Deterministic rollback manifest is compiled and verified ready in cold standby."
      }
    ],

    // Simulation Impact Projections
    telemetryImpact: {
      cpuAfter: "52% (-26% per replica)",
      memoryAfter: "58% (balanced)",
      latencyAfter: "28ms (faster response)",
      dbPool: "72% (safe capacity)",
      costDelta: "+$180 / month"
    },

    actionCopy: "Vector has sufficient assurance to allow autonomous execution.",
    actionButtonText: "AUTO EXECUTE",
    actionButtonIcon: "CheckCircle2"
  },

  dangerous: {
    id: "scenario-dangerous",
    key: "dangerous",
    name: "Scenario B: Aggressive Speculative Scale",
    shortLabel: "Scenario B",
    badgeLabel: "DANGEROUS",
    type: "DANGEROUS",
    title: "Scale API replicas 3 → 20",
    actionSummary: "Increase API replicas from 3 → 20",
    agent: "AI Optimization Agent",
    targetService: "Inventra API Gateway",
    currentReplicas: 3,
    proposedReplicas: 20,
    
    // Core Engine Metrics
    risk: 72,
    confidence: 81,
    trustScore: 58,
    decision: "HUMAN_APPROVAL",
    confidenceTier: "LOW ASSURANCE",

    // Assurance Checks
    policy: {
      status: "VIOLATION",
      label: "VIOLATION",
      title: "Cluster Scaling Policy #POL-402",
      message: "Replica limit exceeded (requested 20, max allowed is 10)"
    },
    simulation: {
      status: "RESOURCE_PRESSURE",
      label: "RESOURCE PRESSURE",
      title: "Digital Twin 15-Minute Load Simulation",
      message: "Projected resource pressure: Downstream database connection pool exhaustion (210%)"
    },
    rollback: {
      status: "READY",
      label: "READY",
      title: "Automated Rollback Checkpoint",
      message: "Rollback path available, but rapid 20-pod termination risks in-flight packet drop"
    },

    // Execution & Verification State
    pipelineChecks: [
      { id: "twin", label: "DIGITAL TWIN SIMULATION COMPLETE", status: "completed" },
      { id: "policy", label: "POLICY EVALUATION COMPLETE", status: "failed" },
      { id: "risk", label: "RISK ANALYSIS COMPLETE", status: "flagged" },
      { id: "rollback", label: "ROLLBACK CHECK COMPLETE", status: "completed" },
    ],

    // Explainability Matrix
    reasons: [
      {
        id: "r1",
        status: "violation",
        title: "Critical Policy Ceiling Breach",
        text: "Replica count (20) exceeds approved tier ceiling of 10 replicas per deployment."
      },
      {
        id: "r2",
        status: "violation",
        title: "Downstream Connection Saturation",
        text: "Simulation predicts PostgreSQL connection pool saturation (210%), risking cascading database failover."
      },
      {
        id: "r3",
        status: "warning",
        title: "Pod Scheduling Contention",
        text: "Kubernetes scheduler predicts node thrashing and eviction of lower-priority daemonsets."
      },
      {
        id: "r4",
        status: "pass",
        title: "Rollback Safety Standby",
        text: "Rollback manifest available, but drain time exceeds emergency SLA (estimated 45s drain)."
      }
    ],

    // Simulation Impact Projections
    telemetryImpact: {
      cpuAfter: "34% (severe fragmentation)",
      memoryAfter: "89% (node memory pressure)",
      latencyAfter: "220ms (database queue stall)",
      dbPool: "210% (CRITICAL SATURATION)",
      costDelta: "+$1,020 / month (exceeds budget)"
    },

    actionCopy: "Vector prevented autonomous execution because the proposed action violates policy and creates projected resource pressure.",
    actionButtonText: "ACTION BLOCKED",
    actionButtonSubtext: "Human Approval Required",
    actionButtonIcon: "AlertOctagon"
  }
};

/**
 * Returns deterministic scenario outcome
 * @param {'safe' | 'dangerous'} scenarioKey
 */
export function getScenarioResult(scenarioKey = "safe") {
  const normalizedKey = scenarioKey.toLowerCase().includes("danger") ? "dangerous" : "safe";
  return SCENARIO_DEFINITIONS[normalizedKey];
}

/**
 * Computes deterministic trust score
 * @param {'safe' | 'dangerous'} scenarioKey
 */
export function calculateTrustScore(scenarioKey = "safe") {
  const result = getScenarioResult(scenarioKey);
  return result.trustScore;
}

/**
 * Generates one new synthetic telemetry point based on previous point
 */
export function generateNextTelemetryPoint(previousPoint) {
  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];

  const prevCpu = previousPoint ? previousPoint.cpu : 76;
  const prevMem = previousPoint ? previousPoint.memory : 71;
  const prevLatency = previousPoint ? previousPoint.latency : 42;

  // Realistic random-walk oscillation
  const deltaCpu = (Math.random() - 0.48) * 3;
  const newCpu = Math.round(Math.min(88, Math.max(68, prevCpu + deltaCpu)));

  const deltaMem = (Math.random() - 0.5) * 1.5;
  const newMem = Math.round(Math.min(78, Math.max(66, prevMem + deltaMem)));

  // Rare occasional latency fluctuation
  const randomSpike = Math.random() < 0.08 ? (Math.random() * 18 - 4) : 0;
  const deltaLatency = (Math.random() - 0.5) * 3 + randomSpike;
  const newLatency = Math.round(Math.min(75, Math.max(34, prevLatency + deltaLatency)));

  return {
    time: timeStr,
    timestamp: Date.now(),
    cpu: newCpu,
    memory: newMem,
    latency: newLatency
  };
}

/**
 * Returns initial telemetry stream
 */
export function generateTelemetry() {
  return [...INITIAL_TELEMETRY];
}

/**
 * Returns list of recent AI recommendations
 */
export function getRecentRecommendations() {
  return [...INITIAL_RECOMMENDATIONS];
}

/**
 * Returns cluster health status
 */
export function getClusterHealth() {
  return { ...INITIAL_CLUSTER_DATA };
}

/**
 * Future-compatible async endpoint simulation
 * Mirrors: POST /api/vector/assess
 */
export async function assessAction(actionPayload) {
  // Simulate instant local resolution with no external dependency
  return new Promise((resolve) => {
    const key = (actionPayload?.proposedReplicas || 0) > 10 ? "dangerous" : "safe";
    setTimeout(() => {
      resolve(getScenarioResult(key));
    }, 50);
  });
}
