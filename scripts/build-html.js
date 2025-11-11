const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const srcFile = path.join(repoRoot, 'diary.html');
const outDir = path.join(repoRoot, 'public');
const outFile = path.join(outDir, 'diary.html');

if (!fs.existsSync(srcFile)) {
  console.error('Source diary.html not found at', srcFile);
  process.exit(1);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

let content = fs.readFileSync(srcFile, 'utf8');

// Replace stylesheet path -> public/css
content = content.replace(/href="\.\/styles\/diary\.css"/g, 'href="./css/diary.css"');

// Replace image paths (img/ -> ./assets/img/)
content = content.replace(/src=("|')img\//g, 'src=$1./assets/img/');

// Replace cake link to public assets
content = content.replace(/href=("|')cake\/index\.html("|')/g, 'href=$1./assets/cake/index.html$2');

fs.writeFileSync(outFile, content, 'utf8');
console.log('Wrote', outFile);
