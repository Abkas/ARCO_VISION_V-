/**
 * SEO Metadata Manager
 * Handles dynamic meta tags for different pages
 */

interface SEOMetaData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  schema?: Record<string, any>;
}

const pageMetadata: Record<string, SEOMetaData> = {
  home: {
    title: "ARCO Studio | Professional Video Production & Content Creation Agency",
    description: "Award-winning video production agency specializing in brand campaigns, corporate videos, and social media content creation. Transform your vision into compelling visual stories.",
    keywords: ["video production", "content creation", "brand campaigns", "corporate videos", "video marketing", "social media content"],
    ogImage: "https://arco-studio.com/og-image.jpg",
    canonical: "https://arco-studio.com/",
  },
  services: {
    title: "Our Services | Video Production & Content Creation | ARCO Studio",
    description: "Explore our professional video production services: brand campaigns, corporate videos, social media content, photography, and creative storytelling for your brand.",
    keywords: ["video services", "brand videography", "content creation services", "corporate video production", "advertising production", "professional videography"],
    ogImage: "https://arco-studio.com/services-og.jpg",
    canonical: "https://arco-studio.com/services",
  },
  portfolio: {
    title: "Portfolio | Our Work & Case Studies | ARCO Studio",
    description: "View our award-winning portfolio. See our latest brand campaigns, corporate videos, and creative content projects.",
    keywords: ["video portfolio", "case studies", "brand campaigns portfolio", "video production examples", "corporate video examples"],
    ogImage: "https://arco-studio.com/portfolio-og.jpg",
    canonical: "https://arco-studio.com/portfolio",
  },
  pricing: {
    title: "Pricing Plans | Video Production Packages | ARCO Studio",
    description: "Transparent pricing for video production services. Choose from Demo, Starter, Professional, or Enterprise packages. Flexible solutions for any budget.",
    keywords: ["video production pricing", "content creation packages", "video production costs", "affordable video services", "custom video packages"],
    ogImage: "https://arco-studio.com/pricing-og.jpg",
    canonical: "https://arco-studio.com/pricing",
  },
  contact: {
    title: "Contact Us | Get Your Project Started | ARCO Studio",
    description: "Ready to bring your vision to life? Contact ARCO Studio today. We respond within 48 hours. Email or WhatsApp us for a quick chat.",
    keywords: ["contact video production", "video production inquiry", "content creation contact", "hire video production agency"],
    ogImage: "https://arco-studio.com/contact-og.jpg",
    canonical: "https://arco-studio.com/contact",
  },
};

export const getSEOMetadata = (page: keyof typeof pageMetadata): SEOMetaData => {
  return pageMetadata[page] || pageMetadata.home;
};

export const updateDocumentMeta = (metadata: SEOMetaData) => {
  // Update title
  document.title = metadata.title;
  
  // Update or create meta tags
  const updateMeta = (name: string, content: string, property?: string) => {
    let meta = document.querySelector(
      property 
        ? `meta[property="${property}"]` 
        : `meta[name="${name}"]`
    ) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement("meta");
      if (property) {
        meta.setAttribute("property", property);
      } else {
        meta.setAttribute("name", name);
      }
      document.head.appendChild(meta);
    }
    meta.content = content;
  };
  
  // Standard meta tags
  updateMeta("description", metadata.description);
  if (metadata.keywords) {
    updateMeta("keywords", metadata.keywords.join(", "));
  }
  
  // Open Graph tags
  updateMeta("og:title", metadata.title, "og:title");
  updateMeta("og:description", metadata.description, "og:description");
  if (metadata.ogImage) {
    updateMeta("og:image", metadata.ogImage, "og:image");
  }
  
  // Twitter tags
  updateMeta("twitter:title", metadata.title, "twitter:title");
  updateMeta("twitter:description", metadata.description, "twitter:description");
  if (metadata.ogImage) {
    updateMeta("twitter:image", metadata.ogImage, "twitter:image");
  }
  
  // Canonical link
  let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = metadata.canonical || "https://arco-studio.com/";
  
  // JSON-LD Schema
  if (metadata.schema) {
    let schema = document.querySelector('script[type="application/ld+json"][data-page]') as HTMLScriptElement;
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.setAttribute("data-page", "true");
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(metadata.schema);
  }
};

export const schemaTemplates = {
  serviceSchema: (serviceName: string, description: string) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "ARCO Studio",
      "url": "https://arco-studio.com"
    },
    "areaServed": "NP",
    "priceRange": "$$$"
  }),
  
  breadcrumbSchema: (items: Array<{ name: string; url: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }),
};
