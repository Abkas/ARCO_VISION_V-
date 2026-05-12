import { useEffect, useMemo, useState } from "react";
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

export default function WorkGrid() {
  const [active, setActive] = useState("All");
  const [pageSize, setPageSize] = useState(4);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const updatePageSize = () => {
      const nextPageSize = window.innerWidth >= 768 ? 6 : 4;
      setPageSize(nextPageSize);
      setItemsToShow(nextPageSize);
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const items: WorkItem[] = useMemo(
    () =>
      active === "All"
        ? (workItems as WorkItem[])
        : (workItems as WorkItem[]).filter((i) => i.category === active),
    [active],
  );

  const displayedItems = items.slice(0, itemsToShow);
  const hasMore = itemsToShow < items.length;

  const handleSeeMore = () => {
    setItemsToShow((prev) => prev + pageSize);
  };

  const handleSeeLess = () => {
    setItemsToShow(pageSize);
  };

  // Reset pagination when filter changes
  const handleFilterChange = (filter: string) => {
    setActive(filter);
    setItemsToShow(pageSize);
  };

  return (
    <section id="work" className="relative bg-[#FAF7F2] px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-neutral-500">
              Selected Work
            </p>
            <h2 className="mt-4 font-display text-5xl font-light leading-[1.05] text-neutral-800 md:text-6xl">
              Campaigns that <span className="italic text-neutral-700">convert.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`rounded-full border px-4 py-2 font-sans text-xs tracking-wide transition-all ${
                  active === f
                    ? "border-neutral-800 bg-neutral-800 text-white"
                    : "border-neutral-300 bg-transparent text-neutral-800 hover:border-neutral-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-12 gap-3 md:gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {displayedItems.map((item: WorkItem) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination Controls */}
        {items.length > 4 && (
          <div className="mt-12 flex justify-center">
            {hasMore ? (
              <button
                onClick={handleSeeMore}
                className="rounded-full border border-neutral-800 bg-transparent px-10 py-4 font-sans text-sm font-medium tracking-wide text-neutral-800 transition-all hover:bg-neutral-800 hover:text-white"
              >
                See More
              </button>
            ) : (
              <button
                onClick={handleSeeLess}
                className="rounded-full border border-neutral-800 bg-neutral-800 px-10 py-4 font-sans text-sm font-medium tracking-wide text-white transition-all hover:bg-neutral-900"
              >
                See Less
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}