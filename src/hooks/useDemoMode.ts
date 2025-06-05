import { useState, useEffect, useCallback } from 'react';
import { EXAMPLE_PROFILES } from '../types';

export function useDemoMode() {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const [showPresenterNotes, setShowPresenterNotes] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [demoFeatures, setDemoFeatures] = useState({
    autoAnalyze: true,
    skipAnimations: true,
    showAllFeatures: true
  });

  const cycleProfile = useCallback(() => {
    setCurrentProfileIndex((prev) => (prev + 1) % EXAMPLE_PROFILES.length);
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (!isDemoMode) return;

    switch (e.key.toLowerCase()) {
      case 'd':
        cycleProfile();
        break;
      case 'p':
        setShowPresenterNotes(prev => !prev);
        break;
      case 'l':
        setIsLargeText(prev => !prev);
        break;
      case 'a':
        setIsAutoCycling(prev => !prev);
        break;
      case 'f':
        setDemoFeatures(prev => ({
          ...prev,
          showAllFeatures: !prev.showAllFeatures
        }));
        break;
    }
  }, [isDemoMode, cycleProfile]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDemoMode && isAutoCycling) {
      interval = setInterval(cycleProfile, 10000);
    }
    return () => clearInterval(interval);
  }, [isDemoMode, isAutoCycling, cycleProfile]);

  return {
    isDemoMode,
    setIsDemoMode,
    currentProfile: EXAMPLE_PROFILES[currentProfileIndex],
    isAutoCycling,
    showPresenterNotes,
    isLargeText,
    demoFeatures,
    cycleProfile
  };
}