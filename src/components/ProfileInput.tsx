import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Shuffle, Search, Settings, Sparkles, Scale, Lock } from 'lucide-react';
import { EXAMPLE_PROFILES, MAX_PROFILE_CHARS } from '../types';
import Filter from 'bad-words';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';

const filter = new Filter();

const DATING_PLATFORMS = [
  { value: 'match', label: 'Match.com' },
  { value: 'bumble', label: 'Bumble' },
  { value: 'hinge', label: 'Hinge' },
  { value: 'grindr', label: 'Grindr' },
  { value: 'okcupid', label: 'OkCupid' },
  { value: 'tinder', label: 'Tinder' },
  { value: 'coffee', label: 'Coffee Meets Bagel' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'feeld', label: 'Feeld' },
  { value: 'inner', label: 'Inner Circle' },
  { value: 'raya', label: 'Raya' },
  { value: 'jdate', label: 'JDate' },
  { value: 'christianmingle', label: 'Christian Mingle' },
  { value: 'muslima', label: 'Muslima' },
  { value: 'farmersonly', label: 'Farmers Only' },
  { value: 'elitesingles', label: 'Elite Singles' },
  { value: 'seeking', label: 'Seeking' },
  { value: 'her', label: 'HER' },
  { value: 'scruff', label: 'SCRUFF' },
  { value: 'taimi', label: 'Taimi' },
  { value: 'other', label: 'Other' }
];

const AI_MODELS = [
  { value: 'claude4-vision', label: 'Claude 4 Vision (Profile Pics + Text)' },
  { value: 'claude4', label: 'Claude 4 (Research & Analysis)' },
  { value: 'claude3.7', label: 'Claude 3.7 (Fast & Accurate)' },
  { value: 'gpt5', label: 'GPT-5 (Latest & Greatest)' },
  { value: 'gpt4-turbo', label: 'GPT-4 Turbo (Balanced)' },
  { value: 'palm3', label: 'PaLM 3 (Google AI)' },
  { value: 'meta-llama3', label: 'Llama 3 (Meta AI)' },
  { value: 'mixtral', label: 'Mixtral 8x7B (Open Source)' },
  { value: 'yi-34b', label: 'Yi-34B (Open Source)' },
  { value: 'gpt35-turbo', label: 'GPT-3.5 Turbo (Economy)' }
];

interface PremiumFeature {
  name: string;
  description: string;
  price: number;
  affiliateUrl: string;
}

const PREMIUM_FEATURES: PremiumFeature[] = [
  {
    name: "Deep Dive Mode",
    description: "Multi-model psychological warfare analysis",
    price: 9.99,
    affiliateUrl: "https://example.com/elite-analysis"
  },
  {
    name: "Visual Intel",
    description: "Read their photos like a NSA operative",
    price: 14.99,
    affiliateUrl: "https://example.com/photo-analysis"
  },
  {
    name: "Match/Disaster Index",
    description: "Compatibility scoring for the brave",
    price: 19.99,
    affiliateUrl: "https://example.com/compatibility"
  }
];

interface ProfileInputProps {
  profile: string;
  setProfile: (profile: string) => void;
  comparisonProfile: string;
  setComparisonProfile: (profile: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDemoMode?: boolean;
}

export const ProfileInput: React.FC<ProfileInputProps> = ({ 
  profile, 
  setProfile,
  comparisonProfile,
  setComparisonProfile,
  onAnalyze, 
  isAnalyzing,
  activeTab,
  setActiveTab,
  isDemoMode = false
}) => {
  const [charCount, setCharCount] = useState(0);
  const [compareCharCount, setCompareCharCount] = useState(0);
  const [draftTimeout, setDraftTimeout] = useState<NodeJS.Timeout>();
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedModel, setSelectedModel] = useState('claude4-vision');
  const [showSettings, setShowSettings] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<PremiumFeature | null>(null);

  useEffect(() => {
    setCharCount(profile.length);
    setCompareCharCount(comparisonProfile.length);
    
    if (draftTimeout) clearTimeout(draftTimeout);
    const timeout = setTimeout(() => {
      localStorage.setItem('profileDraft', profile);
    }, 1000);
    setDraftTimeout(timeout);

    if (profile.length > 0) {
      if (profile.length < 10) {
        // setError('Minimum 10 characters required for analysis'); // unused
      } else if (profile.length > MAX_PROFILE_CHARS) {
        // setError(`Maximum ${MAX_PROFILE_CHARS} characters exceeded`); // unused
      } else {
        // setError('');
      }
    } else {
      // setError('');
    }

    try {
      filter.isProfane(profile); // just call for side effect if needed
    } catch (e) {
      console.error('Profanity filter error:', e);
    }

    return () => {
      if (draftTimeout) clearTimeout(draftTimeout);
    };
  }, [profile, comparisonProfile]);

  const loadRandomExample = () => {
    const randomIndex = Math.floor(Math.random() * EXAMPLE_PROFILES.length);
    if (activeTab === 'compare') {
      let secondIndex = (randomIndex + 1) % EXAMPLE_PROFILES.length;
      setProfile(EXAMPLE_PROFILES[randomIndex].text);
      setComparisonProfile(EXAMPLE_PROFILES[secondIndex].text);
    } else {
      setProfile(EXAMPLE_PROFILES[randomIndex].text);
    }
  };

