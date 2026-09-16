/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlbumPhoto } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GooglePhotosGallery } from './components/GooglePhotosGallery';
import { OrderForm } from './components/OrderForm';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedPhotoForOrder, setSelectedPhotoForOrder] = useState<AlbumPhoto | null>(null);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When a user selects a cake photo from the gallery or lightbox to order
  const handleSelectCakeForOrder = (photo: AlbumPhoto) => {
    setSelectedPhotoForOrder(photo);
    scrollToSection('order');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C1810]">
      {/* Navigation Header */}
      <Navbar
        onNavigate={scrollToSection}
        photoCount={37}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreGallery={() => scrollToSection('gallery')}
        />

        {/* Live Google Photos Gallery - Clean Photography Showcase */}
        <GooglePhotosGallery
          onSelectCakeForOrder={handleSelectCakeForOrder}
          selectedPhotoId={selectedPhotoForOrder?.id}
        />

        {/* Streamlined Order & WhatsApp Inquiry Form */}
        <OrderForm
          selectedPhoto={selectedPhotoForOrder}
          onClearSelectedPhoto={() => setSelectedPhotoForOrder(null)}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Direct Floating WhatsApp Contact Button */}
      <WhatsAppButton onOpenOrderForm={() => scrollToSection('order')} />
    </div>
  );
}
