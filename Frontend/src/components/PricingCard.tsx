import { motion } from "framer-motion";
import { usePricingContext } from "../contexts/PricingContext";

type PricingTier = {
  id: number;
  name: string;
  price: number;
  description: string;
  videos: number | string;
  revisions: number | string;
  support: string;
  features: string[];
  cta: string;
  popular: boolean;
};

export default function PricingCard({ tier, index }: { tier: PricingTier; index: number }) {
  const { setSelectedTier } = usePricingContext();

  const handleSelectTier = () => {
    setSelectedTier(tier.name);
    // Smooth scroll to contact form
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative rounded-2xl p-8 transition-all duration-300 ${
        tier.popular
          ? "border-2 border-[#B8956A] bg-gradient-to-br from-[#2C1A0E]/5 to-[#B8956A]/5 shadow-lg shadow-[#B8956A]/10"
          : "border border-[#2C1A0E]/10 bg-white hover:shadow-lg hover:border-[#2C1A0E]/20"
      }`}
    >
      {tier.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-block bg-[#B8956A] text-white px-4 py-1 rounded-full font-sans text-xs tracking-widest uppercase">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-display text-2xl font-light text-[#2C1A0E]">{tier.name}</h3>
        <p className="mt-2 font-sans text-sm text-[#2C1A0E]/60">{tier.description}</p>
      </div>

      <div className="mb-6">
        <span className="font-display text-5xl font-light text-[#2C1A0E]">
          ${tier.price}
        </span>
        <span className="font-sans text-sm text-[#2C1A0E]/60"> / project</span>
      </div>

      <div className="mb-6 space-y-3 border-t border-b border-[#2C1A0E]/10 py-6">
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-[#2C1A0E]/70">Videos Delivered</span>
          <span className="font-display text-lg font-light text-[#B8956A]">{tier.videos}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-[#2C1A0E]/70">Revisions Included</span>
          <span className="font-display text-lg font-light text-[#B8956A]">{tier.revisions}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-[#2C1A0E]/70">Support</span>
          <span className="font-sans text-sm text-[#B8956A]">{tier.support}</span>
        </div>
      </div>

      <ul className="mb-8 space-y-3">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-[#B8956A] mt-1">✓</span>
            <span className="font-sans text-sm text-[#2C1A0E]/75">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSelectTier}
        className={`w-full rounded-full py-4 font-sans text-sm tracking-wide transition-all ${
          tier.popular
            ? "bg-[#2C1A0E] text-[#FAF7F2] hover:bg-[#B8956A] hover:shadow-[0_20px_40px_-15px_rgba(184,149,106,0.6)]"
            : "border border-[#2C1A0E]/30 text-[#2C1A0E] hover:bg-[#2C1A0E]/5 hover:border-[#2C1A0E]/60"
        }`}
      >
        {tier.cta}
      </button>
    </motion.div>
  );
}
