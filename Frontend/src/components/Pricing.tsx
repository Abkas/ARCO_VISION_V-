import { motion } from "framer-motion";
import { pricingTiers } from "../data/pricing";
import PricingCard from "./PricingCard";
import StatsSection from "./StatsSection";

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-[#FAF7F2] px-6 py-16 md:px-12 md:py-24 pb-0 md:pb-0">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B8956A]">
            Transparent Pricing
          </p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] text-[#2C1A0E] md:text-6xl">
            Plans for every <span className="italic text-[#B8956A]">stage.</span>
          </h2>
          <p className="mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-[#2C1A0E]/70">
            From testing our craft with a demo, to full-scale campaigns. Choose what fits your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        <StatsSection />
      </div>
    </section>
  );
}

