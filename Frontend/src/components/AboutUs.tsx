import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section className="relative bg-[#FAF7F2]">
      {/* Add top padding to account for navbar */}
      <div className="pt-32 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          {/* Breadcrumb */}
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
            <span className="text-[#B8956A]">About Us</span>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24 max-w-3xl"
          >
            <h1 className="font-display text-6xl md:text-7xl font-light leading-[1.1] text-[#2C1A0E]">
              About <span className="italic text-[#B8956A]">ARCO</span> Studio
            </h1>
            <p className="mt-8 font-sans text-lg leading-relaxed text-[#2C1A0E]/70">
              We're a creative studio built for modern brands. We believe in the power of visual storytelling to transform how businesses connect with their audiences.
            </p>
          </motion.div>

          {/* Our Story */}
          <div className="grid gap-16 lg:grid-cols-2 mb-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-4xl font-light text-[#2C1A0E] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 font-sans text-[#2C1A0E]/70 leading-relaxed">
                <p>
                  ARCO Studio was founded on a simple belief: that exceptional video production should be accessible to ambitious brands. We started as a team of passionate filmmakers and creatives who saw a gap in the market.
                </p>
                <p>
                  What began as a small creative collective has evolved into a full-service production studio trusted by dozens of brands across industries. We've produced over 150 campaigns and helped our clients generate millions of views across digital platforms.
                </p>
                <p>
                  Today, we're committed to staying at the forefront of video production technology and creative trends, ensuring our clients always have the competitive edge they need.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center justify-center"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-[#B8956A]/10 to-[#2C1A0E]/5 rounded-2xl border-2 border-[#B8956A]/20 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎬</div>
                  <p className="font-sans text-sm text-[#2C1A0E]/60">8+ Years of Creative Excellence</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <h2 className="font-display text-4xl font-light text-[#2C1A0E] mb-12">
              Our Values
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Excellence",
                  description: "We obsess over every detail, from concept to final frame."
                },
                {
                  title: "Innovation",
                  description: "We stay ahead of trends and push creative boundaries."
                },
                {
                  title: "Collaboration",
                  description: "Your vision is our mission. We work as an extension of your team."
                },
                {
                  title: "Results",
                  description: "We measure success by the impact our work creates for your brand."
                }
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-2xl border-2 border-[#B8956A]/20 bg-white p-8 hover:border-[#B8956A]/50 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <h3 className="font-display text-2xl font-light text-[#2C1A0E] mb-3">
                    {value.title}
                  </h3>
                  <p className="font-sans text-sm text-[#2C1A0E]/70 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose ARCO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <h2 className="font-display text-4xl font-light text-[#2C1A0E] mb-12">
              Why Choose ARCO?
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                "80+ happy clients across industries",
                "500+ content pieces delivered",
                "2.5M+ views across platforms",
                "Expert team with 8+ years experience",
                "Full-service production capabilities",
                "Performance-driven approach",
                "Transparent pricing & timelines",
                "24/48 hour response guarantee"
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="flex items-start gap-4 rounded-xl border-l-4 border-[#B8956A] bg-white p-5 hover:shadow-md transition-all"
                >
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#B8956A] mt-2" />
                  <p className="font-sans text-[#2C1A0E]">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <h2 className="font-display text-4xl font-light text-[#2C1A0E] mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl">
              {[
                {
                  q: "How long does a typical project take?",
                  a: "Project timelines vary based on scope and complexity. A social content series typically takes 2-4 weeks, while full campaigns can span 6-12 weeks. We'll provide detailed timelines during our initial consultation."
                },
                {
                  q: "Do you work with startups and small businesses?",
                  a: "Absolutely! We work with brands of all sizes. Our flexible packages are designed to scale with your business needs, from startups to established enterprises."
                },
                {
                  q: "What's included in the discovery phase?",
                  a: "Our discovery phase includes brand analysis, audience research, competitive assessment, and strategy development. This ensures we fully understand your goals before we begin production."
                },
                {
                  q: "Can you help with video distribution and promotion?",
                  a: "Yes, we offer distribution support and can advise on platform optimization. We also have partnerships with media specialists for paid amplification strategies."
                },
                {
                  q: "Do you offer revisions after delivery?",
                  a: "We include revision rounds in our packages. The exact number depends on your service tier, but we're committed to delivering exactly what you envision."
                },
                {
                  q: "What's your turnaround time for initial quotes?",
                  a: "We typically respond to inquiries within 24 hours. For most projects, we can provide a preliminary quote within 48 hours of our initial consultation."
                }
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="border-2 border-[#2C1A0E]/10 rounded-xl overflow-hidden hover:border-[#B8956A]/30 transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 hover:bg-[#FAF7F2] transition-colors"
                  >
                    <h3 className="font-display text-lg font-light text-[#2C1A0E] text-left">
                      {faq.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4 text-[#B8956A]"
                    >
                      ↓
                    </motion.div>
                  </button>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedFaq === idx ? "auto" : 0,
                      opacity: expandedFaq === idx ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-white/50"
                  >
                    <p className="font-sans text-[#2C1A0E]/70 p-6 pt-0 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-[#2C1A0E]/10 bg-gradient-to-br from-white to-[#FAF7F2] p-12 text-center"
          >
            <h2 className="font-display text-3xl font-light text-[#2C1A0E] mb-4">
              Let's Create Something Amazing Together
            </h2>
            <p className="font-sans text-[#2C1A0E]/70 mb-8 max-w-2xl mx-auto">
              Ready to transform your brand vision into reality? Get in touch with our team today.
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
