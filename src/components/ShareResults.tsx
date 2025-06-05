import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Share2, Copy, Facebook, Twitter, Link } from 'lucide-react';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';

interface ShareResultsProps {
  result: {
    overallScore: number;
    redFlags: string[];
    greenFlags: string[];
  };
}

export const ShareResults: React.FC<ShareResultsProps> = ({ result }) => {
  const [copied, setCopied] = React.useState(false);
  const [shareId] = React.useState(() => nanoid(10));
  
  const shareUrl = `${window.location.origin}/share/${shareId}`;
  const shareText = `I got a ${result.overallScore}/100 on my dating profile analysis! Check out your own profile at RedFlag AI`;
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 text-lg font-medium text-white/90 glass rounded-lg hover:bg-white/10 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          Share Analysis
        </motion.button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="glass rounded-lg p-4 w-72 shadow-xl"
          sideOffset={5}
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                className="flex items-center gap-3 w-full p-3 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5" />
                Share on Facebook
              </button>
              
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                className="flex items-center gap-3 w-full p-3 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5" />
                Share on Twitter
              </button>
              
              <button
                onClick={handleCopy}
                className="flex items-center gap-3 w-full p-3 text-white/90 hover:bg-white/10 rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <Link className="w-5 h-5 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </button>
            </div>

            <div className="text-sm text-white/60 text-center">
              Share your results and help others break the ice!
            </div>
          </div>

          <Popover.Arrow className="fill-white/10" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};