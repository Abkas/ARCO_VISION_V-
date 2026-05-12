#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../public/contents_videos_images');

const videoExts = new Set(['.mp4', '.mov', '.webm', '.ogv', '.m4v']);
const imageExts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']);

function walk(dir, relative = '') {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);
    const relPath = path.posix.join(relative, entry.name);

    if (entry.isDirectory()) {
      results.push(...walk(entryPath, relPath));
    } else if (entry.isFile()) {
      if (entry.name === 'manifest.json') continue;
      const ext = path.extname(entry.name).toLowerCase();
      let type = 'other';
      if (videoExts.has(ext)) type = 'video';
      else if (imageExts.has(ext)) type = 'image';

      const parts = relPath.split('/');
      const category = parts.length > 1 ? parts[0] : 'root';

      results.push({
        url: encodeURI(`/contents_videos_images/${relPath}`),
        path: relPath,
        filename: entry.name,
        category,
        type,
      });
    }
  }

  return results;
}

function toWorkItem(obj, id) {
  const title = obj.filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
  const category = obj.category.charAt(0).toUpperCase() + obj.category.slice(1);
  const catLabel = obj.type === 'video' ? 'Video' : obj.type === 'image' ? 'Image' : 'Asset';

  const base = {
    id,
    title,
    category,
    catLabel,
    gridClass: 'md:col-span-6 aspect-[4/3]',
  };

  if (obj.type === 'video') return Object.assign(base, { video: obj.url });
  if (obj.type === 'image') return Object.assign(base, { image: obj.url });
  return base;
}

function generate() {
  if (!fs.existsSync(root)) {
    console.error('contents_videos_images not found at', root);
    process.exit(1);
  }

  const files = walk(root);

  const items = files.map((f, idx) => toWorkItem(f, 1000 + idx));

  const outPath = path.join(__dirname, '../src/data/workItems.ts');

  const content = `export const workItems = ${JSON.stringify(items, null, 2)};\n`;

  fs.writeFileSync(outPath, content, 'utf8');
  console.log('✅ workItems generated at', outPath);
  console.log(`📦 ${items.length} items`);
}

if (require.main === module) generate();

module.exports = { generate };
