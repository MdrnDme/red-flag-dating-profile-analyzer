import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Lock, Check } from 'lucide-react';
import { PREMIUM_FEATURES, PremiumFeature } from '../types';
import * as Dialog from '@radix-ui/react-dialog';

interface PremiumFeaturesProps {
  onUpgrade: (feature: PremiumFeature) => void;
}

export const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ onUpgrade }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PREMIUM_FEATURES.map((feature) => (
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-pink-500/5 to-rose-500/5 animate-pulse" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <h3 className="text-xl font-bold text-white/90">{feature.name}</h3>
              </div>
              {feature.enabled ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : (
                <Lock className="w-5 h-5 text-rose-400" />
              )}
            </div>

            <p className="text-white/70 mb-4">{feature.description}</p>

            <ul className="space-y-2 mb-6">
              {feature.benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-white/60"
                >
                  <Crown className="w-4 h-4 text-rose-400" />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onUpgrade(feature)}
              className="w-full py-3 rounded-lg font-bold text-lg bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all arcade-glow flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5" />
              ${feature.price}/mo
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};