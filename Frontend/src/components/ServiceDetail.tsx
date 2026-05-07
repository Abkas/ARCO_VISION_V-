import { motion } from "framer-motion";
import { useState } from "react";
import { services } from "../data/services";
import { useNavigate } from "react-router-dom";

export default function ServiceDetail({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const service = services.find(s => s.slug === slug);
  const [selectedFeature, setSelectedFeature] = useState(0);

  if (!service) {
    return (
      <section className="min-h-screen bg-[#FAF7F2] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1440px] text-center">
          <h1 className="font-display text-5xl text-[#2C1A0E]">Service not found</h1>
          <button 
            onClick={() => navigate("/")}
            className="mt-8 inline-flex rounded-full bg-[#2C1A0E] px-8 py-4 font-sans text-sm text-[#FAF7F2] transition-all hover:bg-[#B8956A]"
          >
            ← Back to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#FAF7F2]">
      {/* Add top padding to account for navbar */}
      <div className="pt-32 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center gap-2 font-sans text-sm text-[#2C1A0E]/60"
        >
          <button 
            onClick={() => navigate("/")}
            className="hover:text-[#B8956A] transition-colors"
          >
            Home
          </button>
          <span>/</span>
          <button 
            onClick={() => navigate("/#services")}
            className="hover:text-[#B8956A] transition-colors"
          >
            Services
          </button>
          <span>/</span>
          <span className="text-[#B8956A]">{service.title}</span>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <div className="flex items-center gap-6 mb-4">
            <span className="font-display text-5xl font-light text-[#B8956A]">{service.number}</span>
            <div className="h-1 w-16 bg-gradient-to-r from-[#B8956A] to-transparent" />
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-light leading-[1.1] text-[#2C1A0E]">
            {service.title}
          </h1>
          <p className="mt-6 font-sans text-lg leading-relaxed text-[#2C1A0E]/70">
            {service.fullDescription}
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid gap-16 lg:grid-cols-2 mb-24">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-display text-3xl font-light text-[#2C1A0E] mb-8">
              What's Included
            </h2>
            <div className="space-y-3">
              {service.features.map((feature, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedFeature(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedFeature === idx
                      ? "border-[#B8956A] bg-[#B8956A]/10"
                      : "border-[#2C1A0E]/10 hover:border-[#B8956A]/50"
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full transition-colors ${
                      selectedFeature === idx ? "bg-[#B8956A]" : "bg-[#2C1A0E]/30"
                    }`} />
                    <span className={`font-sans text-sm ${
                      selectedFeature === idx ? "text-[#2C1A0E]" : "text-[#2C1A0E]/70"
                    }`}>
                      {feature}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Visual Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-[#B8956A]/20 to-[#2C1A0E]/5 rounded-2xl border-2 border-[#B8956A]/20 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="font-sans text-sm text-[#2C1A0E]/60">
                  {service.features[selectedFeature]}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Portfolio Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="font-display text-3xl font-light text-[#2C1A0E] mb-8">
            Recent Work
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.portfolio.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="aspect-video bg-gradient-to-br from-[#B8956A]/30 to-[#2C1A0E]/10 rounded-2xl border-2 border-[#B8956A]/20 flex items-center justify-center group cursor-pointer hover:border-[#B8956A]/50 transition-all"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">📹</div>
                  <p className="font-sans text-sm text-[#2C1A0E]/60">{item}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl border border-[#2C1A0E]/10 bg-gradient-to-br from-white to-[#FAF7F2] p-12 text-center"
        >
          <h2 className="font-display text-3xl font-light text-[#2C1A0E] mb-4">
            Ready to Get Started?
          </h2>
          <p className="font-sans text-[#2C1A0E]/70 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with {service.title.toLowerCase()}.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              navigate("/#contact");
            }}
            className="inline-flex rounded-full bg-[#2C1A0E] px-8 py-4 font-sans text-sm tracking-wide text-[#FAF7F2] transition-all hover:bg-[#B8956A] hover:shadow-[0_20px_40px_-15px_rgba(184,149,106,0.6)]"
          >
            Start Your Project
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
