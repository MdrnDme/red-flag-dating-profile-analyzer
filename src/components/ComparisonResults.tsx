import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, Heart, X, Sparkles, ArrowRight, Zap, Target } from 'lucide-react';
import { ProfileComparison } from '../types';

interface ComparisonResultsProps {
  comparison: ProfileComparison;
}

export const ComparisonResults: React.FC<ComparisonResultsProps> = ({ comparison }) => {
  const { profiles, compatibilityMatrix, commonInterests, differences, recommendations, tieBreakers } = comparison;

  const isTie = Math.abs(profiles[0].score - profiles[1].score) < 1;
  const winner = profiles[0].score > profiles[1].score ? profiles[0] : profiles[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 mb-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-pink-500/5 to-rose-500/5 animate-pulse" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-white/90 flex items-center gap-3">
            <Scale className="w-8 h-8 text-rose-400" />
            Battle Results
          </h2>
          <motion.div
            className="px-4 py-2 glass rounded-lg text-white/90 font-bold flex items-center gap-2"
            animate={{ 
              scale: [1, 1.05, 1],
              backgroundColor: ['rgba(244,63,94,0.1)', 'rgba(236,72,153,0.1)', 'rgba(244,63,94,0.1)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-rose-400" />
            {isTie ? "It's a Match!" : "Winner Declared!"}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`glass p-6 rounded-xl relative overflow-hidden ${
                !isTie && profile.id === winner.id ? 'border-2 border-rose-500' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-pink-500/5 to-rose-500/5 animate-pulse" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white/90">Profile {index + 1}</h3>
                  <motion.div
                    className="text-3xl font-black gradient-text"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {profile.score}%
                  </motion.div>
                </div>

                <div className="h-32 glass rounded-lg p-4 mb-4 overflow-y-auto">
                  <p className="text-white/70 whitespace-pre-wrap">{profile.text}</p>
                </div>

                {!isTie && profile.id === winner.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center"
                  >
                    <Crown className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {isTie && tieBreakers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-400" />
              Tie-Breaking Factors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass p-4 rounded-lg">
                <div className="text-sm text-white/60 mb-2">Interest Depth</div>
                <div className="text-2xl font-bold gradient-text">{tieBreakers.interestDepth}%</div>
              </div>
              <div className="glass p-4 rounded-lg">
                <div className="text-sm text-white/60 mb-2">Value Alignment</div>
                <div className="text-2xl font-bold gradient-text">{tieBreakers.valueStrength}%</div>
              </div>
              <div className="glass p-4 rounded-lg">
                <div className="text-sm text-white/60 mb-2">Unique Traits</div>
                <div className="text-2xl font-bold gradient-text">{tieBreakers.uniqueTraits}%</div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-400" />
              Common Ground
            </h3>
            <ul className="space-y-2">
              {commonInterests.map((interest, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-white/70"
                >
                  <span className="text-rose-400">•</span>
                  {interest}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-rose-400" />
              Key Differences
            </h3>
            <ul className="space-y-2">
              {differences.map((difference, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-white/70"
                >
                  <span className="text-rose-400">•</span>
                  {difference}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-rose-400" />
              Recommendations
            </h3>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-white/70"
                >
                  <span className="text-rose-400">•</span>
                  {recommendation}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};