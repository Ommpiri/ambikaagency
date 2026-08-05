import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Mail } from 'lucide-react';

// Sanitize user inputs to prevent XSS injection
const sanitizeInput = (str: string): string => {
  return str.replace(/[<>&"'`]/g, (char) => {
    const map: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;'
    };
    return map[char] || char;
  });
};

export function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFocus = (name: string) => setFocusedField(name);
  const handleBlur = () => setFocusedField(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const sanitizedVal = sanitizeInput(e.target.value);
    setFormData(prev => ({ ...prev, [e.target.name]: sanitizedVal }));
    if (errorMessage) setErrorMessage(null);
  };

  const isLabelActive = (name: keyof typeof formData) => focusedField === name || formData[name].length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate-limiting check: block submissions within 10 seconds of previous submission
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setErrorMessage('Please wait a few seconds before submitting another inquiry.');
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name and contact phone number.');
      return;
    }

    setLastSubmitTime(now);
    setSubmitted(true);
    setErrorMessage(null);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-5 sm:px-8 w-full max-w-7xl mx-auto bg-background border-t border-border/40 pb-20" data-testid="section-contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-16">
        {/* Left Column: Contact Info & Action Buttons */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-sans text-[11px] tracking-[0.25em] text-primary font-bold uppercase block mb-3">
              Direct Showroom Contact
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-8" data-testid="text-contact-headline">
              Begin a conversation.
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

        {/* Right Column: Specification Request Form */}
        <div className="flex flex-col justify-end bg-[#f8f7f4]/60 p-6 sm:p-10 rounded-none border border-border/60">
          <h3 className="font-sans text-lg font-bold text-foreground mb-2">
            Submit a Specification Request
          </h3>
          <p className="font-sans text-xs text-muted-foreground mb-8">
            Provide your project details or pump head requirements for direct contractor estimates.
          </p>

          <form 
            className="w-full space-y-8 sm:space-y-10" 
            onSubmit={handleSubmit}
            data-testid="form-contact"
          >
            <div className="relative group pt-2">
              <label 
                htmlFor="name" 
                className={`absolute left-0 transition-all duration-300 font-sans tracking-[0.1em] text-xs uppercase cursor-text ${
                  isLabelActive('name') ? '-top-2 text-primary font-bold' : 'top-5 text-muted-foreground'
                }`}
              >
                Full Name / Contractor Name
              </label>
              <input 
                type="text" 
                id="name" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus('name')}
                onBlur={handleBlur}
                className="w-full bg-transparent border-0 border-b border-border py-2 px-0 font-sans text-foreground text-base sm:text-sm focus:ring-0 focus:border-primary transition-colors duration-300 outline-none"
                data-testid="input-contact-name"
              />
            </div>

            <div className="relative group pt-2">
              <label 
                htmlFor="phone" 
                className={`absolute left-0 transition-all duration-300 font-sans tracking-[0.1em] text-xs uppercase cursor-text ${
                  isLabelActive('phone') ? '-top-2 text-primary font-bold' : 'top-5 text-muted-foreground'
                }`}
              >
                Mobile Number
              </label>
              <input 
                type="tel" 
                inputMode="tel"
                id="phone" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => handleFocus('phone')}
                onBlur={handleBlur}
                className="w-full bg-transparent border-0 border-b border-border py-2 px-0 font-sans text-foreground text-base sm:text-sm focus:ring-0 focus:border-primary transition-colors duration-300 outline-none"
                data-testid="input-contact-phone"
              />
            </div>

            <div className="relative group pt-2">
              <label 
                htmlFor="message" 
                className={`absolute left-0 transition-all duration-300 font-sans tracking-[0.1em] text-xs uppercase cursor-text ${
                  isLabelActive('message') ? '-top-2 text-primary font-bold' : 'top-5 text-muted-foreground'
                }`}
              >
                Inquiry / Borewell Depth / Brand Requirement
              </label>
              <textarea 
                id="message" 
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => handleFocus('message')}
                onBlur={handleBlur}
                className="w-full bg-transparent border-0 border-b border-border py-2 px-0 font-sans text-foreground text-base sm:text-sm focus:ring-0 focus:border-primary transition-colors duration-300 outline-none resize-none"
                data-testid="input-contact-message"
              />
            </div>

            {submitted ? (
              <div className="p-4 bg-foreground text-background rounded-none font-sans text-xs font-semibold text-center">
                Inquiry received. Our team will contact you shortly.
              </div>
            ) : (
              <button 
                type="submit"
                className="w-full border border-foreground text-foreground bg-transparent font-sans text-xs tracking-[0.2em] font-bold uppercase py-4 min-h-[44px] rounded-none transition-colors duration-300 hover:bg-foreground hover:text-background active:scale-[0.98] focus-visible:outline-none cursor-pointer"
                data-testid="button-contact-submit"
              >
                Submit Specification Inquiry
              </button>
            )}
          </form>
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
