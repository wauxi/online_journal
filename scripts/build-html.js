const fs = require('fs');
const path = require('path');

// Read the source HTML file
const sourcePath = path.join(__dirname, '..', 'diary.html');
const destPath = path.join(__dirname, '..', 'public', 'diary.html');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Read the HTML content
let html = fs.readFileSync(sourcePath, 'utf8');

// Replace paths from './public/' to './' for the version in public/ directory
html = html.replace(/\.\/public\//g, './');

// Write the file to public directory
fs.writeFileSync(destPath, html, 'utf8');

console.log('✓ Built diary.html successfully');
