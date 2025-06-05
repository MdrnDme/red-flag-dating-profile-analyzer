import React from 'react';
import { ANALYSIS_STEPS } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisProgressProps {
  currentStep: number;
  onSkip: () => void;
  isDemoMode: boolean;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ currentStep, onSkip, isDemoMode }) => {
  const progress = ((currentStep + 1) / ANALYSIS_STEPS.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass rounded-xl p-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-rose-500/10 animate-pulse" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <motion.div 
            className="flex items-center gap-4"
            animate={{ 
              scale: [1, 1.02, 1],
              color: ['rgb(255,255,255)', 'rgb(244,63,94)', 'rgb(255,255,255)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Removed icon, just a cyberpunk bar */}
            <motion.div
              className="w-12 h-2 rounded bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 shadow-lg"
              animate={{ 
                scaleX: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <h2 className="text-2xl font-black text-white/90">
              {ANALYSIS_STEPS[currentStep]?.message || 'Analyzing Profile'}
            </h2>
          </motion.div>
          <button
            onClick={onSkip}
            className="text-base font-bold text-white/60 hover:text-rose-400 transition-colors"
          >
            SKIP
          </button>
        </div>

        <div className="relative h-24 mb-6">
          <motion.div
            className="absolute inset-0 glass rounded-xl overflow-hidden"
            animate={{ 
              backgroundColor: ANALYSIS_STEPS[currentStep]?.color || 'rgba(244,63,94,0.1)'
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-grid-pattern opacity-20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>

        <div className="relative">
          <div className="h-4 bg-gray-800/50 rounded-full overflow-hidden border border-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 relative"
              initial={{ width: 0, backgroundPosition: '0% 50%' }}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                width: { duration: 0.3, ease: "easeOut" },
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-grid-pattern opacity-30"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          <motion.div
            className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-sm font-bold"
            animate={{ 
              scale: [1, 1.2, 1],
              backgroundColor: ['rgb(244,63,94)', 'rgb(236,72,153)', 'rgb(244,63,94)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.div>
        </div>

        {!isDemoMode && (
          <motion.p 
            className="mt-4 text-sm font-bold text-white/40 text-center tracking-wide"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Press <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-sm">Space</kbd> to skip
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};