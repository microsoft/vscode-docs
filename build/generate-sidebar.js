// Generates _sidebar.md from docs/toc.json and api/toc.json
// Usage: node build/generate-sidebar.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function loadJSON(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  // Strip JS-style comments (// ...) that appear in api/toc.json
  const cleaned = raw.replace(/^\s*\/\/.*$/gm, '');
  return JSON.parse(cleaned);
}

// Extract frontmatter fields from a markdown file
function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.substring(0, idx).trim();
    const val = line.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
    fm[key] = val;
  }
  return fm;
}

function renderTopics(topics, indent) {
  let md = '';
  for (const item of topics) {
    // Subsection: ["", "", { name, topics }]
    if (item.length === 3 && typeof item[2] === 'object') {
      const sub = item[2];
      md += `${indent}- **${sub.name}**\n`;
      md += renderTopics(sub.topics, indent + '  ');
    } else {
      const [title, docPath] = item;
      if (!title || !docPath) continue;
      // Keep leading / so links are always absolute from root
      // (required with relativePath: true to avoid relative resolution)
      md += `${indent}- [${title}](${docPath})\n`;
    }
  }
  return md;
}

function buildSidebar() {
  const docsToc = loadJSON(path.join(ROOT, 'docs', 'toc.json'));
  const apiToc = loadJSON(path.join(ROOT, 'api', 'toc.json'));

  // Docs sidebar
  let docsSidebar = '';
  for (const section of docsToc) {
    docsSidebar += `- **${section.name}**\n`;
    docsSidebar += renderTopics(section.topics, '  ');
  }
  fs.writeFileSync(path.join(ROOT, '_sidebar_docs.md'), docsSidebar, 'utf-8');
  console.log('Generated _sidebar_docs.md');

  // API sidebar
  let apiSidebar = '';
  for (const section of apiToc) {
    apiSidebar += `- **${section.name}**\n`;
    apiSidebar += renderTopics(section.topics, '  ');
  }
  fs.writeFileSync(path.join(ROOT, '_sidebar_api.md'), apiSidebar, 'utf-8');
  console.log('Generated _sidebar_api.md');

  // Release Notes sidebar — sorted by Order descending, using TOCTitle
  const rnDir = path.join(ROOT, 'release-notes');
  const rnEntries = fs.readdirSync(rnDir)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(f => {
      const fm = parseFrontmatter(path.join(rnDir, f));
      return {
        file: f.replace(/\.md$/, ''),
        order: parseInt(fm.Order, 10) || 0,
        title: fm.TOCTitle || f.replace(/\.md$/, '')
      };
    })
    .sort((a, b) => b.order - a.order);

  let rnSidebar = '';
  for (const entry of rnEntries) {
    rnSidebar += `- [${entry.title}](/release-notes/${entry.file})\n`;
  }
  fs.writeFileSync(path.join(ROOT, '_sidebar_release-notes.md'), rnSidebar, 'utf-8');
  console.log('Generated _sidebar_release-notes.md');

  // Blogs sidebar — sorted by Order descending, using TOCTitle, grouped by year
  const blogsDir = path.join(ROOT, 'blogs');
  const blogEntries = [];
  const years = fs.readdirSync(blogsDir).filter(d => /^\d{4}$/.test(d));
  for (const year of years) {
    const yearDir = path.join(blogsDir, year);
    const months = fs.readdirSync(yearDir).filter(d =>
      fs.statSync(path.join(yearDir, d)).isDirectory()
    );
    for (const month of months) {
      const monthDir = path.join(yearDir, month);
      const days = fs.readdirSync(monthDir).filter(d =>
        fs.statSync(path.join(monthDir, d)).isDirectory()
      );
      for (const day of days) {
        const dayDir = path.join(monthDir, day);
        const posts = fs.readdirSync(dayDir).filter(f => f.endsWith('.md'));
        for (const post of posts) {
          const fm = parseFrontmatter(path.join(dayDir, post));
          blogEntries.push({
            year,
            path: `/blogs/${year}/${month}/${day}/${post.replace(/\.md$/, '')}`,
            order: parseInt(fm.Order, 10) || 0,
            title: fm.TOCTitle || post.replace(/\.md$/, '').replace(/-/g, ' ')
          });
        }
      }
    }
  }
  blogEntries.sort((a, b) => b.order - a.order);

  let blogsSidebar = '';
  let currentYear = '';
  for (const entry of blogEntries) {
    if (entry.year !== currentYear) {
      currentYear = entry.year;
      blogsSidebar += `- **${currentYear}**\n`;
    }
    blogsSidebar += `  - [${entry.title}](${entry.path})\n`;
  }
  fs.writeFileSync(path.join(ROOT, '_sidebar_blogs.md'), blogsSidebar, 'utf-8');
  console.log('Generated _sidebar_blogs.md');

  // Default sidebar (for root page)
  fs.copyFileSync(
    path.join(ROOT, '_sidebar_docs.md'),
    path.join(ROOT, '_sidebar.md')
  );
  console.log('Generated _sidebar.md (default → docs)');
}

buildSidebar();
