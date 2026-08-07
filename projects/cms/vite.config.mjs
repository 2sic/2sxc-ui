import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import * as sass from 'sass';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import { createCopyAfterBuildPlugin, getSourceMapConfig, ExternalSourcePath } from '../vite/vite-helpers.mjs';

// Load build config using require (CommonJS module)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Figure out distribution specs from the standard '2sxc-build.config.json' file in this folder or parent folders
const buildConfig = require('../../packages/2sxc-load-build-config').BuildConfig;

const bundleName = 'cms';

// Pickup path for dist, to then copy to other targets
const distPath = path.resolve(import.meta.dirname, 'dist');

// SCSS file to compile
const scssPath = path.resolve(import.meta.dirname, 'src/scss/wysiwyg.scss');
const scssFiles = new Set();

export default defineConfig(({ mode }) => {
  const sourceMapConfig = getSourceMapConfig(mode, `dist/${bundleName}`);
  const isProd = mode === 'production';

  return {
    // Build configuration
    build: {
      // Source maps configuration
      sourcemap: true,
      
      // Library mode configuration for minimal JS output
      lib: {
        entry: './src/index.js',
        name: 'wysiwyg',
        formats: ['es'],
        fileName: () => 'wysiwyg.min.js',
      },
      
      // Minification
      minify: isProd,
      
      // Rollup options
      rollupOptions: {
        output: {
          // Images and other assets go to images/ folder
          assetFileNames: (assetInfo) => {
            if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name)) {
              return 'images/[name][extname]';
            }
            return assetInfo.name;
          },
        },
      },
    },

    // Resolve configuration
    resolve: {
      extensions: ['.js', '.scss', '.css'],
    },

    // Plugins
    plugins: [
      // Custom SCSS compilation plugin with proper source maps
      {
        name: 'compile-scss-to-css',

        buildStart() {
          this.addWatchFile(scssPath);
          scssFiles.forEach(file => this.addWatchFile(file));
        },

        async generateBundle(options, bundle) {
          // Compile SCSS with source maps
          const result = sass.compile(scssPath, {
            sourceMap: true,
            style: isProd ? 'compressed' : 'expanded',
            silenceDeprecations: ['import', 'slash-div'],
          });

          // Track loaded files for watch mode
          result.loadedUrls.forEach(url => {
            if (url.protocol === 'file:') {
              const filePath = fileURLToPath(url);
              scssFiles.add(filePath);
              this.addWatchFile(filePath);
            }
          });

          // Process with PostCSS (autoprefixer)
          const postcssResult = await postcss([autoprefixer()]).process(result.css, {
            from: scssPath,
            to: 'wysiwyg.min.css',
            map: {
              inline: false,
              annotation: true,
              prev: result.sourceMap ? JSON.stringify(result.sourceMap) : false,
            },
          });

          // Modify source map URL if in production
          let cssContent = postcssResult.css;
          if (isProd && sourceMapConfig.sourcemapBaseUrl) {
            // Replace source map comment with external URL
            cssContent = cssContent.replace(
              /\/\*# sourceMappingURL=.*\*\/$/,
              `/*# sourceMappingURL=${sourceMapConfig.sourcemapBaseUrl}wysiwyg.min.css.map */`
            );
          }

          // Emit CSS file
          this.emitFile({ 
            type: 'asset', 
            fileName: 'wysiwyg.min.css', 
            source: cssContent 
          });

          // Emit source map file
          if (postcssResult.map) {
            this.emitFile({ 
              type: 'asset', 
              fileName: 'wysiwyg.min.css.map', 
              source: postcssResult.map.toString() 
            });
          }
        },
      },

      // Copy files after build (only if source target exists)
      // Filter out the empty .js file since this is CSS-only
      buildConfig.hasSource && createCopyAfterBuildPlugin(
        distPath,
        [buildConfig.source, ...buildConfig.JsTargets],
        path.join('dist', bundleName),
        (src) => !path.basename(src).endsWith('.js') // Exclude .js files
      ),
    ].filter(Boolean),
  };
});
