import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Service = { number: string; title: string; description: string; slug: string };

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => navigate(`/services/${service.slug}`)}
      className="group relative flex flex-col rounded-2xl border border-[#2C1A0E]/10 bg-[#FAF7F2] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#B8956A]/40 hover:shadow-[0_30px_60px_-30px_rgba(44,26,14,0.25)] cursor-pointer"
    >
      <span className="font-display text-sm tracking-wider text-[#B8956A]">{service.number}</span>
      <h3 className="mt-6 font-display text-3xl font-light leading-tight text-[#2C1A0E]">
        {service.title}
      </h3>
      <p className="mt-4 font-sans text-sm leading-relaxed text-[#2C1A0E]/70">
        {service.description}
      </p>
      <span className="mt-8 inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-[#2C1A0E] transition-all group-hover:text-[#B8956A]">
        Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </motion.div>
  );
}