import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats?: StatItem[];
}

const defaultStats: StatItem[] = [
  { value: 80, label: "Happy Clients", suffix: "+" },
  { value: 500, label: "Contents Delivered", suffix: "+" },
  { value: 2500000, label: "Views Across Platforms", suffix: "+" },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
};

export default function StatsSection({ stats = defaultStats }: StatsSectionProps) {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const intervals = stats.map((stat, idx) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[idx] = stat.value;
            return newCounts;
          });
          clearInterval(intervals[idx]);
        } else {
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[idx] = Math.floor(current);
            return newCounts;
          });
        }
      }, duration / steps);
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [isVisible, stats]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const numberVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.2 },
    },
  };

  return (
    <motion.div
      onViewportEnter={() => setIsVisible(true)}
      viewport={{ once: true, amount: 0.5 }}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      className="mt-16 rounded-2xl border border-[#2C1A0E]/10 bg-gradient-to-br from-white via-[#FAF7F2]/50 to-[#FAF7F2] p-8 md:p-16"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="mb-12 text-center"
      >
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#B8956A]">
          Our Impact
        </p>
        <h3 className="mt-3 font-display text-3xl md:text-4xl font-light text-[#2C1A0E]">
          Trusted by brands worldwide
        </h3>
      </motion.div>

      {/* Stats Grid - Simple Numbers */}
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="text-center"
          >
            {/* Number Display */}
            <motion.div
              variants={numberVariants}
              className="mb-3"
            >
              <p className="font-display text-5xl md:text-6xl font-light text-[#B8956A]">
                {formatNumber(counts[idx])}
                <span className="text-3xl md:text-4xl">{stat.suffix}</span>
              </p>
            </motion.div>

            {/* Label */}
            <motion.p
              variants={itemVariants}
              className="font-sans text-sm md:text-base font-light text-[#2C1A0E]"
            >
              {stat.label}
            </motion.p>

            {/* Subtle Accent Line */}
            <motion.div
              initial={{ scaleX: 0, originX: "center" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 h-1 w-12 mx-auto bg-gradient-to-r from-transparent via-[#B8956A] to-transparent rounded-full"
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom Accent */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-12 flex justify-center"
      >
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#B8956A]/50 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
