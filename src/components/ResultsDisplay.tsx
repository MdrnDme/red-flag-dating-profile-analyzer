import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import { AnalysisResult } from '../types';
import { FlagIcon, ClipboardCopy, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { ResultSection } from './ResultSection';
import { ShareResults } from './ShareResults';

interface ResultsDisplayProps {
  results: AnalysisResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const resultsRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = results.overallScore / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= results.overallScore) {
        setScore(results.overallScore);
        clearInterval(timer);
      } else {
        setScore(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [results.overallScore]);

  return (
    <motion.div
      ref={resultsRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass rounded-xl p-8 mb-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white/90 flex items-center gap-3">
          <FlagIcon className="h-8 w-8 text-red-400" />
          Analysis Results
        </h2>
        <div className="flex gap-4">
          <ShareResults result={results} />
          <button
            onClick={() => copyResults()}
            className="flex items-center gap-2 text-base font-medium text-white/60 hover:text-red-400 transition-colors"
            aria-label={copied ? "Copied to clipboard" : "Copy results"}
          >
            {copied ? (
              <>
                <CheckCircle className="h-5 w-5" />
                Copied
              </>
            ) : (
              <>
                <ClipboardCopy className="h-5 w-5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      <Tabs.Root defaultValue="translation" className="mb-8">
        <Tabs.List className="flex gap-4 border-b border-white/10 mb-6">
          <Tabs.Trigger
            value="translation"
            className="px-6 py-3 text-lg font-medium text-white/60 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-white transition-colors"
          >
            Decoded Intel
          </Tabs.Trigger>
          <Tabs.Trigger
            value="generations"
            className="px-6 py-3 text-lg font-medium text-white/60 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-white transition-colors"
          >
            Generational Warfare
          </Tabs.Trigger>
          <Tabs.Trigger
            value="verdict"
            className="px-6 py-3 text-lg font-medium text-white/60 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:text-white transition-colors"
          >
            Final Verdict
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="translation" className="focus:outline-none">
          {results.translation && results.translation.length > 0 && (
            <div className="space-y-4">
              {results.translation.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="p-6 glass rounded-lg"
                >
                  <div className="text-lg">
                    <div className="font-bold text-white/90 mb-2">"{item.said}"</div>
                    <div className="flex items-center gap-3 text-white/80">
                      <span className="text-2xl text-red-400">→</span>
                      <span className="font-medium">"{item.meant}"</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Tabs.Content>

        <Tabs.Content value="generations" className="focus:outline-none">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 glass rounded-lg"
            >
              <h4 className="text-2xl font-bold text-white/90 mb-3 flex items-center gap-3">
                <span className="text-3xl">👻</span>
                Gen Z Take
              </h4>
              <p className="text-lg text-white/80 font-medium">
                {results.generationalTakes?.genZ}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 glass rounded-lg"
            >
              <h4 className="text-2xl font-bold text-white/90 mb-3 flex items-center gap-3">
                <span className="text-3xl">✨</span>
                Millennial Perspective
              </h4>
              <p className="text-lg text-white/80 font-medium">
                {results.generationalTakes?.millennial}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 glass rounded-lg"
            >
              <h4 className="text-2xl font-bold text-white/90 mb-3 flex items-center gap-3">
                <span className="text-3xl">🎸</span>
                Gen X Reality Check
              </h4>
              <p className="text-lg text-white/80 font-medium">
                {results.generationalTakes?.genX}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 glass rounded-lg"
            >
              <h4 className="text-2xl font-bold text-white/90 mb-3 flex items-center gap-3">
                <span className="text-3xl">👴</span>
                Boomer Wisdom
              </h4>
              <p className="text-lg text-white/80 font-medium">
                {results.generationalTakes?.boomer}
              </p>
            </motion.div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="verdict" className="focus:outline-none">
          <div className="space-y-8">
            <ResultSection 
              title="Red Flags" 
              items={results.redFlags} 
              icon={<AlertTriangle className="h-6 w-6 text-red-400" />} 
              color="bg-red-500/10"
              textColor="text-white/90"
            />
            
            <ResultSection 
              title="Green Flags" 
              items={results.greenFlags} 
              icon={<CheckCircle className="h-6 w-6 text-emerald-400" />} 
              color="bg-emerald-500/10"
              textColor="text-white/90"
            />
            
            <ResultSection 
              title="Neutral Observations" 
              items={results.neutralObservations} 
              icon={<Info className="h-6 w-6 text-white/60" />} 
              color="bg-white/5"
              textColor="text-white/80"
            />
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </motion.div>
  );
};