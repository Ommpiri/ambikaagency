import React from 'react';
import { MessageCircle, MapPin } from 'lucide-react';

export function MobileStickyBar() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center select-none">
      {/* Top Circle: WhatsApp Chat Button */}
      <a
        href="https://wa.me/918144532282?text=Hello%20Ambika%20Agency,%20I%20have%20an%20inquiry%20regarding%20sanitaryware/pumps."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/40 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        data-testid="button-floating-whatsapp"
      >
        <MessageCircle className="w-6 h-6 text-white shrink-0" strokeWidth={2} />
      </a>

      {/* Bottom Circle: Google Maps Location Button */}
      <a
        href="https://www.google.com/maps/search/?api=1&query=Ambika+Agency+Balasore+Odisha"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Showroom Location on Google Maps"
        className="w-14 h-14 rounded-full bg-black text-white border border-white/20 flex items-center justify-center shadow-xl shadow-black/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        data-testid="button-floating-maps"
      >
        <MapPin className="w-6 h-6 text-white shrink-0" strokeWidth={2} />
      </a>
    </div>
  );
}
