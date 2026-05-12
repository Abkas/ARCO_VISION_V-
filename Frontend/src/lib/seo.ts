/**
 * SEO Metadata Manager
 * Handles dynamic meta tags for different pages
 */

import { SITE_URL } from './site';

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
    title: "Professional Video Production Agency in Nepal | ARCO Cinema",
    description: "Award-winning video production agency in Nepal. We create brand campaigns, corporate videos, social media content, and cinematic storytelling that convert. AI-powered creativity for modern brands.",
    keywords: ["video production Nepal", "video production agency", "content creation Nepal", "professional video services", "brand campaigns Nepal", "corporate video production", "social media content creation", "cinematic video production"],
    ogImage: `${SITE_URL}/og-image.jpg`,
    canonical: `${SITE_URL}/`,
  },
  services: {
    title: "Video Production Services | Corporate Videos & Brand Campaigns | ARCO Cinema",
    description: "Professional video production services for brands. Product ads, social content, brand visuals, and full-scale campaigns. Specializing in conversion-focused and algorithm-friendly content.",
    keywords: ["video production services", "corporate video production", "brand video production", "social media video content", "product advertising videos", "professional video services", "video marketing services", "content creation agency"],
    ogImage: `${SITE_URL}/services-og.jpg`,
    canonical: `${SITE_URL}/services`,
  },
  portfolio: {
    title: "Video Production Portfolio & Case Studies | ARCO Cinema",
    description: "Explore our award-winning video production portfolio. See our latest brand campaigns, product ads, corporate videos, and social media content projects across industries.",
    keywords: ["video portfolio", "video production portfolio", "case studies", "brand campaign examples", "video production examples", "corporate video portfolio", "content creation samples"],
    ogImage: `${SITE_URL}/portfolio-og.jpg`,
    canonical: `${SITE_URL}/portfolio`,
  },
  pricing: {
    title: "Video Production Pricing | Affordable Packages & Custom Quotes | ARCO Cinema",
    description: "Transparent video production pricing for brands of all sizes. From Demo to Enterprise packages. Flexible, scalable solutions. Custom quotes available for larger projects.",
    keywords: ["video production pricing", "video production cost", "affordable video production", "video production packages", "content creation pricing", "video marketing cost"],
    ogImage: `${SITE_URL}/pricing-og.jpg`,
    canonical: `${SITE_URL}/pricing`,
  },
  contact: {
    title: "Contact ARCO Cinema | Get Your Video Project Started",
    description: "Ready to bring your vision to life? Contact our video production agency today. Quick response within 48 hours. Email or WhatsApp for a free consultation.",
    keywords: ["contact video production", "hire video production agency", "video production inquiry", "content creation services contact", "brand video services contact"],
    ogImage: `${SITE_URL}/contact-og.jpg`,
    canonical: `${SITE_URL}/contact`,
  },
  // Service detail pages
  'service-product-ads': {
    title: "Product Advertising Videos | Convert Viewers to Customers | ARCO Cinema",
    description: "High-converting product ad videos optimized for all platforms. Platform-specific formats for Facebook, Instagram, TikTok, and YouTube. Perfect for e-commerce and product launches.",
    keywords: ["product advertising videos", "product video ads", "ecommerce video production", "product marketing videos", "short-form product ads", "video ads for sales"],
    canonical: `${SITE_URL}/services/product-ad-videos`,
  },
  'service-social-content': {
    title: "Social Media Video Content Creation | TikTok, Instagram & Reels | ARCO Cinema",
    description: "Native social media video content that performs. TikTok videos, Instagram Reels, YouTube Shorts, and Facebook videos. Algorithm-friendly, conversion-focused creative.",
    keywords: ["social media video content", "TikTok video production", "Instagram Reel creation", "YouTube Shorts production", "social media content creator", "viral video content"],
    canonical: `${SITE_URL}/services/social-content`,
  },
  'service-brand-visuals': {
    title: "Brand Video Production | Visual Identity & Motion Graphics | ARCO Cinema",
    description: "Cinematic brand videos that tell your story. Corporate branding videos, brand documentaries, and motion graphics. Establish visual identity that resonates with your audience.",
    keywords: ["brand video production", "brand storytelling videos", "corporate video production", "motion graphics production", "brand identity video", "visual storytelling"],
    canonical: `${SITE_URL}/services/brand-visuals`,
  },
  'service-campaigns': {
    title: "Full Campaign Video Production | Multi-Channel Strategy | ARCO Cinema",
    description: "End-to-end campaign production: concept to distribution. Multi-platform video campaigns, integrated marketing, and strategic storytelling that drives business results.",
    keywords: ["video campaign production", "full campaign video", "multi-channel video campaign", "marketing video campaigns", "integrated video marketing", "campaign video production"],
    canonical: `${SITE_URL}/services/full-campaigns`,
  },
};

export const getSEOMetadata = (page: keyof typeof pageMetadata): SEOMetaData => {
  return pageMetadata[page] || pageMetadata.home;
};

export const getServiceMetadata = (serviceSlug: string): SEOMetaData => {
  const serviceMap: Record<string, keyof typeof pageMetadata> = {
    'product-ad-videos': 'service-product-ads',
    'social-content': 'service-social-content',
    'brand-visuals': 'service-brand-visuals',
    'full-campaigns': 'service-campaigns',
  };
  
  const metadataKey = serviceMap[serviceSlug];
  if (metadataKey && metadataKey in pageMetadata) {
    return pageMetadata[metadataKey as keyof typeof pageMetadata];
  }
  return pageMetadata.home;
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
  canonical.href = metadata.canonical || `${SITE_URL}/`;
  
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
      "name": "ARCO Cinema",
      "url": SITE_URL
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
