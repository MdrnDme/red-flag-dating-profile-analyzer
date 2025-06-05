import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard } from 'lucide-react';

interface ShortcutInfo {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  description: string;
}

interface KeyboardShortcutsProps {
  shortcuts: ShortcutInfo[];
  isVisible: boolean;
  onClose: () => void;
}

export const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  shortcuts,
  isVisible,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 glass rounded-xl p-4 shadow-2xl z-50 max-w-sm"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white/90 font-semibold flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              Keyboard Shortcuts
            </h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white/90 transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            {shortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-white/60">{shortcut.description}</span>
                <div className="flex items-center gap-1">
                  {shortcut.ctrl && (
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/90 font-mono text-xs">
                      Ctrl
                    </kbd>
                  )}
                  {shortcut.alt && (
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/90 font-mono text-xs">
                      Alt
                    </kbd>
                  )}
                  {shortcut.shift && (
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/90 font-mono text-xs">
                      Shift
                    </kbd>
                  )}
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/90 font-mono text-xs">
                    {shortcut.key.toUpperCase()}
                  </kbd>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};