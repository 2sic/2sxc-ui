import { defineConfig } from 'vite';
import path from 'path';
import { createCopyAfterBuildPlugin, createDefineReplacements, getSourceMapConfig } from './vite-helpers.mjs';

// Load build config using require (CommonJS module)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const buildConfig = require('../../packages/2sxc-load-build-config').BuildConfig;

const assetsTarget = buildConfig.hasSource ? path.join(buildConfig.source, 'js') : null;
const assetsTargetFallback = path.resolve(import.meta.dirname, 'dist');

export default defineConfig(({ mode }) => {
  const sourceMapConfig = getSourceMapConfig(mode);
  const isProd = mode === 'production';

  return {
    // Define global constants
    define: createDefineReplacements(mode),

    // Build configuration
    build: {
      // Output directory
      outDir: buildConfig.hasSource ? assetsTarget : assetsTargetFallback,
      
      // Don't empty the output directory (similar to webpack behavior)
      emptyOutDir: false,
      
      // Library mode configuration
      lib: {
        entry: path.resolve(import.meta.dirname, 'src/2sxc.api.ts'),
        name: '$2sxcJsApi',
        formats: ['umd'], // UMD format to match webpack's library output
        fileName: () => '2sxc.api.min.js',
      },
      
      // Source maps configuration
      sourcemap: sourceMapConfig.sourcemap,
      
      // Minification
      minify: isProd ? 'terser' : false,
      
      // Terser options for production
      terserOptions: isProd ? {
        compress: {
          drop_console: false, // Keep console logs
        },
      } : undefined,
      
      // Target ES5 to match webpack config
      target: 'es2015',
      
      // Rollup options
      rollupOptions: {
        // External dependencies (if any)
        external: [],
        output: {
          // Sourcemap configuration for production
          ...(isProd && sourceMapConfig.sourcemapBaseUrl ? {
            sourcemapBaseUrl: sourceMapConfig.sourcemapBaseUrl,
          } : {}),
        },
      },
    },

    // Resolve configuration
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },

    // Plugins
    plugins: [
      // Copy files after build (only if source target exists)
      buildConfig.hasSource && createCopyAfterBuildPlugin(
        assetsTarget,
        buildConfig.JsTargets,
        'js'
      ),
    ].filter(Boolean),

    // Development server configuration
    server: {
      port: 3000,
      open: false,
    },
  };
});
