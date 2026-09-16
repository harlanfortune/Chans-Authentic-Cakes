import React, { useState } from 'react';
import { Cake, MessageCircle, ExternalLink, Menu, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GOOGLE_PHOTOS_ALBUM_URL } from '../data/albumPhotos';
import { WHATSAPP_LINK, getWhatsAppUrl } from '../data/cakes';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  photoCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, photoCount = 37 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EADFCF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            id="nav-brand-btn"
          >
            <div className="w-10 h-10 rounded-full bg-[#2C1810] flex items-center justify-center text-[#F3E5D8] shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Cake className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <span className="font-serif-brand text-xl sm:text-2xl font-bold tracking-tight text-[#2C1810] block leading-none">
                Chans Authentic Cakes
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#9C7053] font-medium mt-1 block">
                Artisanal Bakery & Photo Gallery
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A3225]">
            <button
              onClick={() => handleNavClick('collections')}
              className="hover:text-[#9C7053] transition-colors py-1 cursor-pointer"
              id="nav-link-collections"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="hover:text-[#9C7053] transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
              id="nav-link-gallery"
            >
              <span>Live Album</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#EAD9C9] text-[#6A4126] text-[10px] font-bold">
                {photoCount}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('order')}
              className="hover:text-[#9C7053] transition-colors py-1 cursor-pointer"
              id="nav-link-order"
            >
              Order Inquiry
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Google Photos Album Button as requested */}
            <a
              href={GOOGLE_PHOTOS_ALBUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-google-photos-btn"
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F3EDE4] border border-[#E2D4C4] text-[#4A3225] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              title="Open Google Photos Album Catalogue"
            >
              <ImageIcon className="w-4 h-4 text-[#9C7053]" />
              <span>Google Photos Album</span>
              <ExternalLink className="w-3 h-3 text-[#9C8677]" />
            </a>

            {/* Direct WhatsApp Contact Button */}
            <a
              href={getWhatsAppUrl("Hello Chan! I'm reaching out from your website photo gallery.")}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-whatsapp-direct-btn"
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold tracking-wide shadow-sm flex items-center gap-1.5 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>WhatsApp Direct</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={GOOGLE_PHOTOS_ALBUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white border border-[#E2D4C4] text-[#2C1810]"
              title="Google Photos Album"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2C1810] hover:bg-[#EFE3D5] focus:outline-none"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EADFCF] space-y-3">
            <button
              onClick={() => handleNavClick('collections')}
              className="block w-full text-left py-2 text-sm font-medium text-[#4A3225]"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="block w-full text-left py-2 text-sm font-medium text-[#4A3225]"
            >
              Live Album Gallery ({photoCount} photos)
            </button>
            <button
              onClick={() => handleNavClick('order')}
              className="block w-full text-left py-2 text-sm font-medium text-[#4A3225]"
            >
              Order Inquiry & Quote
            </button>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={GOOGLE_PHOTOS_ALBUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-white border border-[#E2D4C4] text-xs font-semibold text-center flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4 text-[#9C7053]" />
                <span>Open Google Photos Album</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={getWhatsAppUrl("Hello Chan! I'm reaching out from your website.")}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#25D366] text-white text-xs font-bold text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
