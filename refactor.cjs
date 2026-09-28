const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Replace all light themes with navy/dark equivalents
  content = content.replace(/bg-\[\#EEF4F8\]/g, 'bg-navy');
  content = content.replace(/text-navy/g, 'text-cream');
  content = content.replace(/border-navy/g, 'border-cream');
  content = content.replace(/bg-\[\#D6E4F0\]/g, 'bg-primary');
  content = content.replace(/hover:text-navy/g, 'hover:text-white');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
