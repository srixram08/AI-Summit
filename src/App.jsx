import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { DigitalTwin } from './pages/DigitalTwin';
import { Assurance } from './pages/Assurance';
import { useVectorAssurance } from './hooks/useVectorAssurance';

export function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const {
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
  } = useVectorAssurance('safe');

  // Navigation handlers
  const handleNavigateToAssurance = (scenarioKey = 'safe') => {
    selectScenario(scenarioKey);
    setCurrentTab('assurance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTwin = (scenarioKey = 'safe') => {
    selectScenario(scenarioKey);
    setCurrentTab('digital-twin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Persistent Left Sidebar (Desktop) */}
      <div className="hidden md:block">
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#080c14]">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          demoMode={demoMode}
          setDemoMode={setDemoMode}
          lastSyncTime={lastSyncTime}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              clusterHealth={clusterHealth}
              telemetry={telemetry}
              recommendations={recommendations}
              onNavigateToAssurance={handleNavigateToAssurance}
            />
          )}

          {currentTab === 'digital-twin' && (
            <DigitalTwin
              assuranceResult={assuranceResult}
              currentScenario={currentScenario}
              onSelectScenario={selectScenario}
              onNavigateToAssurance={handleNavigateToAssurance}
            />
          )}

          {currentTab === 'assurance' && (
            <Assurance
              currentScenario={currentScenario}
              onSelectScenario={selectScenario}
              assuranceResult={assuranceResult}
              executionState={executionState}
              onAutoExecute={triggerAutoExecute}
              onRequestHumanApproval={triggerHumanApprovalRequest}
              onResetExecution={resetExecution}
              onBackToDashboard={handleBackToDashboard}
            />
          )}
        </main>

        {/* Subtle Footer */}
        <footer className="border-t border-slate-900 px-6 py-4 text-center text-xs font-mono text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vector Pre-Execution Decision Assurance Layer</span>
            </div>
            <div>
              <span>Deterministic Synthetic Engine • 0 External Cloud Calls • Local Hackathon MVP</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