  const handlePremiumFeature = (feature: PremiumFeature) => {
    setSelectedFeature(feature);
    setShowPremiumDialog(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white/90">Profile Intel</h2>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSettings(!showSettings)}
            className="text-base font-medium text-white/60 hover:text-red-400 transition-colors flex items-center gap-2"
          >
            <Settings className="w-5 h-5" />
            Settings
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadRandomExample}
            className="text-base font-medium text-white/60 hover:text-red-400 transition-colors flex items-center gap-2"
          >
            <Shuffle className="w-5 h-5" />
            Random
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 space-y-4 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PREMIUM_FEATURES.map((feature) => (
                <motion.div
                  key={feature.name}
                  whileHover={{ scale: 1.02 }}
                  className="glass p-4 rounded-lg relative overflow-hidden cursor-pointer"
                  onClick={() => handlePremiumFeature(feature)}
                >
                  <div className="absolute top-2 right-2">
                    <Lock className="w-4 h-4 text-rose-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white/90 mb-2">{feature.name}</h3>
                  <p className="text-sm text-white/60 mb-4">{feature.description}</p>
                  <div className="text-xl font-bold gradient-text">${feature.price}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Platform
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full p-3 glass rounded-lg text-white/90 border-white/10 focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50"
                >
                  <option value="">Select Platform</option>
                  {DATING_PLATFORMS.map(platform => (
                    <option key={platform.value} value={platform.value}>{platform.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  AI Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-3 glass rounded-lg text-white/90 border-white/10 focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50"
                >
                  {AI_MODELS.map(model => (
                    <option key={model.value} value={model.value}>{model.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <Tabs.List className="flex gap-4 mb-6">
          <Tabs.Trigger
            value="single"
            className="px-4 py-2 text-base font-medium text-white/60 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-white transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Single Profile
          </Tabs.Trigger>
          <Tabs.Trigger
            value="compare"
            className="px-4 py-2 text-base font-medium text-white/60 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-white transition-colors flex items-center gap-2"
          >
            <Scale className="w-4 h-4" />
            Compare Profiles
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="single">
          <div className="mb-4">
            <label htmlFor="profile" className="block text-sm font-medium text-white/80 mb-2">
              Drop the Dating Mask
            </label>
            <div className="relative">
              <textarea
                id="profile"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
                placeholder="Paste their dating profile bullshit here..."
                className="w-full h-32 bg-transparent border border-white/10 rounded-lg p-3 text-white/70 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all resize-none"
                disabled={isAnalyzing}
                maxLength={MAX_PROFILE_CHARS}
              />
              <div className="absolute bottom-3 right-3 text-sm font-medium text-white/40">
                {charCount}/{MAX_PROFILE_CHARS}
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="compare">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="profileA" className="block text-sm font-medium text-white/80 mb-2">
                Target A
              </label>
              <div className="relative">
                <textarea
                  id="profileA"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  placeholder="First victim..."
                  className="w-full h-32 bg-transparent border border-white/10 rounded-lg p-3 text-white/70 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all resize-none"
                  disabled={isAnalyzing}
                  maxLength={MAX_PROFILE_CHARS}
                />
                <div className="absolute bottom-3 right-3 text-sm font-medium text-white/40">
                  {charCount}/{MAX_PROFILE_CHARS}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="profileB" className="block text-sm font-medium text-white/80 mb-2">
                Target B
              </label>
              <div className="relative">
                <textarea
                  id="profileB"
                  value={comparisonProfile}
                  onChange={(e) => setComparisonProfile(e.target.value)}
                  placeholder="Second victim..."
                  className="w-full h-32 bg-transparent border border-white/10 rounded-lg p-3 text-white/70 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all resize-none"
                  disabled={isAnalyzing}
                  maxLength={MAX_PROFILE_CHARS}
                />
                <div className="absolute bottom-3 right-3 text-sm font-medium text-white/40">
                  {compareCharCount}/{MAX_PROFILE_CHARS}
                </div>
              </div>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAnalyze}
        disabled={!profile.trim() || isAnalyzing || (activeTab === 'compare' && !comparisonProfile.trim())}
        className={`
          w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2
          ${!profile.trim() || isAnalyzing || (activeTab === 'compare' && !comparisonProfile.trim())
            ? 'bg-white/10 text-white/40 cursor-not-allowed' 
            : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all arcade-glow'}
        `}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            {activeTab === 'compare' ? 'RUNNING PSYCH EVAL...' : 'DECODING BULLSHIT...'}
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6" />
            {activeTab === 'compare' ? 'BATTLE ROYALE' : 'DECODE PROFILE'}
          </>
        )}
      </motion.button>

      {!isDemoMode && (
        <p className="mt-4 text-sm text-white/40 text-center font-medium">
          Hit <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-sm">Ctrl</kbd> + <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-sm">Enter</kbd> to hack the matrix
        </p>
      )}

      <Dialog.Root open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-[90vw] glass rounded-xl p-6">
            {selectedFeature && (
              <>
                <Dialog.Title className="text-2xl font-bold text-white/90 mb-4">
                  Unlock {selectedFeature.name}
                </Dialog.Title>
                <div className="mb-6">
                  <p className="text-white/70 mb-4">{selectedFeature.description}</p>
                  <div className="text-3xl font-black gradient-text mb-6">
                    ${selectedFeature.price}
                  </div>
                  <motion.a
                    href={selectedFeature.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full py-3 rounded-lg font-bold text-lg text-center bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all arcade-glow"
                  >
                    Unlock Now
                  </motion.a>
                </div>
                <Dialog.Close className="absolute top-4 right-4 text-white/60 hover:text-white/90">
                  ✕
                </Dialog.Close>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </motion.div>
  );
};