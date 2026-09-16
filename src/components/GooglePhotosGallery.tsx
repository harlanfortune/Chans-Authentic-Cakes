import React, { useState, useEffect } from 'react';
import { AlbumPhoto } from '../types';
import { INITIAL_ALBUM_PHOTOS, GOOGLE_PHOTOS_ALBUM_URL } from '../data/albumPhotos';
import { PhotoLightbox } from './PhotoLightbox';
import {
  Sparkles,
  RefreshCw,
  ExternalLink,
  Maximize2,
  Calendar,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

interface GooglePhotosGalleryProps {
  onSelectCakeForOrder: (photo: AlbumPhoto) => void;
  selectedPhotoId?: string;
}

export const GooglePhotosGallery: React.FC<GooglePhotosGalleryProps> = ({
  onSelectCakeForOrder,
  selectedPhotoId,
}) => {
  const [photos, setPhotos] = useState<AlbumPhoto[]>(INITIAL_ALBUM_PHOTOS);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<AlbumPhoto | null>(null);

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

  // Handle lightbox navigation
  const handleNextPhoto = () => {
    if (!activeLightboxPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === activeLightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % photos.length;
    setActiveLightboxPhoto(photos[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!activeLightboxPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === activeLightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setActiveLightboxPhoto(photos[prevIndex]);
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
              Browsing our handcrafted cake creations directly from our live Google Photos album.
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

            {/* Direct Google Photos Album Button */}
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

        {/* Clean Photography Grid - No tags, no descriptions */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map((photo) => {
            const isSelectedForOrder = selectedPhotoId === photo.id;
            return (
              <div
                key={photo.id}
                onClick={() => setActiveLightboxPhoto(photo)}
                className={`group relative rounded-2xl overflow-hidden bg-[#241A14] shadow-sm hover:shadow-2xl border transition-all duration-300 cursor-pointer aspect-square ${
                  isSelectedForOrder
                    ? 'ring-4 ring-[#9C7053] border-transparent shadow-lg'
                    : 'border-[#EADFCF] hover:border-[#C9A88D]'
                }`}
              >
                {/* Photo Image */}
                <img
                  src={photo.thumbnailUrl}
                  alt="Chan's Authentic Cakes Creation"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                />

                {/* Subtle dark gradient overlay on hover with action controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                  {/* Top: View Fullscreen Icon */}
                  <div className="flex justify-end">
                    <div
                      className="p-2.5 rounded-full bg-black/60 text-white backdrop-blur-xs hover:bg-[#9C7053] transition-colors"
                      title="View Full Resolution"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom: Inquire / Order Button */}
                  <div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCakeForOrder(photo);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#9C7053] hover:bg-[#855D42] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Inquire / Order This Cake</span>
                    </button>
                  </div>
                </div>

                {/* Selected Badge */}
                {isSelectedForOrder && (
                  <div className="absolute top-3 left-3 bg-[#9C7053] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1 z-10">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Selected</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
            <p className="mt-2 text-xs sm:text-sm text-[#E5D2C1] max-w-xl">
              Browse our original full-resolution photo album directly inside Google Photos, complete with zoom capabilities and album updates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <a
              href={GOOGLE_PHOTOS_ALBUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#2C1810] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow transition-all hover:scale-105"
            >
              <ImageIcon className="w-4 h-4 text-[#9C7053]" />
              <span>Open Google Photos Album</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#9C8677]" />
            </a>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Lightbox without tags or fake descriptions */}
      {activeLightboxPhoto && (
        <PhotoLightbox
          photo={activeLightboxPhoto}
          onClose={() => setActiveLightboxPhoto(null)}
          onSelectNext={handleNextPhoto}
          onSelectPrev={handlePrevPhoto}
          onOrderPhoto={(photo) => {
            onSelectCakeForOrder(photo);
            setActiveLightboxPhoto(null);
          }}
          currentIndex={photos.findIndex((p) => p.id === activeLightboxPhoto.id)}
          total={photos.length}
        />
      )}
    </section>
  );
};
