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
    <section id="pricing" className="relative bg-[#FAF7F2] px-6 py-8 md:px-12 md:py-12 pb-0 md:pb-0">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 max-w-2xl"
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
          <p className="mt-4 max-w-lg font-sans text-base font-light leading-relaxed text-[#2C1A0E]/70">
            {compact
              ? "The home page shows the most relevant options. Open the full plans page for a detailed comparison, deliverables, and recommendations."
              : "From testing our craft with a demo, to full-scale campaigns. Choose what fits your needs."}
          </p>
        </motion.div>

        {compact ? (
          <>
            {/* Mobile: Show 3 smaller summary cards */}
            <div className="md:hidden grid grid-cols-1 gap-3">
              {visibleTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`rounded-2xl border bg-white p-5 shadow-sm ${
                    tier.popular ? "border-neutral-300 ring-1 ring-neutral-100" : "border-neutral-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-2xl font-light text-[#2C1A0E]">{tier.name}</p>
                      <p className="mt-1 font-sans text-sm text-[#2C1A0E]/60">{tier.description}</p>
                    </div>
                    {tier.popular ? (
                      <span className="rounded-full bg-neutral-800 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.18em] text-white">
                        Popular
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5 flex items-end gap-1">
                    <span className="font-display text-4xl font-light text-[#2C1A0E]">${tier.price}</span>
                    <span className="pb-1 font-sans text-xs text-[#2C1A0E]/60">/ project</span>
                  </div>

                  <ul className="mt-5 space-y-2 border-t border-[#2C1A0E]/10 pt-4">
                    {tier.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 font-sans text-sm text-[#2C1A0E]/70">
                        <span className="mt-1 text-[#B8956A]">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/plans"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-neutral-200 px-4 py-3 font-sans text-sm tracking-wide text-neutral-800 transition-all hover:border-neutral-300 hover:text-neutral-800"
                  >
                    View details
                  </Link>
                </div>
              ))}
            </div>

            {/* Desktop: Show all 4 detailed cards */}
            <div className="hidden md:grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              {pricingTiers.map((tier, index) => (
                <PricingCard key={tier.id} tier={tier} index={index} />
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {visibleTiers.map((tier, index) => (
              <PricingCard key={tier.id} tier={tier} index={index} />
            ))}
          </div>
        )}

        {compact ? (
          <div className="mt-10 flex justify-center">
            <Link
              to="/plans"
              className="inline-flex items-center justify-center rounded-full bg-[#2C1A0E] px-6 py-3 font-sans text-sm tracking-wide text-[#FAF7F2] transition-all hover:bg-[#B8956A]"
            >
              Compare all plans
            </Link>
          </div>
        ) : null}

        <StatsSection />
      </div>
    </section>
  );
}

