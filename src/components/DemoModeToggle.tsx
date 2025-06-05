import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import { Presentation, Info } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface DemoModeToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const DemoModeToggle: React.FC<DemoModeToggleProps> = ({ enabled, onToggle }) => {
  return (
    <Tooltip.Provider>
      <div className="flex items-center gap-2">
        <Presentation className="w-4 h-4 text-white/80" />
        <label className="text-sm text-white/80 select-none\" htmlFor="demo-mode">
          Demo Mode
        </label>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button className="text-white/60 hover:text-white/90 transition-colors">
              <Info className="w-4 h-4" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="glass rounded-lg p-3 text-sm max-w-xs text-white/80 shadow-xl"
              sideOffset={5}
            >
              <p>Demo mode enables:</p>
              <ul className="mt-2 space-y-1 text-white/60">
                <li>• Auto-cycling profiles</li>
                <li>• Quick analysis</li>
                <li>• Presenter notes</li>
                <li>• Special keyboard shortcuts</li>
              </ul>
              <Tooltip.Arrow className="fill-white/10" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <Switch.Root
          id="demo-mode"
          checked={enabled}
          onCheckedChange={onToggle}
          className={`w-9 h-5 rounded-full transition-colors ${
            enabled ? 'bg-white/30' : 'bg-white/10'
          }`}
        >
          <Switch.Thumb
            className={`block w-4 h-4 bg-white rounded-full transition-transform ${
              enabled ? 'translate-x-[18px]' : 'translate-x-0.5'
            }`}
          />
        </Switch.Root>
      </div>
    </Tooltip.Provider>
  );
};