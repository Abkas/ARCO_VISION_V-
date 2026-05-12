import { motion } from "framer-motion";

type Item = {
  id: number;
  title: string;
  category: string;
  catLabel: string;
  gridClass: string;
  image?: string;
  video?: string;
};

export default function WorkCard({ item }: { item: Item }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative col-span-12 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 ${item.gridClass}`}
    >
      {/* Video */}
      {item.video ? (
        <video
          src={item.video}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      ) : item.image ? (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-neutral-300">
          {item.catLabel}
        </p>
        <h3 className="mt-2 font-display text-xl font-light text-white md:text-2xl">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}