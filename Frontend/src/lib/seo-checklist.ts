/**
 * SEO & Performance Optimization Checklist & Configuration
 * Track implementation status for ARCO Studio
 */

export const SEO_CHECKLIST = {
  // Basics
  basics: {
    metaTags: { status: "✅ DONE", description: "Title, description, keywords in index.html" },
    favicon: { status: "⚠️  TODO", description: "Add proper favicon (currently using generic SVG)" },
    mobileResponsive: { status: "✅ DONE", description: "Viewport meta tag and responsive design" },
  },

  // Schema & Structured Data
  structuredData: {
    organizationSchema: { status: "✅ DONE", description: "JSON-LD Organization schema added" },
    localBusinessSchema: { status: "✅ DONE", description: "Local business schema for location/contact" },
    serviceSchema: { status: "📋 READY", description: "Can be added per service page" },
    breadcrumbSchema: { status: "📋 READY", description: "Template ready for implementation" },
  },

  // Sitemap & Robots
  sitemapRobots: {
    robots: { status: "✅ DONE", description: "/robots.txt created and configured" },
    sitemap: { status: "✅ DONE", description: "/sitemap.xml created with all main pages" },
    googleSearch: { status: "⚠️  TODO", description: "Submit sitemap to Google Search Console" },
    bingWebmaster: { status: "⚠️  TODO", description: "Submit sitemap to Bing Webmaster Tools" },
  },

  // Content Optimization
  contentOptimization: {
    keywordTargeting: {
      status: "✅ DONE",
      keywords: [
        "video production",
        "content creation",
        "brand campaigns",
        "corporate videos",
        "video marketing",
        "social media content",
        "professional videography",
        "advertising production",
      ],
    },
    headings: { status: "✅ DONE", description: "H1/H2/H3 structure in place" },
    metaDescriptions: { status: "✅ DONE", description: "Compelling descriptions for each page" },
    internalLinking: { status: "📋 TODO", description: "Add strategic internal links between pages" },
  },

  // Technical SEO
  technical: {
    pageSpeed: { status: "📋 TODO", description: "Run Lighthouse audit, optimize images" },
    coreWebVitals: { status: "📋 TODO", description: "Monitor LCP, FID, CLS metrics" },
    sslCertificate: { status: "⚠️  TODO", description: "Ensure HTTPS is enabled (arco-studio.com)" },
    canonicalTags: { status: "✅ DONE", description: "Canonical URLs set for each page" },
  },

  // Social & Links
  social: {
    ogTags: { status: "✅ DONE", description: "Open Graph tags for social sharing" },
    twitterCards: { status: "✅ DONE", description: "Twitter card meta tags added" },
    socialProfiles: { status: "📋 TODO", description: "Link to social media profiles in schema" },
    backlinks: { status: "⚠️  TODO", description: "Build quality backlinks to increase authority" },
  },

  // Analytics & Monitoring
  analytics: {
    googleAnalytics: { status: "⚠️  TODO", description: "Set up GA4 tracking" },
    searchConsole: { status: "⚠️  TODO", description: "Register in Google Search Console" },
    pagespeed: { status: "⚠️  TODO", description: "Monitor Core Web Vitals in PSI" },
    rankTracking: { status: "⚠️  TODO", description: "Set up keyword rank tracking" },
  },
};

/**
 * Keyword Strategy for ARCO Studio
 * Primary Keywords: Video Production, Content Creation
 * Location: Nepal (Kathmandu)
 */
export const KEYWORD_STRATEGY = {
  primary: [
    { keyword: "video production agency", difficulty: "high", intent: "commercial" },
    { keyword: "content creation services", difficulty: "high", intent: "commercial" },
    { keyword: "brand video production", difficulty: "medium", intent: "commercial" },
    { keyword: "corporate video services", difficulty: "medium", intent: "commercial" },
  ],

  secondary: [
    { keyword: "video marketing services", difficulty: "medium", intent: "informational" },
    { keyword: "professional videography", difficulty: "medium", intent: "commercial" },
    { keyword: "social media content creation", difficulty: "low", intent: "commercial" },
    { keyword: "advertising video production", difficulty: "medium", intent: "commercial" },
  ],

  longTail: [
    "affordable video production services",
    "video production for small business",
    "corporate video production company",
    "professional brand video production",
    "video content for social media",
    "custom video production packages",
    "professional videography services near me",
  ],

  location: [
    "video production in Nepal",
    "content creation agency Kathmandu",
    "video production Kathmandu",
    "professional videography Nepal",
  ],
};

/**
 * Next Steps for Full SEO Implementation
 */
export const NEXT_STEPS = [
  {
    priority: "HIGH",
    task: "Set up Google Analytics 4 & Search Console",
    impact: "Critical for monitoring traffic and rankings",
    effort: "2 hours",
  },
  {
    priority: "HIGH",
    task: "Create high-quality favicon and brand assets",
    impact: "Improves brand recognition in search results",
    effort: "1 hour",
  },
  {
    priority: "HIGH",
    task: "Optimize images and implement lazy loading",
    impact: "Improves Core Web Vitals and page speed",
    effort: "3 hours",
  },
  {
    priority: "MEDIUM",
    task: "Add Service pages with individual SEO optimization",
    impact: "Target specific service keywords",
    effort: "4 hours",
  },
  {
    priority: "MEDIUM",
    task: "Create blog/resources section for content marketing",
    impact: "Long-term organic traffic and authority",
    effort: "Ongoing",
  },
  {
    priority: "MEDIUM",
    task: "Build internal linking strategy",
    impact: "Improves crawlability and link equity distribution",
    effort: "2 hours",
  },
  {
    priority: "LOW",
    task: "Set up link building outreach campaign",
    impact: "Builds domain authority over time",
    effort: "Ongoing",
  },
];
