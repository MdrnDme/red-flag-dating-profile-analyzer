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
            How the Digital Autopsy Works
          </Dialog.Title>
          
          <div className="space-y-6">
            <section>
              <h3 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-600" />
                What the hell is this thing?
              </h3>
              <p className="text-slate-600 text-sm">
                A psychological warfare toolkit that cuts through dating profile bullshit using pattern recognition to expose red flags, spot authentic green flags, and decode what people actually mean when they write "looking for adventure."
              </p>
            </section>

            <section>
              <h3 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                You tracking my shit?
              </h3>
              <p className="text-slate-600 text-sm">
                Nope. We're not data vampires. Everything happens client-side and gets torched immediately. No storage, no sharing, no digital breadcrumbs. Your dirty laundry stays yours.
              </p>
            </section>

            <section>
              <h3 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                Can I run my own profile?
              </h3>
              <p className="text-slate-600 text-sm">
                Hell yes. Self-awareness is the first step to not being a walking red flag yourself. Just remember - this is digital entertainment with a side of brutal honesty.
              </p>
            </section>

            <section className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-medium text-slate-800 mb-2">Frequently Asked Questions</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-medium text-slate-700">How accurate is this digital voodoo?</dt>
                  <dd className="text-slate-600">It's AI with attitude, not gospel truth. Use it for entertainment and insight, not life decisions. Think of it as your cynical friend with pattern recognition superpowers.</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-700">You hoarding my intel?</dt>
                  <dd className="text-slate-600">Nah. Everything gets nuked after analysis. We're not building a database of your dating disasters.</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-700">Can I keep the brutal truth?</dt>
                  <dd className="text-slate-600">Copy, screenshot, share the carnage. Your trauma, your choice.</dd>
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