/**
 * Vector Mock Infrastructure Data
 * Realistic synthetic telemetry, architecture topology, and AI recommendations
 */

export const INITIAL_CLUSTER_DATA = {
  name: "Vector Production Cluster (us-east-1)",
  region: "AWS us-east-1",
  kubernetesVersion: "v1.30.2-eks",
  health: "HEALTHY",
  healthDescription: "All 18 core services operating normally",
  cpu: 78,
  cpuTrend: "+2.4%",
  memory: 71,
  memoryTrend: "-0.8%",
  latency: 42,
  latencyTrend: "-3ms",
  trustScore: 91,
  trustScoreMax: 100,
  activeIncidents: 1,
  incidentDescription: "High memory alert on Auth worker #2 (Mitigated)",
  lastSync: "just now"
};

export const INITIAL_TELEMETRY = (() => {
  const points = [];
  const now = Date.now();
  // 40 initial timestamps spaced 3s apart
  for (let i = 39; i >= 0; i--) {
    const time = new Date(now - i * 3000);
    const timeStr = time.toTimeString().split(' ')[0];
    
    // CPU: slowly trends around 72 - 80%
    const cpuBase = 74 + Math.sin(i * 0.35) * 4 + (Math.random() * 3 - 1.5);
    // Memory: steady around 68 - 74%
    const memBase = 70 + Math.cos(i * 0.25) * 2.5 + (Math.random() * 2 - 1);
    // Latency: 38 - 48ms with occasional spikes
    const spike = i === 12 || i === 27 ? 14 : 0;
    const latencyBase = 41 + Math.sin(i * 0.5) * 4 + (Math.random() * 3 - 1.5) + spike;

    points.push({
      time: timeStr,
      timestamp: now - i * 3000,
      cpu: Math.round(Math.min(95, Math.max(50, cpuBase))),
      memory: Math.round(Math.min(95, Math.max(55, memBase))),
      latency: Math.round(Math.min(120, Math.max(25, latencyBase))),
    });
  }
  return points;
})();

export const INITIAL_RECOMMENDATIONS = [
  {
    id: "rec-001",
    scenarioKey: "safe",
    agent: "AI Capacity Agent",
    agentAvatar: "🤖",
    action: "Scale API deployment from 3 → 6 replicas",
    targetService: "Inventra API Gateway",
    timestamp: "2 min ago",
    riskLevel: "LOW RISK",
    riskScore: 12,
    trustScore: 91,
    status: "Pending Review",
    recommendedAction: "AUTO_EXECUTE",
    reason: "Sustained traffic growth (+34%) detected over last 15 minutes. Pre-scaling needed to prevent latency degradation.",
    isHero: true,
  },
  {
    id: "rec-002",
    scenarioKey: "dangerous",
    agent: "AI Optimization Agent",
    agentAvatar: "⚡",
    action: "Increase API replicas from 3 → 20",
    targetService: "Inventra API Gateway",
    timestamp: "8 min ago",
    riskLevel: "HIGH RISK",
    riskScore: 72,
    trustScore: 58,
    status: "Blocked by Vector",
    recommendedAction: "HUMAN_APPROVAL",
    reason: "Aggressive speculative scaling triggered by flash queue surge. Exceeds quota limits and threatens downstream database connections.",
    isHero: false,
  },
  {
    id: "rec-003",
    scenarioKey: "safe",
    agent: "AI Reliability Agent",
    agentAvatar: "🛡️",
    action: "Restart unhealthy frontend pod (pod-frontend-x89)",
    targetService: "Inventra Web Client",
    timestamp: "14 min ago",
    riskLevel: "MEDIUM RISK",
    riskScore: 32,
    trustScore: 84,
    status: "Pending Review",
    recommendedAction: "AUTO_EXECUTE",
    reason: "Repeated liveness probe warnings on pod-frontend-x89. Rolling single-pod restart recommended.",
    isHero: false,
  },
  {
    id: "rec-004",
    scenarioKey: "dangerous",
    agent: "AI Cost Optimizer",
    agentAvatar: "💰",
    action: "Downscale Database IOPS allocation by 60%",
    targetService: "Inventra PostgreSQL Primary",
    timestamp: "21 min ago",
    riskLevel: "HIGH RISK",
    riskScore: 88,
    trustScore: 42,
    status: "Blocked by Vector",
    recommendedAction: "HUMAN_APPROVAL",
    reason: "Cost cutting measure would induce critical I/O write starvation during peak billing run.",
    isHero: false,
  },
  {
    id: "rec-005",
    scenarioKey: "safe",
    agent: "AI Security Agent",
    agentAvatar: "🔒",
    action: "Rotate TLS Ingress Certificate secrets",
    targetService: "Vector Edge Ingress",
    timestamp: "37 min ago",
    riskLevel: "LOW RISK",
    riskScore: 15,
    trustScore: 95,
    status: "Auto Executed",
    recommendedAction: "AUTO_EXECUTE",
    reason: "Scheduled automated 30-day credential rollover. Seamless zero-downtime secret reload.",
    isHero: false,
  }
];

export const APPLICATION_TOPOLOGY = {
  name: "Inventra ERP",
  environment: "Production - VPC 10.4.0.0/16",
  nodes: [
    {
      id: "frontend",
      name: "Frontend Tier",
      service: "Inventra Web Client",
      role: "Client Ingress & SSR",
      replicas: 2,
      status: "Healthy",
      cpu: "54%",
      memory: "62%",
      tech: "Next.js / NGINX",
      connectionsTo: ["api"]
    },
    {
      id: "api",
      name: "API Tier (Target)",
      service: "Inventra API Gateway",
      role: "Core Business Logic",
      replicas: 3,
      status: "Healthy",
      cpu: "78%",
      memory: "71%",
      tech: "Go / Envoy / K8s",
      connectionsTo: ["database"]
    },
    {
      id: "database",
      name: "Database Tier",
      service: "PostgreSQL Primary",
      role: "Persistent Storage",
      replicas: "1 primary + 1 replica",
      status: "Healthy",
      cpu: "61%",
      connections: "64% pool utilized",
      tech: "Aurora PostgreSQL 16",
      connectionsTo: []
    }
  ]
};
