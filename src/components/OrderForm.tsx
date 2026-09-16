import React, { useState } from 'react';
import { AlbumPhoto } from '../types';
import { WHATSAPP_LINK, DISPLAY_PHONE, STUDIO_LOCATION, BAKERY_HOURS, getWhatsAppUrl, FACEBOOK_URL } from '../data/cakes';
import {
  MessageCircle,
  Calendar,
  Users,
  Send,
  Sparkles,
  CheckCircle2,
  X,
  Clock,
  MapPin,
  HelpCircle,
  Image as ImageIcon,
  Facebook,
  ExternalLink
} from 'lucide-react';

interface OrderFormProps {
  selectedPhoto: AlbumPhoto | null;
  onClearSelectedPhoto: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  selectedPhoto,
  onClearSelectedPhoto,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [servings, setServings] = useState<number>(20);
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    let msg = `*Hello Chan! Custom Cake Order Inquiry*\n`;
    msg += `------------------------------\n`;
    msg += `👤 *Name:* ${name || 'Customer'}\n`;
    msg += `📱 *Phone:* ${phone || 'Not provided'}\n`;
    if (eventDate) msg += `📅 *Event Date:* ${eventDate}\n`;
    msg += `👥 *Estimated Servings:* ${servings} guests\n`;
    msg += `🚚 *Fulfillment:* ${deliveryOption === 'pickup' ? 'Studio Pickup' : 'Delivery Required'}\n`;

    if (selectedPhoto) {
      msg += `\n🎂 *Selected Cake Reference:*\n`;
      msg += `Photo URL: ${selectedPhoto.fullUrl}\n`;
    }

    if (notes) {
      msg += `\n📝 *Custom Notes & Inscriptions:*\n${notes}\n`;
    }

