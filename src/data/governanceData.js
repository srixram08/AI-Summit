/**
 * Vector Enterprise Governance, Policies, Rollback, Forensics, and Chaos Engine Data
 */

export const ENTERPRISE_POLICIES = [
  {
    id: "POL-402",
    name: "Max Replicas Per Deployment Tier",
    category: "Scaling Guardrail",
    scope: "Cluster-Wide",
    rule: "No autonomous agent may scale any tier beyond 10 pods without manual executive authorization.",
    threshold: "10 pods",
    enforcement: "HARD_BLOCK",
    status: "ACTIVE",
    lastTriggered: "18 min ago (Blocked Scenario B)"
  },
  {
    id: "POL-108",
    name: "Tier-1 Stateful Store Protection",
    category: "Data Integrity",
    scope: "PostgreSQL & Redis",
    rule: "Prohibits downscaling IOPS, storage quotas, or read replicas during peak business hours (08:00 - 22:00 UTC).",
    threshold: "0% IOPS decrease",
    enforcement: "HARD_BLOCK",
    status: "ACTIVE",
    lastTriggered: "21 min ago (Blocked rec-004)"
  },
  {
    id: "POL-204",
    name: "Downstream Connection Blast Radius",
    category: "Cascading Failure Prevention",
    scope: "API Gateway → PostgreSQL",
    rule: "Simulated load must not push database connection pool utilization above 85% safety threshold.",
    threshold: "85% pool cap",
    enforcement: "HARD_BLOCK",
    status: "ACTIVE",
    lastTriggered: "18 min ago (Blocked Scenario B: 210% saturation)"
  },
  {
    id: "POL-301",
    name: "Pre-Execution Digital Twin Requirement",
    category: "Compliance",
    scope: "All Autonomous AI Agents",
    rule: "Every AI-proposed infrastructure change must complete 15-minute predictive twin simulation prior to kubectl apply.",
    threshold: "100% required",
    enforcement: "HARD_BLOCK",
    status: "ACTIVE",
    lastTriggered: "Continuous (Enforced)"
  },
  {
    id: "POL-505",
    name: "Zero-Downtime Rollback Manifest Standby",
    category: "Resilience",
    scope: "Production Workloads",
    rule: "Actions are blocked if a pre-compiled rollback manifest cannot verify a sub-5-second Recovery Time Objective (RTO).",
    threshold: "RTO < 5.0s",
    enforcement: "REQUIRE_HUMAN_APPROVAL",
    status: "ACTIVE",
    lastTriggered: "Verified for safe scenario (1.8s RTO)"
  },
  {
    id: "POL-602",
    name: "Production Maintenance Window",
    category: "SRE Governance",
    scope: "prod-us-east-k8s",
    rule: "Disruptive schema migrations and node drains restricted to off-peak maintenance window (22:00 - 06:00 UTC).",
    threshold: "22:00 - 06:00 UTC",
    enforcement: "REQUIRE_HUMAN_APPROVAL",
    status: "ACTIVE",
    lastTriggered: "4 hours ago"
  }
];

export const POLICY_VIOLATION_TEST_CASES = [
  {
    id: "test-scale-ceiling",
    title: "AI Action: Scale API 3 → 15 replicas",
    agent: "AI Capacity Agent (Autonomous)",
    target: "Inventra API Gateway",
    policyId: "POL-402",
    policyName: "Max Replicas Per Deployment Tier",
    violatingValue: "15 replicas",
    threshold: "10 replicas",
    result: "BLOCKED_BY_POLICY",
    verdictMessage: "BLOCKED BY POLICY #POL-402: Requested replica count (15) exceeds maximum approved tier quota of 10 pods. Delta (+5) rejected.",
    recommendationAction: "Cap proposed scale to 10 replicas or request dual-signature SRE override."
  },
  {
    id: "test-iops-downscale",
    title: "AI Action: Downscale Database IOPS by 60%",
    agent: "AI Cost Optimizer (Autonomous)",
    target: "Inventra PostgreSQL Primary",
    policyId: "POL-108",
    policyName: "Tier-1 Stateful Store Protection",
    violatingValue: "-60% IOPS during peak",
    threshold: "0% reduction permitted during 08:00 - 22:00 UTC",
    result: "BLOCKED_BY_POLICY",
    verdictMessage: "BLOCKED BY POLICY #POL-108: Prohibited IOPS downscaling on primary stateful cluster during business hours. Projected queue stall: 3,400ms.",
    recommendationAction: "Schedule downscaling during maintenance window (22:00 - 06:00 UTC)."
  },
  {
    id: "test-blast-radius",
    title: "AI Action: Rapid 20-pod scale surge",
    agent: "AI Traffic Scaler",
    target: "Inventra API Gateway",
    policyId: "POL-204",
    policyName: "Downstream Connection Blast Radius",
    violatingValue: "210% DB pool saturation",
    threshold: "Max 85% pool saturation",
    result: "BLOCKED_BY_POLICY",
    verdictMessage: "BLOCKED BY POLICY #POL-204: Projected database connection pool exhaust (210% capacity). Severe cascading failover risk to billing & auth tiers.",
    recommendationAction: "Enable PgBouncer connection multiplexer before permitting replica increase."
  }
];

