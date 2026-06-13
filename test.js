const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const tags = html.match(/<\/?(div|section)[^>]*>/g) || [];
let depth = 0;
tags.forEach(t => {
  if (t.startsWith('</')) depth--;
  else if (!t.endsWith('/>')) depth++;
  if (t.includes('id="testimonials"')) console.log('testimonials depth:', depth);
  if (t.includes('id="register"')) console.log('register depth:', depth);
});
console.log('Final depth:', depth);
