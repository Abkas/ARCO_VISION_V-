import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { usePricingContext } from "../contexts/PricingContext";
import { pricingTiers } from "../data/pricing";

// Your WhatsApp business number (update this with actual number)
// Keep the displayed format for humans, but normalize digits for wa.me links
const WHATSAPP_NUMBER_DISPLAY = "+977 9849515552";
const WHATSAPP_NUMBER = WHATSAPP_NUMBER_DISPLAY.replace(/[^0-9+]/g, ""); // +9779849525552

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_OWNER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_OWNER_TEMPLATE_ID as string | undefined;
const EMAILJS_CONFIRM_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONFIRM_TEMPLATE_ID as string | undefined;

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedTier, setSelectedTier } = usePricingContext();
  const [localTier, setLocalTier] = useState(selectedTier || "");
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("email");
  const [showPackageSelector, setShowPackageSelector] = useState(false);
  
  const isMobile = () => /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");

  const openWhatsApp = async (rawNumber: string, textMessage: string) => {
    const digits = rawNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(textMessage);
    const webUrl = `https://wa.me/${digits}?text=${encoded}`;
    const appUrl = `whatsapp://send?phone=${digits}&text=${encoded}`;

    // Scroll to contact section so user sees contact context
    try {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      // ignore
    }

    // Attempt to open WhatsApp app on mobile, fallback to web
    try {
      if (isMobile()) {
        // Try app URL first
        window.location.href = appUrl;
        // After short delay, also open web fallback in a new tab
        setTimeout(() => window.open(webUrl, '_blank'), 800);
      } else {
        // Desktop: open web URL
        window.open(webUrl, '_blank');
      }
    } catch (err) {
      // Last resort: open web
      window.open(webUrl, '_blank');
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hi — I'm interested in your ${localTier || "video production"} services. Can you share pricing and availability? Thanks.`;
    openWhatsApp(WHATSAPP_NUMBER, message);
    // emit global event so a global toast can handle fallback copy/open
    try {
      const evt = new CustomEvent('arcovision:whatsapp-toast', { detail: { display: WHATSAPP_NUMBER_DISPLAY, digits: WHATSAPP_NUMBER.replace(/[^0-9+]/g, '').replace('+',''), message } });
      window.dispatchEvent(evt);
    } catch (e) { /* ignore */ }
    // analytics
    try {
      if ((window as any).gtag) (window as any).gtag('event', 'contact_whatsapp_click', { method: 'button' });
    } catch (e) {
      // ignore
    }
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;

    try {
      const formData = new FormData(e.currentTarget);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const company = String(formData.get("company") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_OWNER_TEMPLATE_ID || !EMAILJS_CONFIRM_TEMPLATE_ID) {
        throw new Error("Email service is not configured yet.");
      }

      const sharedParams = {
        name,
        email,
        company: company || "Not provided",
        message,
        package: localTier || "Not selected",
        contact_method: contactMethod,
        phone: "Not provided",
        submitted_at: new Date().toLocaleString(),
      };

      await Promise.all([
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE_ID, sharedParams, {
          publicKey: EMAILJS_PUBLIC_KEY,
        }),
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_CONFIRM_TEMPLATE_ID,
          {
            ...sharedParams,
            to_name: name,
            to_email: email,
          },
          {
            publicKey: EMAILJS_PUBLIC_KEY,
          }
        ),
      ]);

      setSent(true);
      
      setTimeout(() => {
        setSent(false);
        form.reset();
        setLocalTier("");
        setContactMethod("email");
      }, 3000);

    } catch (error) {
      console.error("Submission error:", error);
      alert(`Error: ${error instanceof Error ? error.message : "Failed to submit"}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="relative bg-[#FAF7F2] px-6 py-10 md:px-12 md:py-14 pt-6 md:pt-8">
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-2 md:gap-16">
        <div className="md:sticky md:top-24 md:h-fit">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B8956A]">
            Get in touch
          </p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] text-[#2C1A0E] md:text-6xl">
            Let's build something <span className="italic text-[#B8956A]">memorable.</span>
          </h2>
          <p className="mt-6 max-w-md font-sans text-base font-light leading-relaxed text-[#2C1A0E]/70">
            Tell us about your brand and the campaign you're dreaming up. We reply to every brief
            within two business days.
          </p>
          
          {/* Contact Method - Button Style */}
          <div className="mt-6">
            <p className="font-sans text-xs tracking-[0.18em] uppercase text-[#B8956A] mb-4">
              How would you like to reach out?
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setContactMethod("email")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left font-sans text-sm ${
                  contactMethod === "email"
                    ? "border-[#B8956A] bg-[#B8956A]/10"
                    : "border-[#2C1A0E]/20 bg-white hover:border-[#B8956A]/50"
                }`}
              >
                <span className="text-lg text-neutral-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25v7.5A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 15.75v-7.5A2.25 2.25 0 0018.75 6H5.25A2.25 2.25 0 003 8.25z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25l-9 5.25L3 8.25" />
                  </svg>
                </span>
                <p className="font-semibold text-[#2C1A0E] mt-1">Email - Professional & Trackable</p>
                <p className="text-[#2C1A0E]/60 text-xs mt-1">Fill out the form below</p>
              </button>
              
              <button
                type="button"
                onClick={() => setContactMethod("whatsapp")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left font-sans text-sm ${
                  contactMethod === "whatsapp"
                    ? "border-[#B8956A] bg-[#B8956A]/10"
                    : "border-[#2C1A0E]/20 bg-white hover:border-[#B8956A]/50"
                }`}
              >
                <span className="text-lg text-neutral-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12.9.36 1.77.72 2.58a2 2 0 01-.45 2.11L8.09 10.91a16 16 0 006 6l1.5-1.5a2 2 0 012.11-.45c.81.36 1.68.6 2.58.72A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                <p className="font-semibold text-[#2C1A0E] mt-1">WhatsApp - Quick Chat</p>
                <p className="text-[#2C1A0E]/60 text-xs mt-1">Chat directly with us now</p>
              </button>
            </div>
          </div>
          
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#047857]/15 bg-white/60 px-4 py-2 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B8956A] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
            </span>
            <span className="font-sans text-xs tracking-[0.18em] uppercase text-[#2C1A0E]/80">
              Currently accepting clients
            </span>
          </div>
        </motion.div>
        </div>

        {contactMethod === "email" ? (
          // EMAIL FORM
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <input
              required
              name="name"
              placeholder="Your name"
              disabled={isSubmitting}
              className="rounded-xl border border-[#2C1A0E]/15 bg-white/60 px-5 py-4 font-sans text-sm text-[#2C1A0E] placeholder:text-[#2C1A0E]/40 focus:border-[#B8956A] focus:outline-none disabled:opacity-50"
            />
            <input
              required
              name="email"
              type="email"
              placeholder="Email address"
              disabled={isSubmitting}
              className="rounded-xl border border-[#2C1A0E]/15 bg-white/60 px-5 py-4 font-sans text-sm text-[#2C1A0E] placeholder:text-[#2C1A0E]/40 focus:border-[#B8956A] focus:outline-none disabled:opacity-50"
            />
            <input
              name="company"
              placeholder="Company / Brand"
              disabled={isSubmitting}
              className="rounded-xl border border-[#2C1A0E]/15 bg-white/60 px-5 py-4 font-sans text-sm text-[#2C1A0E] placeholder:text-[#2C1A0E]/40 focus:border-[#B8956A] focus:outline-none disabled:opacity-50"
            />
            
            {/* Package Selector - Button Style */}
            <div>
              <label className="block font-sans text-xs tracking-[0.18em] uppercase text-[#B8956A] mb-4">
                Select package
              </label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-2">
                {pricingTiers.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setLocalTier(tier.name);
                      setSelectedTier(tier.name);
                    }}
                    onDoubleClick={(e) => e.preventDefault()}
                    disabled={isSubmitting}
                    className={`relative rounded-2xl px-4 py-4 transition-all duration-300 disabled:opacity-50 text-center group hover:shadow-lg ${
                      localTier === tier.name
                        ? 'border-2 border-neutral-800 bg-neutral-100 -translate-y-2 shadow-lg'
                        : 'border border-neutral-200 bg-white'
                    }`}
                  >
                    <p
                      className={`font-sans text-xs uppercase tracking-wide transition-all duration-300 ${
                        localTier === tier.name ? 'text-neutral-800 font-black' : 'text-neutral-700 font-semibold'
                      }`}
                    >
                      {tier.name}
                    </p>
                    <p
                      className={`font-display text-sm mt-1 transition-all duration-300 ${
                        localTier === tier.name ? 'text-neutral-900 font-semibold' : 'text-neutral-700'
                      }`}
                    >
                      ${tier.price}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Tell us about your project"
              disabled={isSubmitting}
              className="resize-none rounded-xl border border-[#2C1A0E]/15 bg-white/60 px-5 py-4 font-sans text-sm text-[#2C1A0E] placeholder:text-[#2C1A0E]/40 focus:border-[#B8956A] focus:outline-none disabled:opacity-50"
            />
            
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
              <p className="font-sans text-xs text-neutral-700/70 flex items-center gap-2">
                <span className="inline-block w-4 h-4 text-neutral-700" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25v7.5A2.25 2.25 0 005.25 18h13.5A2.25 2.25 0 0021 15.75v-7.5A2.25 2.25 0 0018.75 6H5.25A2.25 2.25 0 003 8.25z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25l-9 5.25L3 8.25" />
                  </svg>
                </span>
                We typically reply within two business days.
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#2C1A0E] px-8 py-4 font-sans text-sm tracking-wide text-[#FAF7F2] transition-all hover:bg-[#B8956A] hover:shadow-[0_20px_40px_-15px_rgba(184,149,106,0.6)] disabled:opacity-50"
            >
              {sent ? "Thanks — we'll be in touch ✓" : isSubmitting ? "Sending..." : "Send brief →"}
            </button>
          </motion.form>
        ) : (
          // WHATSAPP OPTION
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col gap-6 justify-center items-center min-h-[500px]"
          >
            <div className="rounded-3xl border-2 border-[#B8956A] bg-[#B8956A]/5 p-10 text-center max-w-sm">
              <div className="mx-auto mb-4 w-16 h-16 text-neutral-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12.9.36 1.77.72 2.58a2 2 0 01-.45 2.11L8.09 10.91a16 16 0 006 6l1.5-1.5a2 2 0 012.11-.45c.81.36 1.68.6 2.58.72A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 className="font-display text-3xl font-light text-[#2C1A0E] mb-3">Chat with us on WhatsApp</h3>
              <p className="font-sans text-sm text-[#2C1A0E]/70 mb-8 leading-relaxed">
                Skip the form and chat directly with our team. We respond instantly!
              </p>
              
              {/* Minimal Package Selector */}
              <div className="mb-8 w-full">
                <button
                  type="button"
                  onClick={() => setShowPackageSelector(!showPackageSelector)}
                  className={`inline-block px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:shadow-md ${
                    localTier ? 'bg-neutral-100 text-neutral-800' : 'bg-neutral-50 text-neutral-800'
                  }`}
                >
                  {localTier || "Select Package"} {showPackageSelector ? "▲" : "▼"}
                </button>
                
                {/* Expandable Package Options */}
                {showPackageSelector && (
                    <div className="mt-4 grid grid-cols-2 gap-2 w-full">
                    {pricingTiers.map((tier) => (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => {
                          setLocalTier(tier.name);
                          setSelectedTier(tier.name);
                          setShowPackageSelector(false);
                        }}
                        onDoubleClick={(e) => e.preventDefault()}
                        className={`relative rounded-xl px-3 py-2 transition-all duration-300 text-center hover:-translate-y-0.5 hover:shadow-md ${
                          localTier === tier.name ? 'border-2 border-neutral-800 bg-neutral-100 -translate-y-1 shadow-md' : 'border border-neutral-200 bg-white'
                        }`}
                      >
                        <p
                          className={`font-sans text-xs uppercase tracking-wide text-neutral-800 transition-all duration-300 ${
                            localTier === tier.name ? 'font-black' : 'font-semibold text-neutral-700'
                          }`}
                        >
                          {tier.name}
                        </p>
                        <p
                          className={`font-display mt-0.5 transition-all duration-300 ${
                            localTier === tier.name ? 'text-neutral-900' : 'text-neutral-700'
                          }`}
                          style={{ fontSize: '11px' }}
                        >
                          ${tier.price}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-3 rounded-full bg-[#2C1A0E] hover:bg-[#B8956A] px-10 py-5 font-sans text-base tracking-wide text-white transition-all hover:shadow-[0_20px_40px_-15px_rgba(184,149,106,0.6)]"
            >
              <span className="text-xl text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12.9.36 1.77.72 2.58a2 2 0 01-.45 2.11L8.09 10.91a16 16 0 006 6l1.5-1.5a2 2 0 012.11-.45c.81.36 1.68.6 2.58.72A2 2 0 0122 16.92z" />
                </svg>
              </span>
              Open WhatsApp Chat
            </button>
            
            <p className="font-sans text-xs text-[#2C1A0E]/50">
              Available 9 AM - 6 PM EST
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}