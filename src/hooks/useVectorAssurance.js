import { useState, useEffect, useCallback } from 'react';
import { 
  getScenarioResult, 
  generateTelemetry, 
  generateNextTelemetryPoint, 
  getClusterHealth, 
  getRecentRecommendations 
} from '../engine/mockVectorEngine';

/**
 * Custom hook to encapsulate Vector Decision Assurance state,
 * real-time telemetry streaming, scenario transitions, and simulated human-in-the-loop workflows.
 */
export function useVectorAssurance(initialScenario = 'safe') {
  const [currentScenario, setCurrentScenario] = useState(initialScenario);
  const [demoMode, setDemoMode] = useState(true);
  const [telemetry, setTelemetry] = useState(() => generateTelemetry());
  const [clusterHealth, setClusterHealth] = useState(() => getClusterHealth());
  const [recommendations, setRecommendations] = useState(() => getRecentRecommendations());
  const [lastSyncTime, setLastSyncTime] = useState('just now');
  
  // Simulated action states (AUTO_EXECUTE authorized vs REQUEST_HUMAN_APPROVAL created)
  const [executionState, setExecutionState] = useState({
    status: 'idle', // 'idle' | 'authorized' | 'approval_pending'
    message: '',
    timestamp: null,
    reviewer: null,
  });

  // Get current deterministic engine result
  const assuranceResult = getScenarioResult(currentScenario);

  // Switch scenario and reset simulated execution state
  const selectScenario = useCallback((scenarioKey) => {
    setCurrentScenario(scenarioKey);
    setExecutionState({
      status: 'idle',
      message: '',
      timestamp: null,
      reviewer: null,
    });
  }, []);

  // Simulate Auto Execution
  const triggerAutoExecute = useCallback(() => {
    setExecutionState({
      status: 'authorized',
      message: 'Execution Authorized — Vector assurance passed. Simulated deployment triggered.',
      timestamp: new Date().toLocaleTimeString(),
      reviewer: 'Autonomous Agent (Vector Assured)',
    });
  }, []);

  // Simulate Human Approval Request
  const triggerHumanApprovalRequest = useCallback(() => {
    setExecutionState({
      status: 'approval_pending',
      message: 'Approval Request Created — Awaiting SRE approval',
      timestamp: new Date().toLocaleTimeString(),
      reviewer: 'SRE On-Call (PagerDuty Escalation)',
    });
  }, []);

  // Reset simulated state
  const resetExecution = useCallback(() => {
    setExecutionState({
      status: 'idle',
      message: '',
      timestamp: null,
      reviewer: null,
    });
  }, []);

  // Telemetry real-time ticking every 2.5s when demoMode is active
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      setTelemetry((prevTelemetry) => {
        const lastPoint = prevTelemetry[prevTelemetry.length - 1];
        const newPoint = generateNextTelemetryPoint(lastPoint);
        // Keep 40 points in sliding window
        return [...prevTelemetry.slice(1), newPoint];
      });

      // Subtle dynamic jitter to current cluster metrics
      setClusterHealth((prev) => {
        const jitter = (Math.random() - 0.49) * 1.5;
        const newCpu = Math.round(Math.min(85, Math.max(72, prev.cpu + jitter)));
        return {
          ...prev,
          cpu: newCpu,
          lastSync: 'just now',
        };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [demoMode]);

  return {
    currentScenario,
    selectScenario,
    assuranceResult,
    telemetry,
    clusterHealth,
    recommendations,
    demoMode,
    setDemoMode,
    lastSyncTime,
    executionState,
    triggerAutoExecute,
    triggerHumanApprovalRequest,
    resetExecution,
  };
}
