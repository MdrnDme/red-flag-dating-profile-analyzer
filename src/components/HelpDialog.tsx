import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, HelpCircle, Flag, Shield, Share2 } from 'lucide-react';

export const HelpDialog: React.FC = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="text-sm font-medium text-white/80 hover:text-white transition-colors flex items-center gap-1"
          aria-label="Help"
        >
          <HelpCircle className="w-4 h-4" />
          Help
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-[90vw] max-h-[85vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-6">
          <Dialog.Title className="text-xl font-semibold text-slate-800 mb-4">
            How Red Flag AI Works
          </Dialog.Title>
          
          <div className="space-y-6">
            <section>
              <h3 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-600" />
                What is Red Flag AI?
              </h3>
              <p className="text-slate-600 text-sm">
                Red Flag AI analyzes dating profiles using advanced pattern recognition to identify potential red flags, green flags, and provide insights into what people really mean in their profiles.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Is my data safe?
              </h3>
              <p className="text-slate-600 text-sm">
                Your privacy is our priority. We don't store any profile data - all analysis happens in real-time and is immediately discarded. No personal information is ever saved or shared.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                Can I analyze my own profile?
              </h3>
              <p className="text-slate-600 text-sm">
                Absolutely! Self-analysis can help you improve your profile and understand how others might perceive it. Just remember, our analysis is meant to be both helpful and entertaining.
              </p>
            </section>

            <section className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-medium text-slate-800 mb-2">Frequently Asked Questions</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-slate-700">How accurate is the analysis?</dt>
                  <dd className="text-slate-600">While our AI is sophisticated, it's designed to be both informative and entertaining. Use it as a helpful guide, not absolute truth.</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-700">What happens to my data?</dt>
                  <dd className="text-slate-600">Nothing is stored or saved. All analysis happens in your browser and is immediately discarded.</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-700">Can I save my results?</dt>
                  <dd className="text-slate-600">Yes! Use the share or copy buttons to save and share your results.</dd>
                </div>
              </dl>
            </section>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};