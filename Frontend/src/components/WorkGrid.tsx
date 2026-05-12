import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { workItems } from "../data/workItems";
import WorkCard from "./WorkCard";

type WorkItem = {
  id: number;
  title: string;
  category: string;
  catLabel: string;
  gridClass: string;
  image?: string;
  video?: string;
};

const filters = (() => {
  try {
    const cats = Array.from(new Set((workItems as WorkItem[]).map((w) => w.category)));
    return ['All', ...cats];
  } catch (e) {
    return ['All'];
  }
})();

const randomGridClasses = [
  "md:col-span-3 aspect-square",
  "md:col-span-3 aspect-[4/5]",
  "md:col-span-4 aspect-[4/5]",
  "md:col-span-2 aspect-[3/4]",
  "md:col-span-3 aspect-[3/4]",
  "md:col-span-6 aspect-[4/3]",
  "md:col-span-4 aspect-square",
  "md:col-span-3 aspect-[5/4]",
  "md:col-span-5 aspect-[3/2]",
  "md:col-span-2 aspect-square",
];

function getRandomGridClass(seed: number): string {
  return randomGridClasses[seed % randomGridClasses.length];
}

export default function WorkGrid() {
  const [active, setActive] = useState("All");

  const items: WorkItem[] = useMemo(
    () =>
      active === "All"
        ? (workItems as WorkItem[])
        : (workItems as WorkItem[]).filter((i) => i.category === active),
    [active],
  );

  return (
    <section id="work" className="relative bg-[#FAF7F2] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#B8956A]">
              Selected Work
            </p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] text-[#2C1A0E] md:text-6xl">
              Campaigns that <span className="italic text-[#B8956A]">convert.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-2 font-sans text-xs tracking-wide transition-all ${
                  active === f
                    ? "border-[#2C1A0E] bg-[#2C1A0E] text-[#FAF7F2]"
                    : "border-[#2C1A0E]/20 bg-transparent text-[#2C1A0E] hover:border-[#2C1A0E]/60"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-12 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item: WorkItem) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}