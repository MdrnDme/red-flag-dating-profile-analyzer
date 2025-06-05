import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ProfileInput } from './components/ProfileInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { AnalysisProgress } from './components/AnalysisProgress';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { ComparisonResults } from './components/ComparisonResults';
import { AnalysisResult, ANALYSIS_STEPS, EASTER_EGG_RESPONSES } from './types';
import { analyzeProfileTypes, getProfileResponses, compareProfiles } from './utils/profileAnalyzer';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  const [profile, setProfile] = useState('');
  const [comparisonProfile, setComparisonProfile] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [konamiActive, setKonamiActive] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [activeTab, setActiveTab] = useState('single');

  const runAnalysis = async () => {
    const steps = [...ANALYSIS_STEPS];
    if (konamiActive) {
      steps.push(
        { message: "Activating digital warfare mode", icon: "🔥", color: "rgb(244,63,94)" },
        { message: "Loading extra savage responses", icon: "🌶️", color: "rgb(236,72,153)" }
      );
    }
    
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
  };

  const handleSkipAnalysis = () => {
    setCurrentStep(ANALYSIS_STEPS.length - 1);
    setTimeout(() => handleAnalyze(), 100);
  };

  const handleAnalyze = useCallback(async () => {
    if (!profile.trim()) return;

    setIsAnalyzing(true);
    setResults(null);
    setCurrentStep(0);
    
    try {
      await runAnalysis();
      
      if (activeTab === 'compare' && comparisonProfile.trim()) {
        const comparison = await compareProfiles(profile, comparisonProfile);
        setResults({
          overallScore: comparison.compatibilityScore,
          redFlags: [],
          greenFlags: [],
          neutralObservations: [],
          translation: [],
          generationalTakes: {
            genZ: '',
            millennial: '',
            genX: '',
            boomer: ''
          },
          comparisons: [comparison]
        });
      } else {
        const profileTypes = await analyzeProfileTypes(profile);
        const { translation, personalityIndicators, bottomLine, generationalTakes } = getProfileResponses(profileTypes);
        
        const mockResults: AnalysisResult = {
          overallScore: Math.floor(Math.random() * 100),
          profileTypes,
          translation,
          personalityIndicators,
          bottomLine,
          generationalTakes,
          redFlags: [
            "Mentions 'not here for drama' which often indicates they create drama",
            "Lists height requirements without mentioning their own height",
            "Uses the phrase 'fluent in sarcasm' suggesting potential communication issues",
            profile.length < 100 ? "Profile is very short, suggesting low effort or engagement" : "",
            konamiActive ? "This person definitely still has a Myspace account" : ""
          ].filter(Boolean),
          greenFlags: [
            "Shows genuine interests and hobbies",
            "Mentions desire for meaningful connection",
            "Profile is well-written without spelling errors",
            profile.includes("travel") ? "Expresses interest in travel and new experiences" : ""
          ].filter(Boolean),
          neutralObservations: [
            "Multiple emoji usage throughout profile",
            "Mentions food preferences",
            "Lists favorite TV shows/movies",
            profile.includes("gym") ? "Frequently mentions fitness activities" : "",
            konamiActive ? "Probably thinks pineapple belongs on pizza" : ""
          ].filter(Boolean)
        };
        
        setResults(mockResults);
      }
    } finally {
      setIsAnalyzing(false);
      setCurrentStep(-1);
    }
  }, [profile, comparisonProfile, konamiActive, activeTab]);

  const { getShortcutsList } = useKeyboardShortcuts([
    { 
      key: '?', 
      description: 'Show keyboard shortcuts',
      action: () => setShowShortcuts(true)
    },
    { 
      key: 'Escape', 
      description: 'Close dialogs',
      action: () => setShowShortcuts(false)
    },
    { 
      key: 'Enter',
      ctrl: true,
      description: 'Analyze profile',
      action: handleAnalyze
    },
    { 
      key: ' ',
      description: 'Skip analysis animation',
      action: () => isAnalyzing && handleSkipAnalysis()
    }
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      const newSequence = [...konamiSequence, e.key];
      if (newSequence.length > konamiCode.length) {
        newSequence.shift();
      }
      setKonamiSequence(newSequence);
      
      if (newSequence.join(',') === konamiCode.join(',')) {
        setKonamiActive(true);
        alert('🔥 ROAST MODE ACTIVATED 🔥');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiSequence]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-4xl px-6 py-12 space-y-8">
        <ProfileInput 
          profile={profile} 
          setProfile={setProfile}
          comparisonProfile={comparisonProfile}
          setComparisonProfile={setComparisonProfile}
          onAnalyze={handleAnalyze} 
          isAnalyzing={isAnalyzing}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        {isAnalyzing && currentStep >= 0 && (
          <AnalysisProgress 
            currentStep={currentStep}
            onSkip={handleSkipAnalysis}
            isDemoMode={true}
          />
        )}
        
        {results && activeTab === 'compare' && results.comparisons?.[0] ? (
          <ComparisonResults comparison={results.comparisons[0]} />
        ) : results && (
          <ResultsDisplay results={results} />
        )}

        <KeyboardShortcuts 
          shortcuts={getShortcutsList()}
          isVisible={showShortcuts}
          onClose={() => setShowShortcuts(false)}
        />
      </main>
      <footer className="glass py-6 mt-12">
        <div className="container mx-auto max-w-4xl px-6 text-center text-white/60 text-sm">
          Crafted in the digital wasteland • No dating lives were harmed in the making of this tool 
          <span className="text-xs ml-2 text-white/40">v1.0.0</span>
        </div>
      </footer>
    </div>
  );
}

export default App;