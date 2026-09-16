/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlbumPhoto, CakeCategory } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CollectionsGrid } from './components/CollectionsGrid';
import { GooglePhotosGallery } from './components/GooglePhotosGallery';
import { OrderForm } from './components/OrderForm';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedPhotoForOrder, setSelectedPhotoForOrder] = useState<AlbumPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<CakeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  // When search or category is submitted from the Hero section (matching image.png)
  const handleHeroSearch = (query: string, category: CakeCategory) => {
    setSearchQuery(query);
    setActiveCategory(category);
    scrollToSection('gallery');
  };

  // When category card is clicked in CollectionsGrid
  const handleSelectCollectionCategory = (category: CakeCategory) => {
    setActiveCategory(category);
    setSearchQuery('');
    scrollToSection('gallery');
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
        {/* Hero Section matching image.png */}
        <Hero
          onSearchSubmit={handleHeroSearch}
          onExploreGallery={() => scrollToSection('gallery')}
        />

        {/* Collections Category Grid matching image.png CATEGORIES */}
        <CollectionsGrid
          onSelectCategory={handleSelectCollectionCategory}
          activeCategory={activeCategory}
        />

        {/* Live Google Photos Gallery */}
        <GooglePhotosGallery
          onSelectCakeForOrder={handleSelectCakeForOrder}
          selectedPhotoId={selectedPhotoForOrder?.id}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
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
