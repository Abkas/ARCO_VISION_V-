import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
import { pricingTiers } from "../data/pricing";

const comparisonRows = [
  {
    label: "Best for",
    values: ["Trying us out", "Small launches", "Growth campaigns", "Large brands"],
  },
  {
    label: "Turnaround",
    values: ["3 days", "7 days", "14 days", "Custom timeline"],
  },
  {
    label: "Videos delivered",
    values: ["1", "1-2", "3-5", "10+"],
  },
  {
    label: "Revisions",
    values: ["2", "3", "Unlimited", "Unlimited"],
  },
  {
    label: "Support level",
    values: ["Email", "Priority email", "Priority + check-ins", "Dedicated manager"],
  },
];

export default function PlansPage() {
  return (
    <main className="bg-[#FAF7F2]">
      <section className="px-6 pb-16 pt-28 md:px-12 md:pb-24">
        <div className="mx-auto max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B8956A]">
              Detailed plans
            </p>
            <h1 className="mt-4 font-display text-5xl font-light leading-[1.02] text-[#2C1A0E] md:text-7xl">
              Compare plans with <span className="italic text-[#B8956A]">clarity.</span>
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-[#2C1A0E]/70 md:text-lg">
              The home page keeps things short. This page gives clients the full picture so they can compare deliverables,
              support, and turnaround before reaching out.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#2C1A0E] px-6 py-3 font-sans text-sm tracking-wide text-[#FAF7F2] transition-all hover:bg-[#B8956A]"
            >
              Start a project
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full border border-[#2C1A0E]/15 bg-white/70 px-6 py-3 font-sans text-sm tracking-wide text-[#2C1A0E] transition-all hover:border-[#B8956A] hover:text-[#B8956A]"
            >
              Back to home
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricingTiers.map((tier, index) => (
              <PricingCard key={tier.id} tier={tier} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12 md:pb-24">
        <div className="mx-auto max-w-[1440px] rounded-[2rem] border border-[#2C1A0E]/10 bg-white/80 p-6 shadow-[0_24px_80px_-40px_rgba(44,26,14,0.22)] md:p-8">
          <div className="max-w-2xl">
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B8956A]">Side-by-side comparison</p>
            <h2 className="mt-4 font-display text-3xl font-light text-[#2C1A0E] md:text-4xl">
              What each plan includes.
            </h2>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-[#2C1A0E]/10">
            <div className="grid grid-cols-5 bg-[#2C1A0E] px-4 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#FAF7F2] md:px-6">
              <span>Feature</span>
              {pricingTiers.map((tier) => (
                <span key={tier.id} className="text-center">
                  {tier.name}
                </span>
              ))}
            </div>

            {comparisonRows.map((row, rowIndex) => (
              <div
                key={row.label}
                className={`grid grid-cols-5 px-4 py-4 md:px-6 ${rowIndex % 2 === 0 ? "bg-white" : "bg-[#FAF7F2]"}`}
              >
                <span className="font-sans text-sm font-medium text-[#2C1A0E]">{row.label}</span>
                {row.values.map((value) => (
                  <span key={value} className="px-2 text-center font-sans text-sm text-[#2C1A0E]/70 md:px-4">
                    {value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-[#2C1A0E]/10 bg-[#2C1A0E] p-8 text-[#FAF7F2] lg:col-span-2">
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#D7B98B]">Professional recommendation</p>
            <h3 className="mt-4 font-display text-3xl font-light md:text-4xl">Use the homepage as a teaser, keep this page as the decision tool.</h3>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/75 md:text-base">
              That gives you a cleaner marketing flow: visitors see just enough on the home page to stay engaged,
              then click through when they are ready to compare options in detail.
            </p>
          </div>

          <div className="rounded-3xl border border-[#B8956A]/20 bg-white p-8">
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B8956A]">Best path</p>
            <ul className="mt-5 space-y-4 font-sans text-sm text-[#2C1A0E]/75">
              <li>Home page: 3 core plans + CTA</li>
              <li>Plans page: full comparison + details</li>
              <li>Contact form: select plan and submit</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}