import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { pricingTiers } from "../data/pricing";
import PricingCard from "./PricingCard";
import StatsSection from "./StatsSection";

type PricingProps = {
  compact?: boolean;
};

export default function Pricing({ compact = false }: PricingProps) {
  const visibleTiers = compact ? pricingTiers.slice(0, 3) : pricingTiers;

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
            {compact ? "Plans at a glance" : "Transparent Pricing"}
          </p>
          <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] text-[#2C1A0E] md:text-6xl">
            {compact ? (
              <>
                A quick look at our <span className="italic text-[#B8956A]">core plans.</span>
              </>
            ) : (
              <>
                Plans for every <span className="italic text-[#B8956A]">stage.</span>
              </>
            )}
          </h2>
          <p className="mt-6 max-w-lg font-sans text-base font-light leading-relaxed text-[#2C1A0E]/70">
            {compact
              ? "The home page shows the most relevant options. Open the full plans page for a detailed comparison, deliverables, and recommendations."
              : "From testing our craft with a demo, to full-scale campaigns. Choose what fits your needs."}
          </p>
        </motion.div>

        <div className={`grid grid-cols-1 gap-6 ${compact ? "lg:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4"}`}>
          {visibleTiers.map((tier, index) => (
            <PricingCard key={tier.id} tier={tier} index={index} />
          ))}
        </div>

        {compact ? (
          <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-[#2C1A0E]/10 bg-white/70 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#B8956A]">Need the full breakdown?</p>
              <p className="mt-2 font-sans text-sm text-[#2C1A0E]/70">
                See the detailed comparison page for deliverables, turnaround, and the right fit for your budget.
              </p>
            </div>
            <Link
              to="/plans"
              className="inline-flex items-center justify-center rounded-full bg-[#2C1A0E] px-6 py-3 font-sans text-sm tracking-wide text-[#FAF7F2] transition-all hover:bg-[#B8956A]"
            >
              View full plans
            </Link>
          </div>
        ) : null}

        {!compact ? <StatsSection /> : null}
      </div>
    </section>
  );
}

