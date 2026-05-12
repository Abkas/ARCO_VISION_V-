import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 + i * 0.15 },
  }),
};

export default function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#2C1A0E]">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/main_bg/bg_full.mov"
      />
      {/* Warm semi-transparent overlay */}
      <div className="absolute inset-0 bg-[#2C1A0E]/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2C1A0E]/40 via-transparent to-[#2C1A0E]/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="font-display font-light leading-[0.95] text-white text-[clamp(3.2rem,8vw,7rem)]"
        >
          We make brands
          <br />
          <span className="italic text-[#D4AE87]">unforgettable.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-8 max-w-[440px] font-sans text-base font-light leading-relaxed text-white/75"
        >
          A boutique production studio blending cinematic craft with generative AI to build
          campaigns the algorithm — and your customers — remember.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="rounded-full bg-[#FAF7F2] px-8 py-4 font-sans text-sm tracking-wide text-[#2C1A0E] transition-all hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.4)]"
          >
            Let's Collaborate →
          </a>
          <a
            href="#work"
            className="rounded-full border border-white/45 bg-transparent px-8 py-4 font-sans text-sm tracking-wide text-white transition-all hover:bg-white/15"
          >
            View Our Work
          </a>
        </motion.div>
      </div>

      {/* Bottom-left showreel label */}
      <div className="absolute bottom-10 left-6 z-10 hidden items-center gap-3 md:flex">
        <span className="block h-px w-10 bg-white/40" />
        <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-white/40">
          Replace with your showreel
        </span>
      </div>

      {/* Bottom-right scroll indicator */}
      <div className="absolute bottom-10 right-6 z-10 hidden flex-col items-center gap-3 md:flex">
        <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-white/60">
          Scroll
        </span>
        <motion.span
          className="block w-px bg-white/50"
          initial={{ height: 0 }}
          animate={{ height: [0, 40, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Fade bottom into cream */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#FAF7F2]" />
    </section>
  );
}