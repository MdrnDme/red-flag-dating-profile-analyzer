import React from 'react';
import { HelpDialog } from './HelpDialog';
import { Flag } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  return (
    <header className="glass sticky top-0 z-50 py-6">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-6 mb-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-pink-500/30 blur-xl rounded-full animate-pulse" />
              <Flag 
                className="w-8 h-8 text-red-500 transform-gpu animate-[wave_2s_ease-in-out_infinite] relative z-10 group-hover:text-pink-500 transition-colors duration-300" 
                style={{ transformOrigin: 'bottom' }}
              />
              <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-gridScroll" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-2">
              <span className="gradient-text arcade-glow relative">
                RED FLAG
                <div className="absolute -inset-1 bg-red-500/20 blur-lg -z-10 animate-pulse" />
              </span>
              <span className="text-white/90 love-dream">AI</span>
            </h1>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-red-500/30 blur-xl rounded-full animate-pulse" />
              <Flag 
                className="w-8 h-8 text-red-500 transform-gpu animate-[wave_2s_ease-in-out_infinite] relative z-10 group-hover:text-pink-500 transition-colors duration-300" 
                style={{ transformOrigin: 'bottom', animationDelay: '0.5s' }}
              />
              <div className="absolute inset-0 bg-grid-pattern opacity-20 animate-gridScroll" />
            </div>
          </div>
          
          <p className="text-lg md:text-xl text-white/60 font-medium tracking-wide relative">
            Digital Dating Necropsy
            <motion.div 
              className="absolute -inset-2 bg-gradient-to-r from-red-500/5 via-pink-500/5 to-purple-500/5 rounded-lg -z-10"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </p>
          
          <div className="absolute right-6 top-1/2 -translate-y-1/2">
            <HelpDialog />
          </div>
        </div>
      </div>
    </header>
  );
};