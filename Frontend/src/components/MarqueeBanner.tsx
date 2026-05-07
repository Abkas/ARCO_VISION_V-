import { motion } from "framer-motion";

const items = [
  "Product Ads",
  "Cinematic Video",
  "AI Visuals",
  "Brand Films",
  "Social Content",
  "Motion Graphics",
  "Campaign Production",
  "Reels & TikToks",
];

export default function MarqueeBanner() {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <section className="overflow-hidden border-y border-[#E8DFD0] bg-[#F2EDE3] py-6">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl italic font-light text-[#2C1A0E]">
              {item}
            </span>
            <span className="block h-1.5 w-1.5 rounded-full bg-[#B8956A]" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}