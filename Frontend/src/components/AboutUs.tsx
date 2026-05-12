import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Clock, Users, Lightbulb, Video, RotateCcw, Zap, Award, Headphones, TrendingUp, CheckCircle } from "lucide-react";

export default function AboutUs() {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // FAQ data with icons
  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Project timelines vary based on scope and complexity. A social content series typically takes 2-4 weeks, while full campaigns can span 6-12 weeks. We'll provide detailed timelines during our initial consultation.",
      icon: Clock
    },
    {
      q: "Do you work with startups and small businesses?",
      a: "Absolutely! We work with brands of all sizes. Our flexible packages are designed to scale with your business needs, from startups to established enterprises.",
      icon: Users
    },
    {
      q: "What's included in the discovery phase?",
      a: "Our discovery phase includes brand analysis, audience research, competitive assessment, and strategy development. This ensures we fully understand your goals before we begin production.",
      icon: Lightbulb
    },
    {
      q: "Can you help with video distribution and promotion?",
      a: "Yes, we offer distribution support and can advise on platform optimization. We also have partnerships with media specialists for paid amplification strategies.",
      icon: Video
    },
    {
      q: "Do you offer revisions after delivery?",
      a: "We include revision rounds in our packages. The exact number depends on your service tier, but we're committed to delivering exactly what you envision.",
      icon: RotateCcw
    },
    {
      q: "What's your turnaround time for initial quotes?",
      a: "We typically respond to inquiries within 24 hours. For most projects, we can provide a preliminary quote within 48 hours of our initial consultation.",
      icon: Zap
    }
  ];
  
  // Inject FAQ schema
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    };
    
    let faqScript = document.querySelector('script[type="application/ld+json"][data-schema="faq"]') as HTMLScriptElement;
    if (!faqScript) {
      faqScript = document.createElement("script");
      faqScript.type = "application/ld+json";
      faqScript.setAttribute("data-schema", "faq");
      document.head.appendChild(faqScript);
    }
    faqScript.textContent = JSON.stringify(faqSchema);
    
    return () => {
      if (faqScript && faqScript.parentNode) {
        document.head.removeChild(faqScript);
      }
    };
  }, []);

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
            <div className="mb-12 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#2C1A0E] mb-3">
                Our <span className="italic text-[#B8956A]">Values</span>
              </h2>
              <p className="font-sans text-[#2C1A0E]/60 max-w-2xl mx-auto">
                These are the principles we bring to every project, client, and decision.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Award,
                  title: "Excellence",
                  description: "We care about the details and hold every deliverable to a high standard."
                },
                {
                  icon: TrendingUp,
                  title: "Innovation",
                  description: "We combine creative thinking with modern tools to keep the work fresh."
                },
                {
                  icon: Users,
                  title: "Collaboration",
                  description: "We work closely with your team to make the process clear and efficient."
                },
                {
                  icon: CheckCircle,
                  title: "Results",
                  description: "We focus on work that looks good and moves the brand forward."
                }
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="group rounded-2xl border border-[#2C1A0E]/10 bg-white p-6 shadow-[0_12px_30px_-24px_rgba(44,26,14,0.35)] transition-all duration-300 hover:border-[#B8956A]/40 hover:shadow-[0_18px_40px_-20px_rgba(184,149,106,0.35)]"
                  >
                    <div className="mb-5 inline-flex rounded-xl bg-[#B8956A]/10 p-3 text-[#B8956A] transition-colors group-hover:bg-[#B8956A] group-hover:text-white">
                      <Icon size={24} strokeWidth={1.8} />
                    </div>
                    <h3 className="font-display text-2xl font-light text-[#2C1A0E] mb-3">
                      {value.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed text-[#2C1A0E]/70">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
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
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#2C1A0E] mb-4">
                Why Choose <span className="italic text-[#B8956A]">ARCO</span>
              </h2>
              <p className="font-sans text-[#2C1A0E]/60 max-w-2xl mx-auto">
                We're not just a production studio—we're your creative partner focused on delivering measurable results.
              </p>
            </div>

              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
              {[
                { icon: Award, label: "80+ Happy Clients", desc: "Trusted across industries" },
                { icon: Video, label: "500+ Delivered", desc: "Content pieces created" },
                { icon: TrendingUp, label: "2.5M+ Views", desc: "Across all platforms" },
                { icon: Users, label: "8+ Years", desc: "Expert team experience" },
                { icon: CheckCircle, label: "Full-Service", desc: "Production capabilities" },
                { icon: Zap, label: "Performance-Driven", desc: "Results that matter" },
                { icon: Headphones, label: "Transparent Pricing", desc: "Clear timelines & costs" },
                { icon: Clock, label: "24/48h Response", desc: "Quick turnaround guarantee" }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.08 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="group relative overflow-hidden rounded-2xl border-2 border-[#2C1A0E]/10 p-7 hover:border-[#B8956A]/60 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-white to-[#B8956A]/3"
                  >
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#B8956A]/10 via-transparent to-[#B8956A]/5 pointer-events-none" />
                    
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8956A]/0 via-[#B8956A] to-[#B8956A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                        {/* Icon with animated circle */}
                        <div className="mb-5 relative inline-flex">
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#B8956A]/30 to-[#B8956A]/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
                          <div className="relative p-3 rounded-xl bg-gradient-to-br from-[#B8956A]/20 to-[#B8956A]/10 text-[#B8956A] group-hover:from-[#B8956A] group-hover:to-[#B8956A]/80 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                            <IconComponent size={28} strokeWidth={1.5} />
                          </div>
                      </div>
                      
                      {/* Text */}
                        <h3 className="font-display text-lg font-semibold text-[#2C1A0E] mb-2 group-hover:text-[#B8956A] transition-colors duration-300 line-clamp-2">
                        {item.label}
                      </h3>
                        <p className="font-sans text-sm text-[#2C1A0E]/60 group-hover:text-[#2C1A0E]/75 transition-colors duration-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-32 mx-auto max-w-3xl"
          >
            <div className="mb-12 text-center">
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#2C1A0E] mb-3">
                Frequently Asked <span className="italic text-[#B8956A]">Questions</span>
              </h2>
              <p className="font-sans text-[#2C1A0E]/60">
                Got questions? We've got answers. Here's everything you need to know about working with us.
              </p>
            </div>
            
            <div className="grid gap-4 mx-auto">
              {faqs.map((faq, idx) => {
                const IconComponent = faq.icon;
                const isExpanded = expandedFaq === idx;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="group"
                  >
                    <button
                      onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                      className="w-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        className={`relative w-full overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                          isExpanded
                            ? "border-[#B8956A] bg-gradient-to-r from-[#B8956A]/10 to-transparent shadow-md"
                            : "border-[#2C1A0E]/10 bg-white hover:border-[#B8956A]/40 hover:bg-gradient-to-r hover:from-[#B8956A]/5 hover:to-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-4 p-6">
                          {/* Icon */}
                          <div className={`flex-shrink-0 p-3 rounded-lg transition-all duration-300 ${
                            isExpanded
                              ? "bg-[#B8956A] text-white scale-110"
                              : "bg-[#B8956A]/10 text-[#B8956A] group-hover:bg-[#B8956A]/20"
                          }`}>
                            <IconComponent size={20} strokeWidth={2} />
                          </div>

                          {/* Question and Chevron */}
                          <div className="flex-1 flex items-center justify-between gap-4">
                            <h3 className={`font-display text-lg font-light text-left transition-colors duration-300 ${
                              isExpanded ? "text-[#B8956A]" : "text-[#2C1A0E] group-hover:text-[#B8956A]"
                            }`}>
                              {faq.q}
                            </h3>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                              className={`flex-shrink-0 transition-colors duration-300 ${
                                isExpanded ? "text-[#B8956A]" : "text-[#2C1A0E]/40 group-hover:text-[#B8956A]"
                              }`}
                            >
                              <ChevronDown size={20} strokeWidth={2} />
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    </button>

                    {/* Answer */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="rounded-lg bg-gradient-to-r from-[#B8956A]/5 to-transparent p-4 border-l-4 border-[#B8956A]">
                          <p className="font-sans text-[#2C1A0E]/75 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
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
