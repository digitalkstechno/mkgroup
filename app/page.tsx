'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MobileFrame } from '@/components/MobileFrame';
import { 
  HomeView, 
  DashboardView, 
  AboutUsView, 
  AppointmentView, 
  PhotoGalleryView, 
  PopupView,
  ContactPersonView,
  LocationView,
  VideoGalleryView,
  BrochureView,
  InquiryView,
  DropboxView
} from '@/components/Views';

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

export default function MKGroupApp() {
  const [view, setView] = useState<View>('home');

  const renderView = () => {
    switch (view) {
      case 'home': return <HomeView setView={setView} />;
      case 'dashboard': return <DashboardView setView={setView} />;
      case 'contact-person': return <ContactPersonView />;
      case 'about-us': return <AboutUsView />;
      case 'appointment': return <AppointmentView />;
      case 'location': return <LocationView />;
      case 'photo-gallery': return <PhotoGalleryView />;
      case 'video-gallery': return <VideoGalleryView />;
      case 'brochure': return <BrochureView />;
      case 'inquiry': return <InquiryView />;
      case 'dropbox': return <DropboxView />;
      case 'popup': return <PopupView />;
      default: return <HomeView setView={setView} />;
    }
  };

  return (
    <MobileFrame currentView={view} setView={setView}>
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </MobileFrame>
  );
}
