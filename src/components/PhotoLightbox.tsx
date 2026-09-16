import React, { useEffect } from 'react';
import { AlbumPhoto } from '../types';
import { GOOGLE_PHOTOS_ALBUM_URL } from '../data/albumPhotos';
import { X, ChevronLeft, ChevronRight, ExternalLink, MessageCircle, Calendar, Sparkles, Share2, Check } from 'lucide-react';
import { WHATSAPP_LINK, getWhatsAppUrl } from '../data/cakes';

interface PhotoLightboxProps {
  photo: AlbumPhoto | null;
  allPhotos: AlbumPhoto[];
  onClose: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
  onOrderPhoto: (photo: AlbumPhoto) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  allPhotos,
  onClose,
  onSelectNext,
  onSelectPrev,
  onOrderPhoto,
}) => {
  const [copied, setCopied] = React.useState(false);

  // Keyboard navigation support
  useEffect(() => {
    if (!photo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelectNext();
      if (e.key === 'ArrowLeft') onSelectPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, onClose, onSelectNext, onSelectPrev]);

  if (!photo) return null;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const total = allPhotos.length;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(photo.fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappInquiryUrl = getWhatsAppUrl(
    `Hello Chan! I am inquiring about ordering a cake similar to this design from your gallery:\n🎂 Design: ${photo.title}\n📷 Photo: ${photo.fullUrl}\nCould you share pricing and availability?`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* Lightbox Container */}
      <div
        className="relative max-w-6xl w-full max-h-[95vh] bg-[#1F1612] text-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-[#3E291E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="lightbox-close-btn"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all focus:outline-none"
          title="Close Lightbox (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Photo Viewport Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[350px] sm:min-h-[480px] lg:min-h-[600px]">
          <img
            src={photo.fullUrl}
            alt={photo.title}
            className="max-h-[85vh] w-auto max-w-full object-contain select-none"
          />

          {/* Previous Arrow */}
          <button
            onClick={onSelectPrev}
            id="lightbox-prev-btn"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all focus:outline-none group"
            title="Previous Photo (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={onSelectNext}
            id="lightbox-next-btn"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all focus:outline-none group"
            title="Next Photo (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Index Counter Pill */}
          <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/60 text-xs font-mono text-[#E4D1C3] backdrop-blur-sm">
            {currentIndex + 1} / {total}
          </div>
        </div>

        {/* Photo Sidebar / Information & Order Trigger */}
        <div className="w-full lg:w-96 p-6 flex flex-col justify-between bg-[#1A120E] border-t lg:border-t-0 lg:border-l border-[#3E291E]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9C7053]/20 text-[#E4D1C3] text-xs font-medium uppercase tracking-wider mb-4 border border-[#9C7053]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#E4A87C]" />
              <span>Google Photos Album Sync</span>
            </div>

            <h3 className="font-serif-brand text-2xl font-bold text-[#F8EFE7] leading-snug">
              {photo.title}
            </h3>

            <div className="mt-3 flex items-center gap-3 text-xs text-[#BAA393]">
              <span className="capitalize px-2.5 py-1 rounded bg-[#2C1F18] border border-[#443026]">
                {photo.category} Collection
              </span>
              <span>•</span>
              <span>{photo.width} × {photo.height}px</span>
            </div>

            <p className="mt-4 text-sm text-[#D1BFAF] leading-relaxed">
              Every creation by Chan is custom-baked with authentic ingredients, bespoke tier structures, and personalized flavor profiles.
            </p>

            <div className="mt-6 pt-6 border-t border-[#3E291E] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#A89283]">
                <span>Source Album:</span>
                <span className="font-medium text-[#E4D1C3]">Chan's Live Showcase</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#A89283]">
                <span>Availability:</span>
                <span className="font-medium text-[#78C288]">Made to Order</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => onOrderPhoto(photo)}
              id="lightbox-order-btn"
              className="w-full py-3.5 px-4 rounded-xl bg-[#9C7053] hover:bg-[#855D42] text-white font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Inquire / Order This Design</span>
            </button>

            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-sm shadow flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Direct WhatsApp Quote</span>
            </a>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={GOOGLE_PHOTOS_ALBUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-lg bg-[#2C1F18] hover:bg-[#3B2B22] text-[#E4D1C3] text-xs font-medium flex items-center justify-center gap-1.5 border border-[#443026] transition-colors"
                title="View in Google Photos Album"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google Album</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg bg-[#2C1F18] hover:bg-[#3B2B22] text-[#E4D1C3] text-xs border border-[#443026] transition-colors"
                title="Copy high-res image link"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
