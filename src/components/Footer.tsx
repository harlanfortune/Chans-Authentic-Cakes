import React from 'react';
import { Cake, MessageCircle, Phone, Mail, MapPin, Instagram, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { WHATSAPP_LINK, DISPLAY_PHONE, BAKERY_EMAIL, STUDIO_LOCATION, BAKERY_HOURS } from '../data/cakes';
import { GOOGLE_PHOTOS_ALBUM_URL } from '../data/albumPhotos';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#1C120B] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3A2216]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#21120B]">
                <Cake className="w-5 h-5 stroke-[2]" />
              </div>
              <div>
                <span className="font-serif-brand text-2xl font-bold tracking-tight text-white block leading-none">
                  Chans Authentic Cakes
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#D4A373] font-medium block mt-1">
                  Artisanal Bakery & Photo Gallery
                </span>
              </div>
            </div>

            <p className="text-xs text-[#D1C3B7] leading-relaxed max-w-sm">
              Artisanal custom celebration cakes and confections handcrafted with authentic recipes. Our portfolio is synced directly with our Google Photos album collection.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp (+27 81 207 8640)"
                title="Chat on WhatsApp (+27 81 207 8640)"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={GOOGLE_PHOTOS_ALBUM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C98A53] text-white flex items-center justify-center transition-colors"
                aria-label="Google Photos Album"
                title="Google Photos Album"
              >
                <ImageIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#E5D7CC]">
              <li>
                <button 
                  onClick={() => onNavigate('collections')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('gallery')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Live Photo Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('order')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Custom Order & Quote
                </button>
              </li>
              <li>
                <a 
                  href={GOOGLE_PHOTOS_ALBUM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#E4A87C]"
                >
                  <span>Google Photos Album</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Studio & Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs text-[#D1C3B7]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0 mt-0.5" />
                <span>{STUDIO_LOCATION}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href="tel:+27812078640" className="hover:text-white transition-colors">{DISPLAY_PHONE}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A373] shrink-0" />
                <a href={`mailto:${BAKERY_EMAIL}`} className="hover:text-white transition-colors">{BAKERY_EMAIL}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors flex items-center gap-1">
                  <span>Chat on WhatsApp ({DISPLAY_PHONE})</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#A69385] border-t border-white/10">
                <span>{BAKERY_HOURS}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A69385] gap-4">
          <p>© {new Date().getFullYear()} Chans Authentic Cakes. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={GOOGLE_PHOTOS_ALBUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A373] hover:underline flex items-center gap-1"
            >
              <span>View Google Photos Album Catalogue</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