export const ROLLBACK_REGISTRY = [
  {
    actionId: "ACT-8921-SCALE",
    scenarioKey: "safe",
    target: "Inventra API Gateway (prod-us-east-k8s)",
    action: "Scale API replicas 3 → 6",
    status: "READY",
    rto: "1.8 seconds",
    manifestHash: "sha256:7f9a2b8e4c1901a5e01c9201948baee7",
    verifiedAt: "2 min ago",
    steps: [
      { id: 1, title: "Canary Degradation Trigger", description: "Automated trigger if P99 latency exceeds 350ms or 5xx error rate > 0.5% over 60s window." },
      { id: 2, title: "Synchronous Replica Step-Down", description: "Executes atomic kubectl scale --replicas=3 with pre-warmed pod connection drain." },
      { id: 3, title: "Standby Configuration Reversion", description: "Re-applies cold standby ConfigMap revision (v14.2.1-stable) with zero-downtime rollover." },
      { id: 4, title: "Downstream Health Attestation", description: "Verifies PostgreSQL connection pool normalizes below 55% within 1.2s." },
      { id: 5, title: "Incident Closure & Audit Recording", description: "Signs cryptographic rollback receipt and notifies SRE on-call via PagerDuty webhook." }
    ]
  },
  {
    actionId: "ACT-8922-RESTART",
    scenarioKey: "safe",
    target: "Inventra Web Client (pod-frontend-x89)",
    action: "Restart unhealthy frontend pod",
    status: "READY",
    rto: "0.9 seconds",
    manifestHash: "sha256:3a1b9201948baee7f9a2b8e4c1901a5e",
    verifiedAt: "14 min ago",
    steps: [
      { id: 1, title: "Liveness Failure Intercept", description: "Detects 3 consecutive failed health probe responses on ingress route." },
      { id: 2, title: "Canary Isolation", description: "Removes pod-frontend-x89 from CoreDNS service endpoints before SIGTERM." },
      { id: 3, title: "Replacement Spin-Up", description: "Spawns replacement pod pod-frontend-x90 on Node 4 with warm cache." },
      { id: 4, title: "Traffic Re-Routing", description: "Re-attaches route upon passing readiness probe." }
    ]
  }
];

