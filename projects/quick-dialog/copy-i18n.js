const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(__dirname, 'src/i18n');
const outputDir = path.resolve(__dirname, 'dist/quick-dialog/browser/i18n');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

fs.readdirSync(inputDir).forEach(file => {
  if (file.endsWith('.json')) {
    const src = path.join(inputDir, file);
    const dest = path.join(outputDir, file.replace('.json', '.js'));
    fs.copyFileSync(src, dest);
  }
});