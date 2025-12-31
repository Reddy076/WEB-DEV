const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

const contentDirs = ['docs', 'js-docs', 'html-docs'];
const outputDir = path.join(__dirname, '../src/data');
const outputFile = path.join(outputDir, 'search-index.json');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const docs = [];

contentDirs.forEach(dir => {
  const fullDir = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) return;

  const files = glob.sync('**/*.{md,mdx}', { cwd: fullDir });

  files.forEach(file => {
    const filePath = path.join(fullDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);

    // Determine route base path
    let routeBase = '/';
    if (dir === 'js-docs') routeBase = '/js/';
    if (dir === 'html-docs') routeBase = '/html/';

    // Construct slug/path
    const basename = path.basename(file, path.extname(file));
    const relativeDir = path.dirname(file);

    // Normalize path for URL
    let urlPath = path.join(routeBase, relativeDir, basename).replace(/\\/g, '/');
    if (urlPath.endsWith('/index')) urlPath = urlPath.replace('/index', '');

    // Simple title/description extraction
    const title = data.title || basename;
    const description = data.description || '';
    // Basic keywords extraction (optional)
    const keywords = data.keywords || [];

    docs.push({
      limit: 15,
      title,
      description,
      path: urlPath,
      keywords
    });
  });
});

fs.writeFileSync(outputFile, JSON.stringify(docs, null, 2));
console.log(`Generated search index with ${docs.length} documents.`);
