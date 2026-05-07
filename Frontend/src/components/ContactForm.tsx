import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { usePricingContext } from "../contexts/PricingContext";
import { pricingTiers } from "../data/pricing";

// Your WhatsApp business number (update this with actual number)
const WHATSAPP_NUMBER = "+977 9849515552"; // Format: +countrycode + number

// Luxury color scheme for each package - jewel tones with premium feel
const PACKAGE_COLORS: Record<string, { bg: string; border: string; text: string; light: string }> = {
  "Demo": { bg: "#e87d5c", border: "#c74932", text: "#000000", light: "#f9e8e0" },
  "Starter": { bg: "#f0a659", border: "#d47d35", text: "#000000", light: "#faf0e3" },
  "Professional": { bg: "#4fd5d8", border: "#21588b", text: "#000000", light: "#e0f5f7" },
  "Enterprise": { bg: "#d1b64b", border: "#8b7013", text: "#000000", light: "#f5f0e0" },
};

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
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in your ${localTier || "video production"} services. Can we discuss?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${message}`, "_blank");
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
    <section id="contact" className="relative bg-[#FAF7F2] px-6 py-16 md:px-12 md:py-24 pt-8 md:pt-12">
      <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-2 md:gap-24">
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
          <div className="mt-10">
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
                <span className="text-lg">📧</span>
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
                <span className="text-lg">💬</span>
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
                    style={{
                      backgroundColor: PACKAGE_COLORS[tier.name]?.light,
                      borderColor: PACKAGE_COLORS[tier.name]?.border,
                      borderWidth: localTier === tier.name ? '3px' : '2px',
                      transform: localTier === tier.name ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow: localTier === tier.name 
                        ? `0 12px 24px -8px ${PACKAGE_COLORS[tier.name]?.bg}66, inset 0 0 0 1px ${PACKAGE_COLORS[tier.name]?.bg}` 
                        : '0 2px 8px rgba(0,0,0,0.05)',
                    }}
                    className="relative rounded-2xl px-4 py-4 transition-all duration-300 disabled:opacity-50 text-center group hover:shadow-lg hover:-translate-y-1"
                  >
                    <p 
                      style={{
                        opacity: localTier === tier.name ? 1 : 0.45,
                        fontWeight: localTier === tier.name ? '900' : '700',
                      }}
                      className="font-sans text-xs uppercase tracking-wide text-[#2C1A0E] transition-all duration-300"
                    >
                      {tier.name}
                    </p>
                    <p 
                      style={{
                        opacity: localTier === tier.name ? 1 : 0.45,
                        color: localTier === tier.name ? PACKAGE_COLORS[tier.name]?.text : "#2C1A0E",
                        fontWeight: localTier === tier.name ? '700' : '400',
                      }}
                      className="font-display text-sm mt-1 transition-all duration-300"
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
            
            <div className="rounded-lg border border-[#B8956A]/30 bg-[#B8956A]/5 px-4 py-3">
              <p className="font-sans text-xs text-[#2C1A0E]/60">
                📧 We'll send a detailed response to your email within 2 business days
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
              <p className="text-6xl mb-4">💬</p>
              <h3 className="font-display text-3xl font-light text-[#2C1A0E] mb-3">Chat with us on WhatsApp</h3>
              <p className="font-sans text-sm text-[#2C1A0E]/70 mb-8 leading-relaxed">
                Skip the form and chat directly with our team. We respond instantly!
              </p>
              
              {/* Minimal Package Selector */}
              <div className="mb-8 w-full">
                <button
                  type="button"
                  onClick={() => setShowPackageSelector(!showPackageSelector)}
                  style={{
                    backgroundColor: localTier && PACKAGE_COLORS[localTier] ? PACKAGE_COLORS[localTier].bg : "#D4AF9A",
                    color: localTier && PACKAGE_COLORS[localTier] ? PACKAGE_COLORS[localTier].text : "#2C1A0E",
                  }}
                  className="inline-block px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 hover:shadow-md"
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
                        style={{
                          backgroundColor: PACKAGE_COLORS[tier.name]?.light,
                          borderColor: PACKAGE_COLORS[tier.name]?.border,
                          borderWidth: localTier === tier.name ? '3px' : '2px',
                          transform: localTier === tier.name ? 'translateY(-4px)' : 'translateY(0)',
                          boxShadow: localTier === tier.name 
                            ? `0 8px 16px -4px ${PACKAGE_COLORS[tier.name]?.bg}66` 
                            : '0 1px 3px rgba(0,0,0,0.05)',
                        }}
                        className="relative rounded-xl px-3 py-2 transition-all duration-300 text-center hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <p 
                          style={{
                            opacity: localTier === tier.name ? 1 : 0.45,
                            fontWeight: localTier === tier.name ? '900' : '700',
                          }}
                          className="font-sans text-xs uppercase tracking-wide text-[#2C1A0E] transition-all duration-300"
                        >
                          {tier.name}
                        </p>
                        <p 
                          style={{
                            opacity: localTier === tier.name ? 1 : 0.45,
                            color: localTier === tier.name ? PACKAGE_COLORS[tier.name]?.text : "#2C1A0E",
                            fontSize: '11px',
                          }}
                          className="font-display mt-0.5 transition-all duration-300"
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
              <span className="text-xl">💬</span>
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