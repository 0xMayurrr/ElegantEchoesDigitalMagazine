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
  // Revert dark mode changes back to light mode
  content = content.replace(/bg-navy/g, 'bg-[#EEF4F8]');
  content = content.replace(/text-cream/g, 'text-navy');
  content = content.replace(/border-cream/g, 'border-navy');
  content = content.replace(/bg-primary/g, 'bg-[#D6E4F0]');
  content = content.replace(/hover:text-white/g, 'hover:text-navy');
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Reverted ${file}`);
});
