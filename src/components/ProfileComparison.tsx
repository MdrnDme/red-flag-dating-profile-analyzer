import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Heart, X, Sparkles } from 'lucide-react';

interface ProfileComparisonProps {
  profileA: string;
  profileB: string;
  onCompare: () => void;
  isComparing: boolean;
}

export const ProfileComparison: React.FC<ProfileComparisonProps> = ({
  profileA,
  profileB,
  onCompare,
  isComparing
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-3">
        <Scale className="w-6 h-6 text-red-400" />
        Profile Battle Arena
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="glass p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white/80 mb-3">Profile A</h3>
          <textarea
            value={profileA}
            readOnly
            className="w-full h-32 bg-transparent border border-white/10 rounded-lg p-3 text-white/70"
          />
        </div>

        <div className="glass p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white/80 mb-3">Profile B</h3>
          <textarea
            value={profileB}
            readOnly
            className="w-full h-32 bg-transparent border border-white/10 rounded-lg p-3 text-white/70"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCompare}
          disabled={isComparing || !profileA || !profileB}
          className={`
            py-4 px-8 rounded-lg font-bold text-lg flex items-center gap-2
            ${!profileA || !profileB || isComparing
              ? 'bg-white/10 text-white/40 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all arcade-glow'
            }
          `}
        >
          {isComparing ? (
            <>
              <Sparkles className="w-6 h-6 animate-spin" />
              CALCULATING MATCH...
            </>
          ) : (
            <>
              <Heart className="w-6 h-6" />
              INITIATE BATTLE
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};