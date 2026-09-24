import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { DigitalTwin } from './pages/DigitalTwin';
import { Assurance } from './pages/Assurance';
import { ChaosLabPage } from './pages/ChaosLabPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { RollbackPage } from './pages/RollbackPage';
import { ForensicsPage } from './pages/ForensicsPage';
import { RoiImpactPage } from './pages/RoiImpactPage';
import { useVectorAssurance } from './hooks/useVectorAssurance';

export function App() {
  // Page Routing State: 'landing' | 'login' | 'dashboard'
  const [page, setPage] = useState('landing');
  
  // Authenticated user state
  const [user, setUser] = useState({
    name: 'Alex Chen',
    role: 'Staff SRE • Platform Assurance',
    email: 'alex.chen@inventra.io',
    cluster: 'prod-us-east-k8s',
    avatarInitials: 'AC'
  });

  // Active console tab: 'dashboard' | 'chaos' | 'assurance' | 'digital-twin' | 'policies' | 'rollback' | 'forensics' | 'roi'
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

  const handleNavigateToForensics = () => {
    setCurrentTab('forensics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToPolicies = () => {
    setCurrentTab('policies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRollback = () => {
    setCurrentTab('rollback');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Landing Page View
  if (page === 'landing') {
    return (
      <LandingPage
        onNavigateToLogin={() => {
          setPage('login');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLaunchDemo={() => {
          setPage('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // 2. Login Page View
  if (page === 'login') {
    return (
      <LoginPage
        onBackToLanding={() => {
          setPage('landing');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setPage('dashboard');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // 3. User Dashboard Console View
  return (
    <div className="min-h-screen bg-[#edf5ee] text-[#092218] antialiased selection:bg-[#092218] selection:text-white flex font-sans page-transition-3d">
      {/* Fixed/Sticky Left Dark Forest Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#edf5ee] min-h-screen">
        {/* Top Console Header */}
        <Header
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          demoMode={demoMode}
          setDemoMode={setDemoMode}
          lastSyncTime={lastSyncTime}
          user={user}
          onLogout={handleLogout}
        />

        {/* Dynamic Inner Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <Dashboard
              clusterHealth={clusterHealth}
              telemetry={telemetry}
              recommendations={recommendations}
              onNavigateToAssurance={handleNavigateToAssurance}
            />
          )}

          {currentTab === 'chaos' && (
            <ChaosLabPage
              onNavigateToAssurance={handleNavigateToAssurance}
              onNavigateToForensics={handleNavigateToForensics}
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

          {currentTab === 'policies' && (
            <PoliciesPage
              onNavigateToAssurance={handleNavigateToAssurance}
            />
          )}

          {currentTab === 'rollback' && (
            <RollbackPage
              onNavigateToAssurance={handleNavigateToAssurance}
            />
          )}

          {currentTab === 'forensics' && (
            <ForensicsPage />
          )}

          {currentTab === 'roi' && (
            <RoiImpactPage
              onNavigateToAssurance={handleNavigateToAssurance}
            />
          )}
        </main>

        {/* Console Bottom Bar */}
        <footer className="border-t border-[#d8e6db] bg-white px-6 py-4 text-xs font-mono text-[#526d60]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-black p-0.5 border border-[#2b654c] flex items-center justify-center flex-shrink-0">
                <img src="/vector-logo.png" alt="Vector" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-[#092218]">Vector Decision Assurance Layer</span>
              <span className="text-[#86a394]">• Logged in as {user.name} ({user.role})</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#86a394]">
              <span>Context: {user.cluster}</span>
              <span>•</span>
              <button
                onClick={handleLogout}
                className="text-[#059669] hover:underline cursor-pointer font-bold"
              >
                Sign Out to Homepage
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
