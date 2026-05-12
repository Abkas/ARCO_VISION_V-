#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Cloudinary URLs organized by category
const cloudinaryItems = [
  // Product Ads (01)
  { title: 'Floating Outfit Display', category: 'Product Ads', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600075/floating-outfit-display_flf3pu.mp4' },
  { title: 'Floating Sweater Fashion Shot', category: 'Product Ads', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600073/floating-sweater-fashion-shot_p9r0kq.mp4' },
  { title: 'Floating Tshirt Product Shot', category: 'Product Ads', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600072/floating-tshirt-product-shot_ziudru.mp4' },

  // Fashion / Models (02)
  { title: 'Aquatic Product Surreal Scene', category: 'Fashion / Models', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600371/aquatic-product-surreal-scene_dhbcwa.mp4' },
  { title: 'Cinematic Depth Reveal', category: 'Fashion / Models', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600359/cinematic-depth-reveal_plei1x.mp4' },
  { title: 'Close Portrait Study', category: 'Fashion / Models', image: 'https://res.cloudinary.com/djbcs843u/image/upload/q_auto,f_auto/v1778600355/close-portrait-study_kr79sk.jpg' },
  { title: 'Intimate Handheld Motion', category: 'Fashion / Models', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600356/intimate-handheld-motion_putnmu.mp4' },
  { title: 'Levitating Fashion Showcase', category: 'Fashion / Models', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600355/levitating-fashion-showcase_rufswk.mp4' },
  { title: 'Narrative Character Study', category: 'Fashion / Models', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600361/narrative-character-study_hcexva.mp4' },

  // Beauty / Cosmetic (03)
  { title: 'Beauty Campaign Film', category: 'Beauty / Cosmetic', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600499/beauty-campaign-film_txfmrq.mp4' },
  { title: 'Luxury Environment Reveal', category: 'Beauty / Cosmetic', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600500/luxury-environment-reveal_gpitig.mp4' },
  { title: 'Skin Beauty', category: 'Beauty / Cosmetic', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600499/skin_beauty_wi7kkv.mp4' },
  { title: 'Skincare Radiance Moment', category: 'Beauty / Cosmetic', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600498/skincare-radiance-moment_rfyvtw.mp4' },

  // Food / Beverage (04)
  { title: 'Premium Botanical Showcase', category: 'Food / Beverage', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600479/premium-botanical-showcase_ubvms1.mp4' },
  { title: 'Refreshment Moment Cinematic', category: 'Food / Beverage', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600479/refreshment-moment-cinematic_zevako.mp4' },

  // Motion / Animation (05)
  { title: 'Dynamic Canine Sprint', category: 'Motion / Animation', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600571/dynamic-canine-sprint_qx1slx.mp4' },
  { title: 'Character Transport Sequence', category: 'Motion / Animation', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600571/character-transport-sequence_zthigb.mp4' },
  { title: 'Anticipation Study', category: 'Motion / Animation', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600572/anticipation-study_unr4mb.mp4' },

  // Brand Stories (06)
  { title: 'Ancient Ruins Traverse', category: 'Brand Stories', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600664/ancient-ruins-traverse_rpxsqw.mp4' },
  { title: 'Architectural Passage Reveal', category: 'Brand Stories', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600663/architectural-passage-reveal_fgjuvv.mp4' },
  { title: 'Cultural Heritage Detail', category: 'Brand Stories', image: 'https://res.cloudinary.com/djbcs843u/image/upload/q_auto,f_auto/v1778600665/cultural-heritage-detail_hwwtuo.jpg' },
  { title: 'Historic Urban Landscape', category: 'Brand Stories', image: 'https://res.cloudinary.com/djbcs843u/image/upload/q_auto,f_auto/v1778600660/historic-urban-landscape_hpv1gr.jpg' },
  { title: 'Narrative Installation', category: 'Brand Stories', image: 'https://res.cloudinary.com/djbcs843u/image/upload/q_auto,f_auto/v1778600661/narrative-installation_dyalum.jpg' },
  { title: 'Solitary Study', category: 'Brand Stories', image: 'https://res.cloudinary.com/djbcs843u/image/upload/q_auto,f_auto/v1778600660/solitary-study_ne8fl6.jpg' },
  { title: 'Spiral Architecture Cinematic Reveal', category: 'Brand Stories', video: 'https://res.cloudinary.com/djbcs843u/video/upload/q_auto,vc_auto/v1778600661/spiral-architecture-cinematic-reveal_bugb9h.mp4' },
];

const categoryOrder = [
  'Product Ads',
  'Fashion / Models',
  'Beauty / Cosmetic',
  'Food / Beverage',
  'Motion / Animation',
  'Brand Stories',
];

function generate() {
  const items = cloudinaryItems
    .map((item, idx) => ({
      id: 1000 + idx,
      title: item.title,
      category: item.category,
      catLabel: item.video ? 'Video' : 'Image',
      gridClass: 'md:col-span-6 aspect-[4/3]',
      ...(item.video ? { video: item.video } : {}),
      ...(item.image ? { image: item.image } : {}),
    }))
    .sort((a, b) => {
      const categoryDiff = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
      if (categoryDiff !== 0) return categoryDiff;
      return a.title.localeCompare(b.title);
    });

  const outPath = path.join(__dirname, '../src/data/workItems.ts');

  const content = `export const workItems = ${JSON.stringify(items, null, 2)};\n`;

  fs.writeFileSync(outPath, content, 'utf8');
  console.log('✅ workItems generated at', outPath);
  console.log(`📦 ${items.length} items`);
}

if (require.main === module) generate();

module.exports = { generate };
