import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#212E20] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#3E513B] flex items-center gap-3 text-xs max-w-sm backdrop-blur-md">
        <div className="w-6 h-6 rounded-full bg-[#485E42] flex items-center justify-center shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#C4A962]" />
        </div>
        <p className="font-medium flex-1 text-stone-100">{toastMessage}</p>
      </div>
    </div>
  );
};
