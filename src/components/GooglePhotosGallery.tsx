import React, { useState, useEffect, useMemo } from 'react';
import { AlbumPhoto, CakeCategory } from '../types';
import { INITIAL_ALBUM_PHOTOS, GOOGLE_PHOTOS_ALBUM_URL } from '../data/albumPhotos';
import { PhotoLightbox } from './PhotoLightbox';
import {
  Sparkles,
  RefreshCw,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Grid,
  LayoutGrid,
  Maximize2,
  Calendar,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

interface GooglePhotosGalleryProps {
  onSelectCakeForOrder: (photo: AlbumPhoto) => void;
  selectedPhotoId?: string;
  activeCategory: CakeCategory;
  onCategoryChange: (category: CakeCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const GooglePhotosGallery: React.FC<GooglePhotosGalleryProps> = ({
  onSelectCakeForOrder,
  selectedPhotoId,
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}) => {
  const [photos, setPhotos] = useState<AlbumPhoto[]>(INITIAL_ALBUM_PHOTOS);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<AlbumPhoto | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'large'>('grid');

  // Fetch latest photos from backend /api/photos
  const fetchPhotos = async (forceRefresh = false) => {
    setIsLoading(true);
    try {
      const url = forceRefresh ? '/api/photos?refresh=true' : '/api/photos';
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.photos && data.photos.length > 0) {
          setPhotos(data.photos);
          setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (err) {
      console.warn('Could not fetch from /api/photos, using embedded photos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos(false);
  }, []);

  // Filtered photos based on category & search query
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesCategory =
        activeCategory === 'all' || photo.category.toLowerCase() === activeCategory.toLowerCase();

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        photo.title.toLowerCase().includes(q) ||
        photo.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [photos, activeCategory, searchQuery]);

  // Handle lightbox navigation
  const handleNextPhoto = () => {
    if (!activeLightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activeLightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setActiveLightboxPhoto(filteredPhotos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!activeLightboxPhoto) return;
    const currentIndex = filteredPhotos.findIndex((p) => p.id === activeLightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActiveLightboxPhoto(filteredPhotos[prevIndex]);
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Google Photos Sync Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#EADFCF]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAD9C9] text-[#6A4126] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#9C7053]" />
              <span>Live Google Photos Sync</span>
            </div>
            <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810] tracking-tight">
              Bakery Photo Gallery
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6E5545] max-w-xl">
              Browsing our latest handcrafted creations directly synchronized from our live Google Photos album.
            </p>
          </div>

          {/* Sync Status & Google Photos Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Sync Status Pill */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E4D5C5] shadow-xs text-xs font-medium text-[#4A3427]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Synced ({photos.length} photos)</span>
              <span className="text-[#998274]">• {lastSyncTime}</span>
            </div>

            {/* Manual Sync / Refresh Button */}
            <button
              onClick={() => fetchPhotos(true)}
              disabled={isLoading}
              id="gallery-sync-btn"
              className="p-2.5 rounded-xl bg-white hover:bg-[#F3EDE4] border border-[#E4D5C5] text-[#4A3427] hover:text-[#2C1810] transition-colors shadow-xs flex items-center justify-center cursor-pointer disabled:opacity-50"
              title="Refresh / Sync with Google Photos"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#9C7053]' : ''}`} />
            </button>

            {/* Direct Google Photos Album Button as requested by user */}
            <a
              href={GOOGLE_PHOTOS_ALBUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="gallery-open-google-photos-btn"
              className="px-4 py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#46281C] text-[#FAF7F2] text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-2 shadow-sm transition-all group"
            >
              <ImageIcon className="w-4 h-4 text-[#EAD9C9]" />
              <span>Open Google Photos Album</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </a>
          </div>
        </div>

        {/* Filters, Search & View Controls */}
        <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none text-xs font-medium">
            {[
              { key: 'all', label: 'All Photos' },
              { key: 'wedding', label: 'Wedding & Tiered' },
              { key: 'birthday', label: 'Birthdays' },
              { key: 'novelty', label: 'Novelty & Themed' },
              { key: 'chocolate', label: 'Chocolate Drip' },
              { key: 'floral', label: 'Floral & Botanical' },
              { key: 'cupcakes', label: 'Cupcakes' },
              { key: 'bento', label: 'Bento Mini' },
            ].map((tab) => {
              const active = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => onCategoryChange(tab.key as CakeCategory)}
                  id={`filter-tab-${tab.key}`}
                  className={`px-3.5 py-2 rounded-full whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#2C1810] text-[#FAF7F2] shadow-sm font-semibold'
                      : 'bg-white/80 hover:bg-white text-[#5F4638] border border-[#E7DCD0]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & View Mode Toggles */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C7465]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter by keyword..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#E4D5C5] rounded-xl text-xs text-[#2C1810] placeholder-[#9C8677] focus:outline-none focus:ring-2 focus:ring-[#9C7053]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#9C8677] hover:text-[#2C1810]"
                >
                  ×
                </button>
              )}
            </div>

            {/* Layout Switchers */}
            <div className="flex items-center bg-white border border-[#E4D5C5] rounded-xl p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-[#EAD9C9] text-[#2C1810]' : 'text-[#8C7465] hover:text-[#2C1810]'
                }`}
                title="Square Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'masonry' ? 'bg-[#EAD9C9] text-[#2C1810]' : 'text-[#8C7465] hover:text-[#2C1810]'
                }`}
                title="Masonry View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Photos Count Indicator */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#7A6252]">
          <span>
            Showing <strong className="text-[#2C1810]">{filteredPhotos.length}</strong> creations
            {activeCategory !== 'all' && (
              <span> in <strong className="capitalize text-[#2C1810]">{activeCategory}</strong></span>
            )}
            {searchQuery && (
              <span> matching "<strong className="text-[#2C1810]">{searchQuery}</strong>"</span>
            )}
          </span>

          {filteredPhotos.length > 0 && (
            <span className="hidden sm:inline text-[#9C8677]">
              Click any photo to view full resolution or start an order inquiry
            </span>
          )}
        </div>

        {/* Photo Grid Showcase */}
        {filteredPhotos.length === 0 ? (
          <div className="mt-12 py-16 bg-white rounded-2xl border border-dashed border-[#DAC7B6] text-center p-8">
            <ImageIcon className="w-12 h-12 text-[#B39B8B] mx-auto mb-3" />
            <h3 className="font-serif-brand text-xl font-bold text-[#2C1810]">No photos match your filter</h3>
            <p className="text-sm text-[#7A6252] mt-1 max-w-sm mx-auto">
              Try choosing another category or clearing your search term to see more cakes from the album.
            </p>
            <button
              onClick={() => {
                onCategoryChange('all');
                onSearchChange('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#2C1810] text-[#FAF7F2] text-xs font-semibold hover:bg-[#46281C]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`mt-8 ${
              viewMode === 'masonry'
                ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            }`}
          >
            {filteredPhotos.map((photo, index) => {
              const isSelectedForOrder = selectedPhotoId === photo.id;
              return (
                <div
                  key={photo.id}
                  onClick={() => setActiveLightboxPhoto(photo)}
                  className={`group relative rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl border border-[#EADFCF] transition-all duration-300 cursor-pointer flex flex-col ${
                    isSelectedForOrder ? 'ring-3 ring-[#9C7053] shadow-md' : ''
                  } ${viewMode === 'masonry' ? 'break-inside-avoid' : ''}`}
                >
                  {/* Photo Container */}
                  <div
                    className={`relative overflow-hidden bg-[#241A14] ${
                      viewMode === 'grid' ? 'aspect-square' : ''
                    }`}
                  >
                    <img
                      src={photo.thumbnailUrl}
                      alt={photo.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                      {/* Top Action Pills */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 text-[10px] uppercase tracking-wider font-semibold backdrop-blur-xs">
                          {photo.category}
                        </span>
                        <div className="p-2 rounded-full bg-black/60 text-white backdrop-blur-xs hover:scale-110 transition-transform">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* Bottom Inquire CTA */}
                      <div>
                        <p className="text-xs font-serif-brand font-semibold text-[#F8EFE7] line-clamp-1 mb-2">
                          {photo.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCakeForOrder(photo);
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-[#9C7053] hover:bg-[#855D42] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Order This Design</span>
                        </button>
                      </div>
                    </div>

                    {/* Selected Badge */}
                    {isSelectedForOrder && (
                      <div className="absolute top-3 left-3 bg-[#9C7053] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Selected for Inquiry</span>
                      </div>
                    )}
                  </div>

                  {/* Clean Photography Card Caption */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#8C7465] uppercase tracking-wider mb-1">
                        <span className="capitalize">{photo.category}</span>
                        <span>#{index + 1}</span>
                      </div>
                      <h4 className="font-serif-brand text-base font-bold text-[#2C1810] leading-snug group-hover:text-[#9C7053] transition-colors line-clamp-1">
                        {photo.title}
                      </h4>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#F1E8DC] flex items-center justify-between text-xs">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCakeForOrder(photo);
                        }}
                        className="text-[#9C7053] hover:text-[#784A2A] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span>Inquire Design</span>
                        <span>→</span>
                      </button>

                      <a
                        href={GOOGLE_PHOTOS_ALBUM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[#9C8677] hover:text-[#4A3427] text-[11px] flex items-center gap-1"
                        title="View Album"
                      >
                        <span>Google Photos</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Google Photos Album Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#2C1810] to-[#45281B] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#553726]">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#EAD9C9] text-xs font-semibold uppercase tracking-wider mb-3">
              <ImageIcon className="w-3.5 h-3.5 text-[#E4A87C]" />
              <span>Full Online Showcase</span>
            </div>
            <h3 className="font-serif-brand text-2xl sm:text-3xl font-bold">
              Looking for our Complete Google Photos Album?
            </h3>
            <p className="text-sm text-[#D7C4B6] mt-1 max-w-xl">
              Access the original Google Photos collection to see full-resolution shots, customer snapshots, and our latest uploads as they are added in real-time.
            </p>
          </div>

          <a
            href={GOOGLE_PHOTOS_ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="gallery-bottom-google-photos-cta"
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-[#FAF7F2] text-[#2C1810] hover:bg-white text-sm font-bold tracking-wide shadow-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>Open Full Google Photos Album</span>
            <ExternalLink className="w-4 h-4 text-[#9C7053]" />
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxPhoto && (
        <PhotoLightbox
          photo={activeLightboxPhoto}
          allPhotos={filteredPhotos}
          onClose={() => setActiveLightboxPhoto(null)}
          onSelectNext={handleNextPhoto}
          onSelectPrev={handlePrevPhoto}
          onOrderPhoto={(photo) => {
            setActiveLightboxPhoto(null);
            onSelectCakeForOrder(photo);
          }}
        />
      )}
    </section>
  );
};
