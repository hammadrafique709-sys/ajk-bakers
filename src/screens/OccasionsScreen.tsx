import React, { useState } from 'react';
import { OCCASIONS, STORE_INFO } from '../data/bakeryData';
import { Check, Calendar, Users, Heart, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OccasionsScreenProps {
  onCustomizeCake: () => void;
  onOrderHighTea: () => void;
}

export const OccasionsScreen: React.FC<OccasionsScreenProps> = ({
  onCustomizeCake,
  onOrderHighTea,
}) => {
  const [showTastingModal, setShowTastingModal] = useState(false);
  const [tastingName, setTastingName] = useState('');
  const [tastingPhone, setTastingPhone] = useState('');
  const [tastingDate, setTastingDate] = useState('2026-10-15');
  const [guestCount, setGuestCount] = useState('2-4 Guests');
  const [tastingSubmitted, setTastingSubmitted] = useState(false);

  const handleBookTasting = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    setTastingSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Header */}
      <section className="p-4 bg-gradient-to-b from-[#ffe9e2] to-[#fff8f6] border-b border-[#ffdcc7]">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#8b0129] uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#fea047]" />
          <span>Milestone Celebrations</span>
        </div>
        <h1 className="font-headline text-2xl font-bold text-[#2a170f]">
          Made for Every Occasion
        </h1>
        <p className="text-xs text-[#53443a] mt-1 leading-relaxed">
          From intimate birthdays to royal multi-tiered wedding banquets across Mirpur and Azad Kashmir.
        </p>
      </section>

      {/* Occasion Packages */}
      <section className="p-4 space-y-4">
        {OCCASIONS.map((occ) => (
          <div
            key={occ.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#ffe2d8] shadow-sm flex flex-col"
          >
            <div className="relative h-48 w-full">
              <img
                src={occ.image}
                alt={occ.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#8b0129] text-white text-[10px] font-bold tracking-wider">
                {occ.tag}
              </span>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-headline text-xl font-bold leading-tight drop-shadow-sm">
                  {occ.title}
                </h3>
                <span className="text-xs text-amber-200 font-semibold drop-shadow-sm">
                  Starting from Rs. {occ.startingPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <p className="text-xs text-[#53443a] leading-relaxed">
                {occ.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {occ.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-[#2a170f]">
                    <div className="w-4 h-4 rounded-full bg-[#ffe9e2] text-[#6d3403] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#ffe2d8]">
                {occ.id === 'weddings' ? (
                  <button
                    onClick={() => setShowTastingModal(true)}
                    className="flex-1 py-2.5 px-3 bg-[#6d3403] hover:bg-[#8a4b1a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Mirpur Tasting Session</span>
                  </button>
                ) : occ.id === 'birthdays' ? (
                  <button
                    onClick={onCustomizeCake}
                    className="flex-1 py-2.5 px-3 bg-[#6d3403] hover:bg-[#8a4b1a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Customize Birthday Cake</span>
                  </button>
                ) : (
                  <button
                    onClick={onOrderHighTea}
                    className="flex-1 py-2.5 px-3 bg-[#6d3403] hover:bg-[#8a4b1a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Order High Tea Box</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hi%20Hammad%20Bakers,%20I'm%20inquiring%20about%20the%20${encodeURIComponent(occ.title)}%20package.`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 bg-[#ffe9e2] text-[#6d3403] rounded-xl hover:bg-[#ffdbcd] transition-colors"
                  title="Inquire via WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Mirpur Wedding Tasting Modal */}
      {showTastingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-[#ffe2d8] flex flex-col gap-3">
            {tastingSubmitted ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-headline text-xl font-bold text-[#2a170f]">
                  Tasting Session Requested!
                </h3>
                <p className="text-xs text-[#53443a] leading-relaxed">
                  Thank you, <strong>{tastingName}</strong>! Our wedding cake director will call <strong>{tastingPhone}</strong> to confirm your complimentary tasting flight at Sector D-1 Mirpur.
                </p>
                <button
                  onClick={() => {
                    setShowTastingModal(false);
                    setTastingSubmitted(false);
                  }}
                  className="px-6 py-2 bg-[#6d3403] text-white rounded-xl text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookTasting} className="flex flex-col gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#8b0129] tracking-wider">
                    Exclusive Service
                  </span>
                  <h3 className="font-headline text-lg font-bold text-[#2a170f]">
                    Book Wedding Cake Tasting
                  </h3>
                  <p className="text-xs text-[#53443a]">
                    Sample 4 luxury sponge layers &amp; ganache flights at Hammad Bakers Mirpur.
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Bride/Groom Name"
                    value={tastingName}
                    onChange={(e) => setTastingName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fff8f6] border border-[#ffe2d8] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#8a4b1a]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp Phone Number"
                    value={tastingPhone}
                    onChange={(e) => setTastingPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#fff8f6] border border-[#ffe2d8] rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#8a4b1a]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-stone-500 font-semibold block mb-0.5">Preferred Date:</label>
                      <input
                        type="date"
                        value={tastingDate}
                        onChange={(e) => setTastingDate(e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#fff8f6] border border-[#ffe2d8] rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-500 font-semibold block mb-0.5">Guests:</label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#fff8f6] border border-[#ffe2d8] rounded-xl text-xs"
                      >
                        <option>2 Guests</option>
                        <option>3-4 Guests</option>
                        <option>Family Group (5+)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-[#ffe2d8]">
                  <button
                    type="button"
                    onClick={() => setShowTastingModal(false)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-stone-500 hover:bg-stone-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#6d3403] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#8a4b1a]"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