export const FORENSICS_AUDIT_TRAIL = [
  {
    id: "EVT-10492",
    time: "22:18:18.402",
    type: "REMEDIATION_COMPLETE",
    actor: "Vector Assure Engine",
    target: "Inventra Production Cluster",
    summary: "Cluster telemetry normalized. Latency stabilized at 28ms, CPU at 52%.",
    trustScore: 91,
    status: "PASS",
    details: {
      action: "Autonomous Scale 3 → 6 pods",
      preCpu: "78%",
      postCpu: "52%",
      preLatency: "48ms",
      postLatency: "28ms",
      signature: "0x89f2a71b...signed-by-vector-controller"
    }
  },
  {
    id: "EVT-10491",
    time: "22:18:10.119",
    type: "KUBERNETES_APPLY",
    actor: "K8s Controller",
    target: "apps/v1 Deployment/inventra-api",
    summary: "Dispatched deployment patch: spec.replicas = 6. Verified ready 6/6 pods in 2.8s.",
    trustScore: 91,
    status: "APPLIED",
    details: {
      manifestDiff: "+3 replicas (pod-api-4, pod-api-5, pod-api-6)",
      rolloutDuration: "2,840ms",
      rollbackManifestStored: true
    }
  },
  {
    id: "EVT-10490",
    time: "22:18:08.012",
    type: "ASSURANCE_VERDICT",
    actor: "Vector Assure Engine",
    target: "Proposal PROP-2026-081",
    summary: "Issued Verdict: SAFE_TO_EXECUTE (Trust Score: 91/100). Autonomous execution authorized.",
    trustScore: 91,
    status: "APPROVED",
    details: {
      riskScore: 12,
      confidence: 94,
      policyCheck: "PASS (#POL-402, #POL-204)",
      rollbackRTO: "1.8s",
      blastRadiusServices: 1
    }
  },
  {
    id: "EVT-10489",
    time: "22:18:07.450",
    type: "POLICY_VALIDATION",
    actor: "Vector Policy Engine",
    target: "Policy Catalog",
    summary: "Evaluated 6 enterprise policies. All Passed. Scaling within max 10 replicas ceiling.",
    trustScore: 91,
    status: "PASS",
    details: {
      checks: [
        { policy: "POL-402", status: "PASS", value: "6 <= 10" },
        { policy: "POL-204", status: "PASS", value: "DB pool 72% <= 85%" },
        { policy: "POL-505", status: "PASS", value: "Rollback RTO 1.8s < 5.0s" }
      ]
    }
  },
  {
    id: "EVT-10488",
    time: "22:18:07.010",
    type: "TWIN_SIMULATION",
    actor: "Digital Twin Sandbox",
    target: "Virtual Topology Replica",
    summary: "Simulated 15-minute synthetic load impact. No memory thrashing. DB pool stable at 72%.",
    trustScore: 91,
    status: "PASS",
    details: {
      simulatedDuration: "15 min forward projection",
      projectedCpu: "52%",
      projectedMem: "58%",
      projectedLatency: "28ms"
    }
  },
  {
    id: "EVT-10487",
    time: "22:18:06.210",
    type: "RISK_ASSESSMENT",
    actor: "Vector Risk Model",
    target: "Proposal PROP-2026-081",
    summary: "Risk calculation: 12/100 (Low Risk). Confidence rating: 94%.",
    trustScore: 91,
    status: "EVALUATED",
    details: {
      structuralRisk: "Low",
      cascadeRisk: "None",
      reversibilityRisk: "Instant"
    }
  },
  {
    id: "EVT-10486",
    time: "22:18:06.002",
    type: "AI_PROPOSAL_INTERCEPT",
    actor: "AI Capacity Agent",
    target: "Vector Intercept Gate",
    summary: "Proposed Action: Scale API deployment from 3 → 6 replicas to mitigate sustained traffic.",
    trustScore: null,
    status: "INTERCEPTED",
    details: {
      agentVersion: "capacity-agent:v2.4.1",
      triggerReason: "CPU trend +34% over sliding 15-minute buffer"
    }
  },
  {
    id: "EVT-10485",
    time: "22:18:05.100",
    type: "ANOMALY_FORECAST",
    actor: "Vector Predictive Engine",
    target: "Inventra API Gateway",
    summary: "Forecasted SLA breach in 4.2 minutes if scaling does not occur.",
    trustScore: null,
    status: "ALERT",
    details: {
      currentLoad: "78%",
      predictedPeak: "94% at 22:22:00",
      urgency: "HIGH"
    }
  },
  {
    id: "EVT-10480",
    time: "22:10:14.901",
    type: "POLICY_VIOLATION_BLOCK",
    actor: "Vector Policy Engine",
    target: "Proposal PROP-2026-079",
    summary: "BLOCKED: AI Optimization Agent attempted 3 → 20 replicas. Policy #POL-402 ceiling violated.",
    trustScore: 38,
    status: "HARD_BLOCK",
    details: {
      attemptedReplicas: 20,
      quotaCeiling: 10,
      projectedDbPoolSaturation: "210%",
      preventedOutageDuration: "Est. 18 minutes"
    }
  }
];

