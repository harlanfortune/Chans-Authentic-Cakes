import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, PhoneCall, ExternalLink } from 'lucide-react';
import { WHATSAPP_LINK, DISPLAY_PHONE, getWhatsAppUrl } from '../data/cakes';

interface WhatsAppButtonProps {
  onOpenOrderForm: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onOpenOrderForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const quickPrompts = [
    "Checking availability for my date 🎂",
    "How much for a 2-tier wedding cake?",
    "Can I order a custom Bento cake?",
    "Do you offer eggless cakes?"
  ];

  const handleSendPrompt = (text: string) => {
    const url = getWhatsAppUrl(`Hello Chan! ${text}`);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = quickMsg.trim() ? `Hello Chan! ${quickMsg.trim()}` : undefined;
    const url = getWhatsAppUrl(text);
    window.open(url, '_blank');
    setQuickMsg('');
    setIsOpen(false);
  };

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Chat Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-[#E4D5C3] overflow-hidden animate-fade-in transition-all">
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold font-serif-brand text-lg">
                  C
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#128C7E]" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Chans Authentic Cakes</h4>
                <p className="text-[11px] text-[#A7F3D0]">Typically replies in a few minutes</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat popover"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-[#FAF7F2] space-y-3 max-h-80 overflow-y-auto">
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-[#EADFCF] shadow-xs text-xs text-[#2C1810]">
              <p className="font-medium text-[#784A2A] mb-1">Hi there! 👋 Welcome to Chans Authentic Cakes.</p>
              <p className="text-[#5A4335] leading-relaxed">
                Have a question about cake sizing, flavor pairings, or booking a date? Pick a quick enquiry or chat with us directly!
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-[#8A7060] tracking-wider block">
                Quick Enquiries:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(prompt)}
                  className="w-full text-left p-2 rounded-xl bg-white hover:bg-[#EFE5D6] text-xs text-[#2C1810] border border-[#EADFCF] transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <Send className="w-3 h-3 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                </button>
              ))}
            </div>

            {/* Direct Link to WhatsApp */}
            <div className="pt-1">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                <span>Open WhatsApp ({DISPLAY_PHONE})</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-80" />
              </a>
            </div>
          </div>

          {/* Quick Input Footer */}
          <form onSubmit={handleCustomSend} className="p-3 bg-white border-t border-[#EADFCF] flex items-center gap-2">
            <input
              type="text"
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              placeholder="Type your cake enquiry..."
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#DDD2C1] text-[#2C1810] focus:outline-none focus:ring-1 focus:ring-[#128C7E]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors cursor-pointer"
              title="Open in WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
        id="floating-whatsapp-btn"
        aria-label="Direct WhatsApp Enquiry"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white/20" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping" />
        </div>
        
        <div className="text-left hidden sm:block">
          <span className="text-xs font-bold block leading-none">WhatsApp Us</span>
          <span className="text-[10px] text-white/90 leading-tight">Instant Enquiry</span>
        </div>
      </button>
    </aside>
  );
};