    return msg;
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone && !name) {
      alert('Please enter your name or phone number so Chan can reach you.');
      return;
    }
    const message = generateWhatsAppMessage();
    const url = getWhatsAppUrl(message);
    window.open(url, '_blank');
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and phone number so we can confirm your quote.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="order" className="py-16 sm:py-24 bg-[#F5EFE6] border-t border-[#E5D7C9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DACB] text-[#633F25] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9C7053]" />
            <span>Direct Inquiry & Booking</span>
          </div>
          <h2 className="font-serif-brand text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C1810]">
            Order Your Custom Cake
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6B5343] max-w-xl mx-auto">
            Select any creation from our photo gallery or describe your unique vision. Chan will provide personalized pricing, availability, and design consultations.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#E7DCD0] overflow-hidden p-6 sm:p-10">
          
          {/* Selected Photo Reference Banner */}
          {selectedPhoto ? (
            <div className="mb-8 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5D7C9] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-black shrink-0 border border-[#DAC8B7]">
                  <img
                    src={selectedPhoto.thumbnailUrl}
                    alt="Selected Reference Cake"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#9C7053] font-bold block">
                    Selected Reference Cake
                  </span>
                  <h4 className="font-serif-brand text-base sm:text-lg font-bold text-[#2C1810]">
                    Cake from Album Showcase
                  </h4>
                  <span className="text-xs text-[#7D6657]">
                    Photo attached from live Google Photos catalogue
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClearSelectedPhoto}
                className="p-2 rounded-lg text-[#9C8677] hover:text-[#2C1810] hover:bg-[#EFE3D5] transition-colors"
                title="Clear selected reference"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="mb-8 p-4 rounded-xl bg-[#FAF7F2] border border-dashed border-[#DAC8B7] flex items-center justify-between text-xs text-[#7D6657]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#9C7053]" />
                <span>No specific photo selected yet. You can pick any cake above in the gallery, or simply describe your ideas below!</span>
              </div>
            </div>
          )}

          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-brand text-2xl font-bold text-[#2C1810]">
                Thank You, {name || 'valued customer'}!
              </h3>
              <p className="mt-2 text-sm text-[#6B5343] max-w-md mx-auto">
                We have received your custom cake inquiry. Chan will review your date ({eventDate || 'upcoming'}) and contact you shortly on WhatsApp or phone ({phone}).
              </p>
              
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl border border-[#9C7053] text-[#9C7053] text-xs font-semibold hover:bg-[#FAF7F2]"
                >
                  Send Another Inquiry
                </button>
                <button
                  onClick={handleWhatsAppSend}
                  className="px-6 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20BD5A] flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>Open in WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-6">
              {/* Row 1: Name & WhatsApp Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3427] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5D7C9] rounded-xl text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#9C7053]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3427] mb-2">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +27 81 207 8640"
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5D7C9] rounded-xl text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#9C7053]"
                  />
                </div>
              </div>

              {/* Row 2: Event Date & Guests Servings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3427] mb-2">
                    Event Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5D7C9] rounded-xl text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#9C7053]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3427] mb-2">
                    Estimated Servings / Guests ({servings} guests)
                  </label>
                  <div className="flex items-center gap-4 bg-[#FAF7F2] border border-[#E5D7C9] rounded-xl px-4 py-2.5">
                    <input
                      type="range"
                      min="5"
                      max="150"
                      step="5"
                      value={servings}
                      onChange={(e) => setServings(Number(e.target.value))}
                      className="flex-1 accent-[#9C7053]"
                    />
                    <span className="font-bold text-sm text-[#2C1810] min-w-[50px] text-right">
                      {servings} pax
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Fulfillment Method */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3427] mb-2">
                  Order Fulfillment
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('pickup')}
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      deliveryOption === 'pickup'
                        ? 'bg-[#2C1810] text-white border-[#2C1810]'
                        : 'bg-[#FAF7F2] text-[#634E3F] border-[#E5D7C9] hover:bg-white'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Bakery Pickup (Free)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryOption('delivery')}
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                      deliveryOption === 'delivery'
                        ? 'bg-[#2C1810] text-white border-[#2C1810]'
                        : 'bg-[#FAF7F2] text-[#634E3F] border-[#E5D7C9] hover:bg-white'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>Direct Delivery</span>
                  </button>
                </div>
              </div>

              {/* Row 5: Notes & Custom Requests */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3427] mb-2">
                  Special Notes, Inscription, or Custom Theme Ideas
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please write 'Happy 30th Sophia' in gold cursive, floral color palette in blush and sage..."
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E5D7C9] rounded-xl text-sm text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#9C7053]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                {/* Primary: WhatsApp Instant Connect */}
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  id="order-whatsapp-submit-btn"
                  className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Send Order via WhatsApp</span>
                </button>

                {/* Secondary: Regular Inquiry Form Submission */}
                <button
                  type="submit"
                  id="order-form-submit-btn"
                  className="w-full sm:w-auto py-4 px-8 rounded-xl bg-[#2C1810] hover:bg-[#46281C] text-[#FAF7F2] font-semibold text-sm shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </div>

              {/* Follow on Facebook Callout */}
              <div className="pt-2 flex items-center justify-between flex-wrap gap-3 p-3.5 bg-[#FAF7F2] border border-[#E5D7C9] rounded-xl text-xs text-[#523B2E]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                    <Facebook className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span>
                    Follow <strong>Chan's Authentic Cakes</strong> on Facebook for daily bakes, customer reviews & updates!
                  </span>
                </div>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="order-facebook-link"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold text-[11px] transition-colors"
                >
                  <span>Visit Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </form>
          )}

          {/* Bakery Studio Guarantee Info */}
          <div className="mt-8 pt-6 border-t border-[#EFE5D9] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#7B6454]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9C7053]" />
              <span>{STUDIO_LOCATION}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#9C7053]" />
              <span>{BAKERY_HOURS}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9C7053]" />
              <span>100% Scratch Made Authentic Recipes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
