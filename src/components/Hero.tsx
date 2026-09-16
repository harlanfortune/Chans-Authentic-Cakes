import React from 'react';
import { Search, Sparkles, ExternalLink, MessageCircle, ArrowDown } from 'lucide-react';
import { CakeCategory } from '../types';
import { GOOGLE_PHOTOS_ALBUM_URL } from '../data/albumPhotos';
import { WHATSAPP_LINK, getWhatsAppUrl } from '../data/cakes';

interface HeroProps {
  onSearchSubmit: (query: string, category: CakeCategory) => void;
  onExploreGallery: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchSubmit, onExploreGallery }) => {
  const [keyword, setKeyword] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<CakeCategory>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(keyword, selectedCategory);
  };

  return (
    <section id="hero" className="relative bg-[#1A120D] text-white overflow-hidden">
      {/* Background Photography with Golden Vignette matching image.png */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=2000&q=85"
          alt="Artisanal Bakery & Cake Artistry"
          className="w-full h-full object-cover object-center opacity-45 scale-105"
        />
        {/* Warm golden-amber overlay inspired by image.png */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A120D]/80 via-[#26150B]/65 to-[#1A120D]" />
        <div className="absolute inset-0 bg-radial from-amber-900/20 via-transparent to-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 sm:pt-28 sm:pb-28 text-center">
        
        {/* Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#EAD9C9] text-xs font-semibold uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#E4A87C]" />
          <span>Chan's Authentic Cakes • Live Portfolio</span>
        </div>

        {/* Hero Title strictly matching image.png archetype */}
        <h1 className="font-serif-brand text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.04em] uppercase text-[#F9F5F0] drop-shadow-lg leading-none">
          SIMPLY ART. SIMPLY DELICIOUS.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-[#E3D2C4] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
          For years, clients have trusted Chan's Authentic Cakes to craft breathtaking custom celebrations.
          Every design pushed live from our official bakery photo catalogue.
        </p>

        {/* Search & Category Filter Bar directly inside hero (as featured in image.png) */}
        <form
          onSubmit={handleSearch}
          className="mt-10 max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center gap-2 border border-white/20"
        >
          {/* Keyword Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keywords (e.g., wedding, floral, chocolate, bento)..."
              className="w-full px-4 py-3 text-sm text-[#2C1810] placeholder-[#8F796B] bg-transparent focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full sm:w-48 border-t sm:border-t-0 sm:border-l border-[#E5D7C9] px-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CakeCategory)}
              className="w-full py-2.5 bg-transparent text-xs sm:text-sm font-medium text-[#4B3528] focus:outline-none cursor-pointer"
            >
              <option value="all">All Creations</option>
              <option value="wedding">Wedding & Tiered</option>
              <option value="birthday">Birthday Celebrations</option>
              <option value="novelty">Themed & Novelty</option>
              <option value="chocolate">Chocolate & Drip</option>
              <option value="floral">Floral & Botanical</option>
              <option value="cupcakes">Cupcakes & Treats</option>
              <option value="bento">Mini Bento</option>
            </select>
          </div>

          {/* Golden Search Button matching image.png */}
          <button
            type="submit"
            id="hero-search-btn"
            className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#C98A53] hover:bg-[#B37742] text-white font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span className="sm:hidden text-xs uppercase tracking-wider">Search Gallery</span>
          </button>
        </form>

        {/* Quick Access CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
          <button
            onClick={onExploreGallery}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
          >
            <span>Explore Photo Gallery</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          {/* Direct Google Photos Album button */}
          <a
            href={GOOGLE_PHOTOS_ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-google-photos-link"
            className="px-6 py-3 rounded-full bg-[#FAF7F2] hover:bg-white text-[#2C1810] font-semibold flex items-center gap-2 shadow-md transition-all hover:scale-105"
          >
            <span>Open Google Photos Album</span>
            <ExternalLink className="w-4 h-4 text-[#C98A53]" />
          </a>

          {/* Quick WhatsApp Inquiry */}
          <a
            href={getWhatsAppUrl("Hi Chan! I would like to inquire about ordering a custom cake from your gallery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>WhatsApp Direct</span>
          </a>
        </div>
      </div>
    </section>
  );
};
