import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { services } from "../data/services";
import { useNavigate } from "react-router-dom";
import WorkCard from "./WorkCard";
import { useServiceSEO } from "../hooks/useSEO";
import { SITE_URL } from "../lib/site";

export default function ServiceDetail({ slug }: { slug: string }) {
  const navigate = useNavigate();
  const service = services.find(s => s.slug === slug);
  const [selectedFeature, setSelectedFeature] = useState(0);
  
  // Update page metadata based on service
  useServiceSEO(slug);
  
  // Inject Service schema + Breadcrumb schema
  useEffect(() => {
    if (!service) return;
    
    // Service schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.fullDescription,
      "provider": {
        "@type": "Organization",
        "name": "ARCO Cinema",
        "url": SITE_URL,
        "logo": `${SITE_URL}/logo.png`
      },
      "areaServed": {
        "@type": "Country",
        "name": "NP"
      },
      "priceRange": "$$$",
      "url": `${SITE_URL}/services/${slug}`
    };
    
    // Breadcrumb schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": `${SITE_URL}/#services`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": service.title,
          "item": `${SITE_URL}/services/${slug}`
        }
      ]
    };
    
    // Inject Service schema
    let serviceScript = document.querySelector('script[type="application/ld+json"][data-schema="service"]') as HTMLScriptElement;
    if (!serviceScript) {
      serviceScript = document.createElement("script");
      serviceScript.type = "application/ld+json";
      serviceScript.setAttribute("data-schema", "service");
      document.head.appendChild(serviceScript);
    }
    serviceScript.textContent = JSON.stringify(serviceSchema);
    
    // Inject Breadcrumb schema
    let breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-schema="breadcrumb"]') as HTMLScriptElement;
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement("script");
      breadcrumbScript.type = "application/ld+json";
      breadcrumbScript.setAttribute("data-schema", "breadcrumb");
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    
    // Cleanup on unmount
    return () => {
      if (serviceScript && serviceScript.parentNode) {
        document.head.removeChild(serviceScript);
      }
      if (breadcrumbScript && breadcrumbScript.parentNode) {
        document.head.removeChild(breadcrumbScript);
      }
    };
  }, [service, slug]);

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
              onClick={() => {
                // Navigate to home, then scroll to the services section if present.
                navigate("/");
                setTimeout(() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else window.location.hash = '#services';
                }, 80);
              }}
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
          {/* Render portfolio using the same WorkCard used on the homepage */}
          <motion.div layout className="grid grid-cols-12 gap-3 md:gap-4 lg:gap-6">
            {service.portfolio.map((p: string, idx: number) => {
              const filename = p.split('/').pop() || `item-${idx}`;
              const titleBase = filename.replace(/\.[^/.]+$/, '')
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase());

              const item = {
                id: idx + 1,
                title: titleBase,
                category: service.title,
                catLabel: service.title,
                gridClass: '',
                video: p,
              };

              return <WorkCard key={p + idx} item={item} />;
            })}
          </motion.div>
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
