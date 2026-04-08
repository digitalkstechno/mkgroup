'use client';

import React from 'react';
import { Home, Box, Share2, ChevronLeft, Wifi, Battery, Signal } from 'lucide-react';

type View =
  | 'home'
  | 'dashboard'
  | 'contact-person'
  | 'about-us'
  | 'appointment'
  | 'location'
  | 'photo-gallery'
  | 'video-gallery'
  | 'brochure'
  | 'inquiry'
  | 'dropbox'
  | 'popup';

interface MobileFrameProps {
  children: React.ReactNode;
  currentView: View;
  setView: (v: View) => void;
}

const VIEW_LABELS: Record<string, string> = {
  'contact-person': 'Contact Person',
  'about-us': 'About Us',
  'appointment': 'Appointment',
  'location': 'Location',
  'photo-gallery': 'Photo Gallery',
  'video-gallery': 'Video Gallery',
  'brochure': 'Brochure',
  'inquiry': 'Inquiry',
  'dropbox': 'Dropbox',
  'popup': 'Popup',
};

export const MobileFrame = ({ children, currentView, setView }: MobileFrameProps) => {
  const isHome = currentView === 'home';
  const isDashboard = currentView === 'dashboard';
  const isSubView = !isHome && !isDashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-50 to-slate-300 flex items-center justify-center p-6 font-sans">
      {/* Phone Shell */}
      <div className="relative w-full max-w-[390px] bg-[#1a1a2e] rounded-[52px] shadow-[0_40px_80px_rgba(0,0,0,0.4)] p-[10px]">
        {/* Screen */}
        <div className="relative bg-[#e8f0f7] rounded-[44px] overflow-hidden flex flex-col" style={{ height: '820px' }}>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-1 bg-[#003B46] text-white text-[11px] font-medium flex-shrink-0">
            <span>9:41</span>
            <div className="w-24 h-5 bg-[#003B46] rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2 z-10" />
            <div className="flex items-center gap-1.5">
              <Signal size={12} />
              <Wifi size={12} />
              <Battery size={12} />
            </div>
          </div>

          {/* Header */}
          {isSubView && (
            <div className="flex items-center gap-3 px-4 py-3 bg-[#003B46] text-white flex-shrink-0">
              <button
                onClick={() => setView('dashboard')}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-semibold text-sm tracking-wide">{VIEW_LABELS[currentView] ?? currentView}</span>
            </div>
          )}

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {children}
          </div>

          {/* Bottom Nav — Dashboard */}
          {isDashboard && (
            <div className="flex-shrink-0 bg-[#003B46] border-t border-white/10">
              <div className="flex items-center justify-around py-2">
                {[
                  { icon: Home, label: 'Home', action: () => setView('home') },
                  { icon: Box, label: 'Dropbox', action: () => setView('dropbox') },
                  { icon: Share2, label: 'Share', action: () => {} },
                ].map(({ icon: Icon, label, action }) => (
                  <button key={label} onClick={action} className="flex flex-col items-center gap-0.5 py-1 px-4 text-white/70 hover:text-white transition-colors">
                    <Icon size={20} />
                    <span className="text-[10px]">{label}</span>
                  </button>
                ))}
              </div>
              <div className="flex justify-center pb-2">
                <div className="w-28 h-1 bg-white/30 rounded-full" />
              </div>
            </div>
          )}

          {/* Home Indicator */}
          {(isHome) && (
            <div className="flex-shrink-0 flex justify-center py-3 bg-transparent">
              <div className="w-28 h-1 bg-gray-400/50 rounded-full" />
            </div>
          )}
        </div>

        {/* Side Buttons */}
        <div className="absolute right-[-4px] top-24 w-1 h-12 bg-[#2a2a3e] rounded-r-sm" />
        <div className="absolute left-[-4px] top-20 w-1 h-8 bg-[#2a2a3e] rounded-l-sm" />
        <div className="absolute left-[-4px] top-32 w-1 h-12 bg-[#2a2a3e] rounded-l-sm" />
        <div className="absolute left-[-4px] top-48 w-1 h-12 bg-[#2a2a3e] rounded-l-sm" />
      </div>
    </div>
  );
};
