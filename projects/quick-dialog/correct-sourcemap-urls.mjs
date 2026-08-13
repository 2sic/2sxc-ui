import fs from 'fs/promises';
import path from 'path';
import { ExternalSourcePath } from '../vite/vite-helpers.mjs';

const buildDir = path.resolve(import.meta.dirname, 'dist/quick-dialog/browser');
const publicPath = ExternalSourcePath('dist/quick-dialog');
const files = await fs.readdir(buildDir);

for (const file of files.filter(file => file.endsWith('.js'))) {
  const fullPath = path.join(buildDir, file);
  const source = await fs.readFile(fullPath, 'utf8');
  const corrected = source.replace(
    /\/\/# sourceMappingURL=([^\r\n]+)(?=\s*$)/,
    (_, mapFile) => `//# sourceMappingURL=${publicPath}${mapFile}`,
  );

  if (corrected === source)
    continue;

  await fs.writeFile(fullPath, corrected, 'utf8');
  console.log(`Corrected source map URL in ${file}`);
}