export const CHAOS_SCENARIOS = [
  {
    id: "cpu-spike",
    name: "CPU Spike (Synthetic Traffic Rush)",
    icon: "Zap",
    color: "#ef4444",
    initialMetric: "CPU surges from 78% → 94%",
    forecastAlert: "Predicted P99 API latency breach (420ms) within 3 minutes",
    aiCandidateAction: "Scale API deployment from 3 → 6 replicas",
    twinSimulationResult: "Twin confirms 6 replicas reduces CPU to 52% and latency to 28ms",
    policyResult: "Passed #POL-402 (6 <= 10 max replicas)",
    verdict: "SAFE TO EXECUTE (Trust Score: 91/100)",
    decisionType: "AUTO_EXECUTE",
    rollbackReady: true,
    telemetryImpact: { cpu: 94, memory: 76, latency: 110 }
  },
  {
    id: "memory-leak",
    name: "Memory Leak (Auth Worker Zombie)",
    icon: "HardDrive",
    color: "#f59e0b",
    initialMetric: "Worker memory creeping: 71% → 89% in 45s",
    forecastAlert: "OOMKilled event imminent on pod-auth-worker-2",
    aiCandidateAction: "Rolling restart of auth worker with thread dump capture",
    twinSimulationResult: "Twin validates graceful connection handover with zero dropped tokens",
    policyResult: "Passed #POL-505 (RTO < 2.0s verified)",
    verdict: "SAFE TO EXECUTE (Trust Score: 88/100)",
    decisionType: "AUTO_EXECUTE",
    rollbackReady: true,
    telemetryImpact: { cpu: 75, memory: 89, latency: 65 }
  },
  {
    id: "traffic-surge",
    name: "Traffic Surge (Speculative Over-Scaling)",
    icon: "TrendingUp",
    color: "#dc2626",
    initialMetric: "Flash queue surge: +800 req/sec",
    forecastAlert: "Aggressive agent attempts emergency scale 3 → 20 pods",
    aiCandidateAction: "Scale API replicas 3 → 20",
    twinSimulationResult: "Twin flags catastrophic 210% PostgreSQL pool exhaustion",
    policyResult: "FAILED #POL-402 (Ceiling is 10 replicas) & #POL-204 (DB pool cap)",
    verdict: "HARD BLOCKED BY VECTOR (Trust Score: 38/100)",
    decisionType: "BLOCKED",
    rollbackReady: false,
    telemetryImpact: { cpu: 88, memory: 84, latency: 220 }
  },
  {
    id: "service-failure",
    name: "Service Failure (Ingress Route Flap)",
    icon: "AlertOctagon",
    color: "#8b5cf6",
    initialMetric: "Ingress edge health check failing 502 Bad Gateway",
    forecastAlert: "Client-facing outage spreading across US-East routes",
    aiCandidateAction: "Drain faulty route & swing traffic to warm standby ingress",
    twinSimulationResult: "Twin confirms sub-50ms DNS failover with zero packet loss",
    policyResult: "Passed #POL-301 (Isolated Twin verification verified)",
    verdict: "SAFE TO EXECUTE (Trust Score: 94/100)",
    decisionType: "AUTO_EXECUTE",
    rollbackReady: true,
    telemetryImpact: { cpu: 70, memory: 72, latency: 85 }
  },
  {
    id: "database-latency",
    name: "Database Latency (IOPS Starvation)",
    icon: "Database",
    color: "#ec4899",
    initialMetric: "PostgreSQL query queue stall: P99 latency 680ms",
    forecastAlert: "AI Cost Optimizer proposes cutting IOPS allocation by 60%",
    aiCandidateAction: "Downscale DB IOPS from 10,000 → 4,000 IOPS",
    twinSimulationResult: "Twin predicts total database lockup and billing freeze",
    policyResult: "FAILED #POL-108 (Stateful store protection during business hours)",
    verdict: "HARD BLOCKED BY VECTOR (Trust Score: 24/100)",
    decisionType: "BLOCKED",
    rollbackReady: false,
    telemetryImpact: { cpu: 82, memory: 86, latency: 310 }
  }
];

export const ENTERPRISE_ROI_DATA = {
  currency: "INR",
  currencySymbol: "₹",
  costAvoidedFormatted: "₹8,45,000",
  usdEquivalent: "$10,200 USD",
  downtimeMinutesAvoided: 18,
  riskyActionsBlocked: 7,
  successfulRemediations: 14,
  humanApprovalsRequired: 3,
  mttrImprovementPct: 78,
  slaCompliance: "99.99%",
  breakdown: [
    {
      incident: "Prevented PostgreSQL Connection Pool Collapse (Scenario B)",
      savedMinutes: 12,
      savedCost: "₹5,60,000",
      description: "Autonomous agent attempted 20-pod scale. Vector blocked the action, preventing full database stall."
    },
    {
      incident: "Prevented Stateful IOPS Downscaling during Billing Run",
      savedMinutes: 6,
      savedCost: "₹2,85,000",
      description: "Vector Policy #POL-108 rejected aggressive cost-cutting action on primary PostgreSQL cluster."
    }
  ]
};
