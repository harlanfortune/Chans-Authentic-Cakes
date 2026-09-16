import React from 'react';
import { CakeCategory, CollectionCategory } from '../types';
import { INITIAL_ALBUM_PHOTOS } from '../data/albumPhotos';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CollectionsGridProps {
  onSelectCategory: (category: CakeCategory) => void;
  activeCategory: CakeCategory;
}

// Curated collections mapped to real high-res images from the Google Photos album
const COLLECTIONS: CollectionCategory[] = [
  {
    id: 'c1',
    title: 'WEDDING & TIERED',
    categoryKey: 'wedding',
    imageUrl: INITIAL_ALBUM_PHOTOS[1]?.thumbnailUrl || INITIAL_ALBUM_PHOTOS[0]?.thumbnailUrl,
    description: 'Majestic multi-tier centerpieces with floral & royal details',
    count: 8
  },
  {
    id: 'c2',
    title: 'BIRTHDAY CELEBRATIONS',
    categoryKey: 'birthday',
    imageUrl: INITIAL_ALBUM_PHOTOS[4]?.thumbnailUrl || INITIAL_ALBUM_PHOTOS[2]?.thumbnailUrl,
    description: 'Festive custom designs tailored for unforgettable milestones',
    count: 12
  },
  {
    id: 'c3',
    title: 'THEMED & NOVELTY',
    categoryKey: 'novelty',
    imageUrl: INITIAL_ALBUM_PHOTOS[7]?.thumbnailUrl || INITIAL_ALBUM_PHOTOS[3]?.thumbnailUrl,
    description: 'Sculptural character & fantasy novelty showstoppers',
    count: 6
  },
  {
    id: 'c4',
    title: 'CHOCOLATE & DRIP',
    categoryKey: 'chocolate',
    imageUrl: INITIAL_ALBUM_PHOTOS[5]?.thumbnailUrl || INITIAL_ALBUM_PHOTOS[1]?.thumbnailUrl,
    description: 'Belgian ganache drips, artisan shards & cocoa indulgence',
    count: 7
  },
  {
    id: 'c5',
    title: 'FLORAL & BOTANICAL',
    categoryKey: 'floral',
    imageUrl: INITIAL_ALBUM_PHOTOS[8]?.thumbnailUrl || INITIAL_ALBUM_PHOTOS[0]?.thumbnailUrl,
    description: 'Hand-piped buttercream petals & fresh organic blooms',
    count: 9
  },
  {
    id: 'c6',
    title: 'CUPCAKES & CONFECTIONS',
    categoryKey: 'cupcakes',
    imageUrl: INITIAL_ALBUM_PHOTOS[9]?.thumbnailUrl || INITIAL_ALBUM_PHOTOS[4]?.thumbnailUrl,
    description: 'Gourmet cupcake towers & delicate dessert table bites',
    count: 10
  },
  {
    id: 'c7',
    title: 'MINI & BENTO CAKES',
    categoryKey: 'bento',
    imageUrl: INITIAL_ALBUM_PHOTOS[13]?.thumbnailUrl || INITIAL_ALBUM_PHOTOS[6]?.thumbnailUrl,
    description: 'Minimalist lunchbox bento cakes with custom lettering',
    count: 5
  },
  {
    id: 'c8',
    title: 'SPECIAL CELEBRATIONS',
    categoryKey: 'celebration',
    imageUrl: INITIAL_ALBUM_PHOTOS[16]?.thumbnailUrl || INITIAL_ALBUM_PHOTOS[5]?.thumbnailUrl,
    description: 'Anniversaries, baby showers & seasonal gala creations',
    count: 8
  }
];

export const CollectionsGrid: React.FC<CollectionsGridProps> = ({
  onSelectCategory,
  activeCategory
}) => {
  return (
    <section id="collections" className="py-16 bg-[#FAF7F2] border-b border-[#EADFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching image.png */}
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold tracking-[0.25em] uppercase text-[#2C1810] font-serif-brand">
            COLLECTIONS
          </h2>
          <div className="w-16 h-0.5 bg-[#9C7053] mx-auto mt-3 mb-2" />
          <p className="text-sm text-[#735A4B] tracking-wide">
            Select a curated category to explore custom photo showcases from our live bakery portfolio
          </p>
        </div>

        {/* 4-column Grid matching image.png visual aesthetic */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {COLLECTIONS.map((item) => {
            const isSelected = activeCategory === item.categoryKey;
            return (
              <button
                key={item.id}
                onClick={() => onSelectCategory(item.categoryKey)}
                id={`collection-card-${item.categoryKey}`}
                className={`group relative overflow-hidden rounded-lg bg-[#2C1810] shadow-sm hover:shadow-xl transition-all duration-300 text-left aspect-square focus:outline-none focus:ring-2 focus:ring-[#9C7053] ${
                  isSelected ? 'ring-3 ring-[#9C7053] shadow-md' : ''
                }`}
              >
                {/* Background Photography Thumbnail */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out brightness-95 group-hover:brightness-105"
                />

                {/* Subtle dark vignette overlay for readability (matching image.png) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent group-hover:from-black/75 transition-colors" />

                {/* White border frame inset for gallery art feel */}
                <div className="absolute inset-2 border border-white/20 rounded pointer-events-none group-hover:border-white/40 transition-colors" />

                {/* Bottom Typography Overlay (matching image.png typography style) */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-serif-brand text-xs sm:text-sm font-bold tracking-[0.15em] uppercase leading-tight drop-shadow-md text-white group-hover:text-[#F8DEC3] transition-colors">
                      {item.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-white/70 transform group-hover:translate-x-1 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden sm:block" />
                  </div>
                  {item.count && (
                    <span className="text-[10px] text-[#E4D1C3] tracking-widest uppercase block mt-0.5 opacity-80">
                      Explore Creations
                    </span>
                  )}
                </div>

                {/* Active Indicator Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 bg-[#9C7053] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Active
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
