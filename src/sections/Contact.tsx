import { Phone, MessageCircle, MapPin, Clock, Mail, Instagram } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 w-full max-w-7xl mx-auto bg-background border-t border-border/40 pb-20" data-testid="section-contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
        {/* Left Column: Contact Info & Action Buttons */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-sans text-[11px] tracking-[0.25em] text-primary font-bold uppercase block mb-3">
              Ambika Agency · Balasore
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-8" data-testid="text-contact-headline">
              Visit or call the showroom
            </h2>
            
            {/* Clickable Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
              {/* Call Button */}
              <a
                href="tel:+917381918465"
                className="flex items-center justify-center gap-3 px-6 py-4 min-h-[44px] rounded-none bg-foreground text-background font-sans text-xs tracking-[0.15em] uppercase font-bold transition-colors duration-300 hover:bg-primary hover:text-white cursor-pointer active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>Call +91 73819 18465</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/918144532282?text=Hello%20Ambika%20Agency,%20I%20have%20an%20inquiry%20regarding%20sanitaryware/pumps."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 min-h-[44px] rounded-none border border-foreground text-foreground bg-transparent font-sans text-xs tracking-[0.15em] uppercase font-bold transition-colors duration-300 hover:bg-foreground hover:text-background cursor-pointer active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>WhatsApp Inquiry</span>
              </a>

              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/ambikaagency_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 min-h-[44px] rounded-none border border-foreground text-foreground bg-transparent font-sans text-xs tracking-[0.15em] uppercase font-bold transition-colors duration-300 hover:bg-foreground hover:text-background cursor-pointer active:scale-[0.98]"
              >
                <Instagram className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                <span>Follow on Instagram</span>
              </a>
            </div>

            {/* Confirmed Business Details */}
            <div className="font-sans text-sm font-normal text-foreground/80 space-y-6" data-testid="container-contact-info">
              <div className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase mb-1">Showroom & Trade Counter</p>
                  <p className="font-semibold text-foreground">Ambika Agency</p>
                  <p>Balasore Town & District</p>
                  <p>Balasore, Odisha, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4.5 h-4.5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase mb-1">Phone & Mobile</p>
                  <p>Landline: <a href="tel:06782796265" className="hover:underline font-medium text-foreground">06782-796265</a></p>
                  <p>Mobile: <a href="tel:+917381918465" className="hover:underline font-medium text-foreground">+91 73819 18465</a></p>
                  <p>WhatsApp: <a href="https://wa.me/918144532282" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-foreground">+91 81445 32282</a></p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4.5 h-4.5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase mb-1">Email Address</p>
                  <a href="mailto:ambikaagencybls@gmail.com" className="hover:underline font-medium text-foreground">
                    ambikaagencybls@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram className="w-4.5 h-4.5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase mb-1">Instagram</p>
                  <a href="https://www.instagram.com/ambikaagency_/" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-foreground">
                    @ambikaagency_
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="w-4.5 h-4.5 text-primary mt-1 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] tracking-[0.2em] font-bold text-primary uppercase mb-1">Showroom Hours</p>
                  <p>Monday – Saturday: 8:00 AM – 8:00 PM</p>
                  <p>Sunday: 8:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="self-start border border-border bg-secondary/40 p-6 sm:p-10">
          <h3 className="mb-3 font-serif text-3xl font-semibold">Send us your material list</h3>
          <p className="mb-5 text-sm text-muted-foreground">Send the sizes and quantities you need on WhatsApp. For a replacement, add a photo. For a borewell pump, include the bore depth if you know it.</p>
          <a href="https://wa.me/918144532282?text=Hello%20Ambika%20Agency%2C%20I%27d%20like%20a%20quote." target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center bg-foreground px-4 text-sm text-background">Open WhatsApp</a>
        </div>
      </div>

      {/* Embedded Google Maps Location Section */}
      <div className="w-full rounded-2xl overflow-hidden border border-border/60 shadow-sm">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10423.937987552117!2d86.91531492087007!3d21.49538776333925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1cf54f55cdeecb%3A0xfb25320c8f6d8604!2sAmbika%20Agency!5e0!3m2!1sen!2sin!4v1785913017137!5m2!1sen!2sin" 
          width="100%" 
          height="400" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="strict-origin-when-cross-origin"
          title="Ambika Agency Google Maps Location"
        />
      </div>
    </section>
  );
}
