import React from 'react';
import { Sparkles, ExternalLink, MessageCircle, ArrowDown, Cake, Facebook } from 'lucide-react';
import { GOOGLE_PHOTOS_ALBUM_URL } from '../data/albumPhotos';
import { WHATSAPP_LINK, FACEBOOK_URL } from '../data/cakes';

interface HeroProps {
  onExploreGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreGallery }) => {
  return (
    <section id="hero" className="relative bg-[#1A120D] text-white overflow-hidden">
      {/* Background Photography with Golden Vignette matching image.png */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=2000&q=85"
          alt="Artisanal Bakery & Cake Artistry"
          className="w-full h-full object-cover object-center opacity-40 scale-105"
        />
        {/* Warm golden-amber overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120D]/90 via-[#26150B]/70 to-[#1A120D]" />
        <div className="absolute inset-0 bg-radial from-amber-900/30 via-transparent to-black/70 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pt-28 sm:pb-32 text-center">
        
        {/* Ornate Bakery Crest & Sub-badge */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="relative mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#9C7053] via-[#E8C49B] to-[#F7E7D4] shadow-2xl mx-auto flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#1F140D] flex items-center justify-center border border-[#523324]">
                <Cake className="w-8 h-8 sm:w-10 sm:h-10 text-[#E8C49B] stroke-[1.5]" />
              </div>
            </div>
            {/* Sparkle badge */}
            <div className="absolute -bottom-1 -right-1 bg-[#2C1810] border border-[#D4A373] text-[#E8C49B] p-1 rounded-full shadow">
              <Sparkles className="w-3.5 h-3.5 text-[#E8C49B]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#EAD9C9] text-xs font-semibold uppercase tracking-[0.22em]">
            <span>George, Western Cape • Artisanal Bakery</span>
          </div>
        </div>

        {/* Page Name - Prominent, Stylish & Artistic */}
        <div className="mb-4">
          <p className="font-script text-3xl sm:text-5xl md:text-6xl text-[#E8C49B] tracking-wide mb-1 select-none">
            Welcome to
          </p>
          <h1 className="font-serif-brand text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white drop-shadow-2xl leading-[1.08]">
            <span className="block text-white">Chan's</span>
            <span className="block font-display-brand text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.14em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6EC] via-[#F3D7B7] to-[#D4A373] mt-2 drop-shadow-lg">
              Authentic Cakes
            </span>
          </h1>
        </div>

        {/* Elegant Decorative Divider */}
        <div className="flex items-center justify-center gap-4 my-5 max-w-lg mx-auto">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#E8C49B]/70 to-[#E8C49B]" />
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#E8C49B] whitespace-nowrap">
            SIMPLY ART • SIMPLY DELICIOUS
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#E8C49B]/70 to-[#E8C49B]" />
        </div>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-[#E3D2C4] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
          Bespoke celebration cakes and artisanal creations handcrafted in George. Every design is pushed directly from our official Google Photos album showcase.
        </p>

        {/* Quick Access CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
          <button
            onClick={onExploreGallery}
            className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium flex items-center gap-2 border border-white/25 transition-all cursor-pointer shadow-lg hover:scale-105"
          >
            <span>Explore Photo Gallery</span>
            <ArrowDown className="w-4 h-4 text-[#E8C49B]" />
          </button>

          {/* Direct Google Photos Album button */}
          <a
            href={GOOGLE_PHOTOS_ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-google-photos-link"
            className="px-7 py-3.5 rounded-full bg-[#FAF7F2] hover:bg-white text-[#2C1810] font-bold flex items-center gap-2 shadow-xl transition-all hover:scale-105"
          >
            <span>Open Google Photos Album</span>
            <ExternalLink className="w-4 h-4 text-[#9C7053]" />
          </a>

          {/* Facebook Page Button */}
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-facebook-link"
            className="px-7 py-3.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold flex items-center gap-2 shadow-xl transition-all hover:scale-105"
          >
            <Facebook className="w-4 h-4 fill-current" />
            <span>Facebook Page</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>

          {/* WhatsApp Quick Link */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-link"
            className="px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold flex items-center gap-2 shadow-xl transition-all hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
