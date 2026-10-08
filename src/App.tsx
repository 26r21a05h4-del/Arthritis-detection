/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  UserInfo,
  SymptomResponses,
  MovementMetrics,
  ScreeningResult,
} from './types/screening';
import { AuthorizedUser } from './types/auth';
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { HowItWorksPage } from './components/pages/HowItWorksPage';
import { AboutPage } from './components/pages/AboutPage';
import { HistoryPage } from './components/pages/HistoryPage';
import { DisclaimerPage } from './components/pages/DisclaimerPage';
import { StepUserInfo } from './components/screening/StepUserInfo';
import { StepSymptoms } from './components/screening/StepSymptoms';
import { StepCameraTest } from './components/screening/StepCameraTest';
import { AnalysisProgressModal } from './components/screening/AnalysisProgressModal';
import { StepResults } from './components/screening/StepResults';
import { LoginModal } from './components/auth/LoginModal';
import { buildScreeningResult } from './utils/scoringEngine';
import { DEMO_PRESETS } from './utils/demoData';
import { getStoredScreenings, saveScreeningResult } from './utils/storage';
import { getCurrentAuth, setAuthSession, clearAuthSession } from './utils/auth';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [screeningStep, setScreeningStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showDemoPickerModal, setShowDemoPickerModal] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Authentication State
  const [authUser, setAuthUser] = useState<AuthorizedUser | null>(null);

  // Stored Records
  const [history, setHistory] = useState<ScreeningResult[]>([]);
  const [currentResult, setCurrentResult] = useState<ScreeningResult | null>(null);

  // Active Screening Form State
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: `SCN-${Math.floor(1000 + Math.random() * 9000)}`,
    name: '',
    age: '',
    gender: '',
    heightCm: '',
    weightKg: '',
    targetKnee: 'both',
  });

  const [symptoms, setSymptoms] = useState<SymptomResponses>({
    kneePain: 'mild',
    kneeStiffness: 'sometimes',
    walkingDifficulty: 'sometimes',
    stairDifficulty: 'mild',
    morningStiffnessDuration: 'under-30-min',
    jointCrepitus: 'yes',
    previousInjury: 'no',
  });

  const [temporaryMetrics, setTemporaryMetrics] = useState<MovementMetrics | null>(null);

  // Initialize storage & auth session on mount
  useEffect(() => {
    const authState = getCurrentAuth();
    if (authState.isAuthenticated && authState.user) {
      setAuthUser(authState.user);
    }

    const saved = getStoredScreenings();
    setHistory(saved);
    if (saved.length > 0 && !currentResult) {
      setCurrentResult(saved[0]);
    }
  }, []);

  // Handlers
  const handleStartScreening = () => {
    setScreeningStep(1);
    setActiveTab('screening');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCameraMetricsComplete = (metrics: MovementMetrics) => {
    setTemporaryMetrics(metrics);
    setIsAnalyzing(true);
  };

  const handleAnalysisAnimationComplete = () => {
    if (!temporaryMetrics) return;

    const result = buildScreeningResult(userInfo, symptoms, temporaryMetrics, false);
    saveScreeningResult(result);
    setHistory(getStoredScreenings());
    setCurrentResult(result);
    setIsAnalyzing(false);
    setActiveTab('results');
    setScreeningStep(1); // reset step for next time
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchDemoPreset = (presetId: string) => {
    const preset = DEMO_PRESETS.find((p) => p.id === presetId) || DEMO_PRESETS[1];
    saveScreeningResult(preset.result);
    setHistory(getStoredScreenings());
    setCurrentResult(preset.result);
    setShowDemoPickerModal(false);
    setActiveTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFillDemoProfile = () => {
    setUserInfo({
      id: `SCN-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
      name: 'Alex Morgan (Demo)',
      age: 56,
      gender: 'female',
      heightCm: 165,
      weightKg: 68,
      targetKnee: 'right',
    });
    setSymptoms({
      kneePain: 'moderate',
      kneeStiffness: 'frequently',
      walkingDifficulty: 'sometimes',
      stairDifficulty: 'moderate',
      morningStiffnessDuration: 'under-30-min',
      jointCrepitus: 'yes',
      previousInjury: 'yes',
    });
  };

  const handleLoginSuccess = (user: AuthorizedUser) => {
    setAuthUser(user);
    setAuthSession(user);
  };

  const handleLogout = () => {
    setAuthUser(null);
    clearAuthSession();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Disclaimer Banner - hidden on home page per user request */}
      {activeTab !== 'home' && (
        <DisclaimerBanner onLearnMore={() => setActiveTab('disclaimer')} />
      )}

      {/* Main Navbar */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLaunchDemo={() => setShowDemoPickerModal(true)}
        hasRecentResult={currentResult !== null}
        authUser={authUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Body Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Home Page */}
        {activeTab === 'home' && (
          <HomePage
            onStartScreening={handleStartScreening}
            onViewHowItWorks={() => {
              setActiveTab('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLaunchDemoPreset={handleLaunchDemoPreset}
          />
        )}

        {/* Tab 2: Screening Flow */}
        {activeTab === 'screening' && (
          <div className="space-y-6">
            {/* Step Indicator Header */}
            <div className="max-w-2xl mx-auto flex items-center justify-between text-xs text-slate-500 font-medium px-2">
              <span className={screeningStep === 1 ? 'text-teal-800 font-bold' : ''}>
                1. User Demographics
              </span>
              <span className="text-slate-300">→</span>
              <span className={screeningStep === 2 ? 'text-teal-800 font-bold' : ''}>
                2. Symptom Survey
              </span>
              <span className="text-slate-300">→</span>
              <span className={screeningStep === 3 ? 'text-teal-800 font-bold' : ''}>
                3. Camera Movement Test
              </span>
            </div>

            {/* Step 1: User Info */}
            {screeningStep === 1 && (
              <StepUserInfo
                userInfo={userInfo}
                onChange={setUserInfo}
                onNext={() => {
                  setScreeningStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onUseDemo={handleFillDemoProfile}
              />
            )}

            {/* Step 2: Symptoms */}
            {screeningStep === 2 && (
              <StepSymptoms
                symptoms={symptoms}
                onChange={setSymptoms}
                onNext={() => {
                  setScreeningStep(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBack={() => setScreeningStep(1)}
              />
            )}

            {/* Step 3: Camera Screening */}
            {screeningStep === 3 && (
              <StepCameraTest
                symptoms={symptoms}
                onComplete={handleCameraMetricsComplete}
                onBack={() => setScreeningStep(2)}
                onUseDemoFallback={() => handleLaunchDemoPreset('demo-medium-risk')}
              />
            )}
          </div>
        )}

        {/* Tab 3: Results Dashboard */}
        {activeTab === 'results' && currentResult && (
          <StepResults
            result={currentResult}
            authUser={authUser}
            onRetake={handleStartScreening}
            onViewHowItWorks={() => {
              setActiveTab('how-it-works');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 4: How It Works */}
        {activeTab === 'how-it-works' && <HowItWorksPage />}

        {/* Tab 5: History / Records */}
        {activeTab === 'history' && (
          <HistoryPage
            history={history}
            authUser={authUser}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onSelectResult={(res) => {
              setCurrentResult(res);
              setActiveTab('results');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartNewScreening={handleStartScreening}
          />
        )}

        {/* Tab 6: About */}
        {activeTab === 'about' && <AboutPage />}

        {/* Tab 7: Medical Disclaimer */}
        {activeTab === 'disclaimer' && <DisclaimerPage />}
      </main>

      {/* Analysis In-Progress Animation Modal */}
      {isAnalyzing && (
        <AnalysisProgressModal onFinished={handleAnalysisAnimationComplete} />
      )}

      {/* Presentation Demo Picker Modal */}
      {showDemoPickerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <h3 className="text-base sm:text-lg">Select Presentation Demo Preset</h3>
              </div>
              <button
                onClick={() => setShowDemoPickerModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select a pre-calibrated scenario to evaluate how the system categorizes movement
              characteristics and clinical symptoms:
            </p>

            <div className="space-y-3">
              {DEMO_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => handleLaunchDemoPreset(preset.id)}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-600 hover:bg-teal-50/40 cursor-pointer transition flex items-center justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 group-hover:text-teal-900">
                        {preset.name}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          preset.expectedRisk === 'LOW RISK'
                            ? 'bg-emerald-100 text-emerald-800'
                            : preset.expectedRisk === 'MEDIUM RISK'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {preset.expectedRisk}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{preset.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 shrink-0" />
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 text-center">
              DEMO DATA — NOT REAL MEDICAL SCREENING
            </div>
          </div>
        </div>
      )}

      {/* Authorised Personnel Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Global Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
