#!/usr/bin/env node

/**
 * Sitemap Generator for ARCO Studio
 * Run: node scripts/generate-sitemap.js
 * 
 * This generates sitemap.xml with all pages and updates lastmod dates
 */

const fs = require('fs');
const path = require('path');

const domain = process.env.SITE_URL || 'https://arco-studio.com';

const pages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    description: 'Home page - Main landing page',
  },
  {
    url: '/#services',
    changefreq: 'monthly',
    priority: '0.9',
    description: 'Services section',
  },
  {
    url: '/services/product-ad-videos',
    changefreq: 'monthly',
    priority: '0.9',
    description: 'Product Ad Videos service page',
  },
  {
    url: '/services/social-content',
    changefreq: 'monthly',
    priority: '0.9',
    description: 'Social Content service page',
  },
  {
    url: '/services/brand-visuals',
    changefreq: 'monthly',
    priority: '0.9',
    description: 'Brand Visuals service page',
  },
  {
    url: '/services/full-campaigns',
    changefreq: 'monthly',
    priority: '0.9',
    description: 'Full Campaigns service page',
  },
  {
    url: '/#work',
    changefreq: 'weekly',
    priority: '0.9',
    description: 'Portfolio/Work showcase',
  },
  {
    url: '/#pricing',
    changefreq: 'monthly',
    priority: '0.8',
    description: 'Pricing page',
  },
  {
    url: '/#contact',
    changefreq: 'yearly',
    priority: '0.7',
    description: 'Contact page',
  },
];

const generateSitemap = () => {
  const today = new Date().toISOString().split('T')[0];
  
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  pages.forEach(page => {
    sitemapContent += '  <url>\n';
    sitemapContent += `    <loc>${domain}${page.url}</loc>\n`;
    sitemapContent += `    <lastmod>${today}</lastmod>\n`;
    sitemapContent += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemapContent += `    <priority>${page.priority}</priority>\n`;
    sitemapContent += '  </url>\n';
  });
  
  sitemapContent += '</urlset>';
  
  return sitemapContent;
};

const main = () => {
  try {
    const sitemap = generateSitemap();
    const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
    
    fs.writeFileSync(sitemapPath, sitemap);
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Location: ${sitemapPath}`);
    console.log(`📊 Total URLs: ${pages.length}`);
    
    // Also generate a readable version
    console.log('\n📋 Pages included:');
    pages.forEach(page => {
      console.log(`  • ${domain}${page.url} (${page.priority} priority)`);
    });
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  main();
}

module.exports = { generateSitemap };
