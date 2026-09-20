import React, { useState } from 'react';
import { STORE_INFO } from '../data/bakeryData';
import { Phone, MessageSquare, MapPin, Clock, Navigation, Check, Star, ShieldCheck, Flame } from 'lucide-react';

export const ContactScreen: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState("Inquire about Today's Fresh Bakes");
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const topics = [
    "Inquire about Today's Fresh Bakes",
    "Custom Wedding/Birthday Cake Consultation",
    "High Tea / Bulk Party Box Order",
    "Delivery Status in Mirpur",
  ];

  const handleSendInquiry = () => {
    const text = `*Hammad Bakers Mirpur - Customer Message*\n\n` +
      `*Topic:* ${selectedTopic}\n` +
      (inquiryText ? `*Details:* ${inquiryText}\n` : '') +
      `*Store:* Sector D-1 / Allama Iqbal Road, Mirpur AJK`;

    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setInquirySent(true);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header */}
      <section className="p-4 bg-[#ffe9e2] border-b border-[#ffdcc7]">
        <span className="text-[11px] font-bold text-[#8f4e00] uppercase tracking-wider">
          Direct Storefront Contact
        </span>
        <h1 className="font-headline text-2xl font-bold text-[#2a170f]">
          Hammad Bakers Mirpur
        </h1>
        <p className="text-xs text-[#53443a] mt-0.5">
          We are ready to assist you with fresh orders, custom cakes, and express delivery.
        </p>
      </section>

      {/* Direct Action Bar */}
      <section className="p-4 grid grid-cols-2 gap-2.5">
        <a
          href={`tel:${STORE_INFO.phone}`}
          className="p-3.5 bg-white rounded-2xl border border-[#ffe2d8] shadow-xs flex items-center gap-2.5 hover:bg-[#fff1ec] transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-[#ffe9e2] text-[#6d3403] flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#2a170f]">Call Bakery</span>
            <span className="text-[11px] text-[#8f4e00] font-medium">{STORE_INFO.phoneDisplay}</span>
          </div>
        </a>

        <a
          href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="p-3.5 bg-[#8f4e00] text-white rounded-2xl shadow-xs flex items-center gap-2.5 hover:bg-[#6d3a00] transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold">WhatsApp</span>
            <span className="text-[11px] text-amber-200">Instant Reply</span>
          </div>
        </a>
      </section>

      {/* Store Location & Timings Card */}
      <section className="px-4 py-2">
        <div className="bg-white rounded-3xl p-4 border border-[#ffe2d8] shadow-sm space-y-3.5">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ffe9e2] text-[#6d3403] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#2a170f]">Store Location</h3>
              <p className="text-xs text-[#53443a] mt-0.5 leading-relaxed">
                {STORE_INFO.location}
              </p>
              <span className="text-[11px] text-[#8f4e00] font-medium block mt-1">
                Near Chowk Shaheedan &amp; Sector D-1 Main Commercial Plaza
              </span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex items-start gap-3 pt-3 border-t border-[#ffe2d8]">
            <div className="w-9 h-9 rounded-xl bg-[#ffe9e2] text-[#6d3403] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#2a170f]">Bakery Hours</h3>
              <p className="text-xs text-[#53443a] mt-0.5">
                {STORE_INFO.hours}
              </p>
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Open Now for Orders &amp; Takeaway
              </span>
            </div>
          </div>

          {/* Fresh Oven Schedule */}
          <div className="p-3 bg-[#fff1ec] rounded-2xl border border-[#ffe2d8] space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#6d3403]">
              <Flame className="w-4 h-4 text-[#8f4e00]" />
              <span>Mirpur Fresh Batch Oven Schedule</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-[#53443a]">
              <div className="p-1.5 bg-white rounded-lg">
                <span className="font-bold text-[#2a170f] block">Batch 1 (Sunrise)</span>
                7:00 AM • Croissants &amp; Milk Bread
              </div>
              <div className="p-1.5 bg-white rounded-lg">
                <span className="font-bold text-[#2a170f] block">Batch 2 (Noon)</span>
                12:30 PM • Warm Chicken Patties
              </div>
              <div className="p-1.5 bg-white rounded-lg">
                <span className="font-bold text-[#2a170f] block">Batch 3 (High Tea)</span>
                4:30 PM • Pastries &amp; Samosas
              </div>
              <div className="p-1.5 bg-white rounded-lg">
                <span className="font-bold text-[#2a170f] block">Batch 4 (Evening)</span>
                7:30 PM • Celebration Cakes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Send Instant Note on WhatsApp */}
      <section className="px-4 py-2">
        <div className="bg-white rounded-3xl p-4 border border-[#ffe2d8] shadow-sm space-y-3">
          <div>
            <h3 className="font-headline text-lg font-bold text-[#2a170f]">
              Quick Message to Shop
            </h3>
            <p className="text-xs text-[#53443a]">
              Select your inquiry topic and send directly to our store manager on WhatsApp.
            </p>
          </div>

          {/* Topic Pills */}
          <div className="space-y-1.5">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`w-full p-2.5 rounded-xl text-left text-xs font-medium transition-all border flex items-center justify-between ${
                  selectedTopic === t
                    ? 'bg-[#ffe9e2] border-[#8a4b1a] text-[#6d3403] font-bold'
                    : 'bg-[#fff8f6] border-[#ffe2d8] text-[#53443a]'
                }`}
              >
                <span>{t}</span>
                {selectedTopic === t && <Check className="w-3.5 h-3.5 text-[#6d3403]" />}
              </button>
            ))}
          </div>

          <textarea
            rows={2}
            value={inquiryText}
            onChange={(e) => setInquiryText(e.target.value)}
            placeholder="Add any specific details or order notes (optional)..."
            className="w-full p-2.5 bg-[#fff8f6] border border-[#ffe2d8] rounded-xl text-xs text-[#2a170f] focus:outline-none focus:ring-1 focus:ring-[#8a4b1a]"
          />

          <button
            onClick={handleSendInquiry}
            className="w-full py-2.5 bg-[#8f4e00] hover:bg-[#6d3a00] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open in WhatsApp</span>
          </button>
        </div>
      </section>

      {/* Mirpur Customer Reviews */}
      <section className="px-4 pt-2">
        <h3 className="font-headline text-base font-bold text-[#2a170f] mb-2">
          Loved in Mirpur AJK
        </h3>
        <div className="space-y-2">
          {[
            {
              name: 'Dr. Tariq Mahmood',
              location: 'Sector D-1 Mirpur',
              comment: 'The chicken patties are unmatched in taste and flakiness. Fresh every single time!',
              rating: 5,
            },
            {
              name: 'Amina & Bilal',
              location: 'Mangla View Resort Wedding',
              comment: 'Hammad Bakers crafted our 3-tier wedding cake. Both the presentation and Belgian chocolate ganache were perfection.',
              rating: 5,
            },
          ].map((rev, i) => (
            <div key={i} className="p-3 bg-white rounded-2xl border border-[#ffe2d8] shadow-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#2a170f]">{rev.name}</span>
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-stone-400 block">{rev.location}</span>
              <p className="text-xs text-[#53443a] italic leading-relaxed">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
