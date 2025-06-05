import { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ProfileInput } from './components/ProfileInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { AnalysisProgress } from './components/AnalysisProgress';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { ComparisonResults } from './components/ComparisonResults';
import { ShareResults } from './components/ShareResults';
import { DemoModeToggle } from './components/DemoModeToggle';
import { AnalysisResult, ANALYSIS_STEPS } from './types';
import { analyzeProfileTypes, getProfileResponses, compareProfiles } from './utils/profileAnalyzer';
import { analyzeChatHistory } from './utils/chatAnalyzer';
import type { ChatAnalysis } from './types';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  const [profile, setProfile] = useState('');
  const [comparisonProfile, setComparisonProfile] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [chatAnalysis, setChatAnalysis] = useState<ChatAnalysis | null>(null);
  const [konamiActive, setKonamiActive] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState<string[]>([]);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [activeTab, setActiveTab] = useState('single');
  const [demoMode, setDemoMode] = useState(false);
  const [chatLog, setChatLog] = useState('');

  const runAnalysis = async () => {
    const steps = [...ANALYSIS_STEPS];
    if (konamiActive) {
      steps.push(
        { message: "Activating digital warfare mode", icon: null, color: "rgb(244,63,94)" },
        { message: "Loading extra savage responses", icon: null, color: "rgb(236,72,153)" }
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
          profileTypes: profileTypes.map(pt => ({
            name: pt.type,
            description: pt.summary,
            likelihood: pt.confidence,
            redFlags: [],
            greenFlags: [],
          })),
          translation: translation.map(t => `${t.said} → ${t.meant}`),
          personalityIndicators: personalityIndicators.map(trait => ({
            trait,
            description: trait,
            score: 1
          })),
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

  const handleChatAnalyze = useCallback(async () => {
    if (!chatLog.trim()) return;
    setIsAnalyzing(true);
    setChatAnalysis(null);
    setCurrentStep(0);
    try {
      await runAnalysis();
      const messages = chatLog.split(/\n+/).filter(Boolean).map(line => ({ text: line }));
      const analysis: ChatAnalysis = await analyzeChatHistory(messages);
      setChatAnalysis(analysis);
    } finally {
      setIsAnalyzing(false);
      setCurrentStep(-1);
    }
  }, [chatLog, runAnalysis]);

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
        <div className="flex items-center justify-between mb-4">
          <DemoModeToggle enabled={demoMode} onToggle={setDemoMode} />
          {results && (
            <ShareResults result={{
              overallScore: results.overallScore,
              redFlags: results.redFlags,
              greenFlags: results.greenFlags
            }} />
          )}
        </div>
        <div className="mb-6">
          <div className="flex gap-4">
            <button
              className={`px-4 py-2 rounded font-bold ${activeTab === 'single' ? 'bg-rose-600 text-white' : 'bg-gray-800 text-white/60'}`}
              onClick={() => setActiveTab('single')}
            >
              Profile
            </button>
            <button
              className={`px-4 py-2 rounded font-bold ${activeTab === 'compare' ? 'bg-rose-600 text-white' : 'bg-gray-800 text-white/60'}`}
              onClick={() => setActiveTab('compare')}
            >
              Compare
            </button>
            <button
              className={`px-4 py-2 rounded font-bold ${activeTab === 'chat' ? 'bg-rose-600 text-white' : 'bg-gray-800 text-white/60'}`}
              onClick={() => setActiveTab('chat')}
            >
              Chat Log
            </button>
          </div>
        </div>
        {activeTab === 'chat' ? (
          <div className="mb-8">
            <label htmlFor="chatLog" className="block text-sm font-medium text-white/80 mb-2">
              Paste your chat log (DMs, messages, etc):
            </label>
            <textarea
              id="chatLog"
              value={chatLog}
              onChange={e => setChatLog(e.target.value)}
              className="w-full h-32 bg-transparent border border-white/10 rounded-lg p-3 text-white/70 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all resize-none"
              placeholder="Paste chat log here for analysis..."
              disabled={isAnalyzing}
            />
            <button
              className="mt-4 px-6 py-3 rounded-lg font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all arcade-glow"
              onClick={handleChatAnalyze}
              disabled={!chatLog.trim() || isAnalyzing}
            >
              Analyze Chat Log
            </button>
            {chatAnalysis && (
              <div className="mt-8 glass rounded-xl p-8 text-white/90 shadow-[0_0_40px_0_rgba(255,0,92,0.25)] border border-rose-700/60 bg-gradient-to-br from-black/95 via-rose-900/60 to-black/90 backdrop-blur-2xl relative overflow-hidden group">
                <div className="absolute inset-0 pointer-events-none opacity-40" style={{background: 'radial-gradient(circle at 80% 20%, #ff005c55 0%, transparent 70%)'}} />
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500" />
                <h2 className="text-4xl font-black mb-8 tracking-tight text-rose-400 drop-shadow-xl flex items-center gap-4 uppercase">
                  <span className="inline-block w-2 h-10 bg-rose-500 rounded-full animate-pulse" />
                  Chat Dissection Report
                  <span className="inline-block w-2 h-10 bg-pink-500 rounded-full animate-pulse" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-pink-400">Interest:</span>
                      <span className="text-3xl font-mono text-white/90 tracking-tighter bg-black/30 px-3 py-1 rounded-lg shadow-inner border border-pink-700/30">{Math.round(chatAnalysis.insights.interest * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-pink-400">Engagement:</span>
                      <span className="text-3xl font-mono text-white/90 tracking-tighter bg-black/30 px-3 py-1 rounded-lg shadow-inner border border-pink-700/30">{Math.round(chatAnalysis.insights.engagement * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-pink-400">Chemistry:</span>
                      <span className="text-3xl font-mono text-white/90 tracking-tighter bg-black/30 px-3 py-1 rounded-lg shadow-inner border border-pink-700/30">{Math.round(chatAnalysis.insights.chemistry * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-pink-400">Relationship Potential:</span>
                      <span className="text-3xl font-mono text-white/90 tracking-tighter bg-black/30 px-3 py-1 rounded-lg shadow-inner border border-pink-700/30">{Math.round(chatAnalysis.insights.relationshipPotential)}%</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-rose-900/40 border border-rose-700/50 rounded-xl p-6 shadow-inner">
                      <span className="font-bold text-rose-400 text-lg">Red Flags</span>
                      <ul className="list-disc ml-6 mt-3 text-white/80 text-base">
                        {chatAnalysis.insights.redFlags.length ? chatAnalysis.insights.redFlags.map((flag: string, i: number) => (
                          <li key={i} className="mb-1">{flag}</li>
                        )) : <li>None detected. (For now.)</li>}
                      </ul>
                    </div>
                    <div className="bg-emerald-900/30 border border-emerald-700/40 rounded-xl p-6 shadow-inner">
                      <span className="font-bold text-emerald-400 text-lg">Green Flags</span>
                      <ul className="list-disc ml-6 mt-3 text-white/80 text-base">
                        {chatAnalysis.insights.greenFlags.length ? chatAnalysis.insights.greenFlags.map((flag: string, i: number) => (
                          <li key={i} className="mb-1">{flag}</li>
                        )) : <li>Nothing impressive. Try harder.</li>}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <div className="bg-white/10 border border-white/20 rounded-xl p-6">
                    <span className="font-bold text-white/80 text-lg">Intentions</span>
                    <div className="mt-3 text-white/90 text-base min-h-[2.5rem]">
                      {chatAnalysis.insights.intentions.length ? chatAnalysis.insights.intentions.join(', ') : 'Unclear. Probably just bored.'}
                    </div>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-xl p-6">
                    <span className="font-bold text-white/80 text-lg">Next Moves</span>
                    <ul className="list-disc ml-6 mt-3 text-white/90 text-base">
                      {chatAnalysis.insights.nextMoves.map((move: string, i: number) => (
                        <li key={i}>{move}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/10 border border-white/20 rounded-xl p-6">
                    <span className="font-bold text-white/80 text-lg">Recommendations</span>
                    <ul className="list-disc ml-6 mt-3 text-white/90 text-base">
                      {chatAnalysis.recommendations.map((rec: string, i: number) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="text-xs text-white/50 italic border-t border-white/10 pt-6 mt-8 tracking-wide">
                  This is a digital autopsy, not a love letter. If you want sugarcoating, go back to Tinder.<br/>
                  <span className="text-rose-400 font-bold">2025</span> • Brutal honesty, zero apologies.
                </div>
              </div>
            )}
          </div>
        ) : (
          <ProfileInput 
            profile={profile} 
            setProfile={setProfile}
            comparisonProfile={comparisonProfile}
            setComparisonProfile={setComparisonProfile}
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isDemoMode={demoMode}
          />
        )}
        {isAnalyzing && currentStep >= 0 && (
          <AnalysisProgress 
            currentStep={currentStep}
            onSkip={handleSkipAnalysis}
            isDemoMode={demoMode}
          />
        )}
        {results && activeTab === 'compare' && results.comparisons?.[0] ? (
          <ComparisonResults comparison={results.comparisons[0]} />
        ) : results && activeTab !== 'chat' && (
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