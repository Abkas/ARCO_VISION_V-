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
      className={`relative rounded-2xl p-6 transition-all duration-300 ${
        tier.popular
          ? "border-2 border-neutral-300 bg-gradient-to-br from-neutral-50 to-neutral-100 shadow-lg"
          : "border border-neutral-200 bg-white hover:shadow-lg hover:border-neutral-300"
      }`}
    >
      {tier.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="inline-block bg-neutral-800 text-white px-4 py-1 rounded-full font-sans text-xs tracking-widest uppercase">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-5">
        <h3 className="font-display text-2xl font-light text-neutral-800">{tier.name}</h3>
        <p className="mt-1 font-sans text-sm text-neutral-600">{tier.description}</p>
      </div>

      <div className="mb-5">
        <span className="font-display text-5xl font-light text-neutral-800">${tier.price}</span>
        <span className="font-sans text-sm text-neutral-600"> / project</span>
      </div>

      <div className="mb-5 space-y-2 border-t border-b border-neutral-200 py-5">
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-neutral-700">Videos Delivered</span>
          <span className="font-display text-lg font-light text-neutral-800">{tier.videos}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-neutral-700">Revisions Included</span>
          <span className="font-display text-lg font-light text-neutral-800">{tier.revisions}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-sans text-sm text-neutral-700">Support</span>
          <span className="font-sans text-sm text-neutral-800">{tier.support}</span>
        </div>
      </div>

      <ul className="mb-6 space-y-2">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-neutral-500 mt-1">✓</span>
            <span className="font-sans text-sm text-neutral-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSelectTier}
        className={`w-full rounded-full py-4 font-sans text-sm tracking-wide transition-all ${
          tier.popular
            ? "bg-neutral-800 text-white hover:bg-neutral-700"
            : "border border-neutral-200 text-neutral-800 hover:bg-neutral-50 hover:border-neutral-300"
        }`}
      >
        {tier.cta}
      </button>
    </motion.div>
  );
}
