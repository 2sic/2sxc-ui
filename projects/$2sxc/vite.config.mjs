import { defineConfig } from 'vite';
import path from 'path';
import { createCopyAfterBuildPlugin, createDefineReplacements, getSourceMapConfig } from '../vite/vite-helpers.mjs';

// Load build config using require (CommonJS module)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Figure out distribution specs from the standard '2sxc-build.config.json' file in this folder or parent folders
const buildConfig = require('../../packages/2sxc-load-build-config').BuildConfig;

// Pickup path for dist, to then copy to other targets
const distPath = path.resolve(import.meta.dirname, 'dist');

export default defineConfig(({ mode }) => {
  const sourceMapConfig = getSourceMapConfig(mode);
  const isProd = mode === 'production';

  return {
    // Define global constants
    define: createDefineReplacements(mode, isProd),

    // Build configuration
    build: {
      // Library mode configuration
      lib: {
        entry: './src/2sxc.api.ts',
        name: '$2sxcJsApi',
        // Research: UMD is smaller than `es` and seems to be preferred for direct download
        // while `es` would be better if the JS was distributed in npm (as it contains info for future tree-shaking)
        formats: ['umd'],
        fileName: () => '2sxc.api.min.js',
      },
      
      // Source maps configuration
      sourcemap: sourceMapConfig.sourcemap,
      
      // Minification
      minify: isProd,
            
      // Rollup options
      rollupOptions: {
        // External dependencies (if any)
        external: [],
        output: {
          // Sourcemap configuration for production
          ...(isProd && sourceMapConfig.sourcemapBaseUrl
            ? {
                sourcemapBaseUrl: sourceMapConfig.sourcemapBaseUrl,
              }
            : {}
          ),
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
      buildConfig.hasSource && createCopyAfterBuildPlugin(distPath, [buildConfig.source, ...buildConfig.JsTargets], 'js'),
    ].filter(Boolean),
  };
});
