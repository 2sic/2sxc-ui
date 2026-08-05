import path from 'path';
import fs from 'fs-extra';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const rootPackage = require('../../package.json');
const rootVersion = rootPackage.version;

/**
 * Create define replacements for Vite
 * This replaces the webpack DefinePlugin functionality
 */
function createDefineReplacements(mode) {
  return {
    ROOTVERSION: JSON.stringify(rootVersion),
    IsDevBuild: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  };
}

/**
 * Configure source maps for Vite based on production mode
 * In production, we want external source maps
 * In development, we want inline source maps
 */
function getSourceMapConfig(mode) {
  const isProd = isProduction(mode);
  
  if (isProd) {
    // External source maps in production
    return {
      sourcemap: true, // Generate external .map files
      sourcemapBaseUrl: ExternalSourcePath('js'), // Base URL for source maps
    };
  }
  
  // Inline source maps for development
  return {
    sourcemap: true,
  };
}

function isProduction(mode) {
  return mode === 'production';
}

/**
 * Create a Vite plugin to copy files after build
 * This replaces the webpack-shell-plugin-next functionality
 */
function createCopyAfterBuildPlugin(source, targets, addon) {
  console.log('createCopyAfterBuildPlugin:source', source, '; targets', targets, '; addon', addon);
  if (!source || !targets) return null;
  if (!Array.isArray(targets)) throw new Error(`targets should be an array: ${targets}`);
  if (!addon) throw new Error("addon parameter missing - something like 'js'");

  return {
    name: 'copy-after-build',
    closeBundle: async () => {
      console.log('Vite build done - will now copy from project assets to DNN');
      
      // Use fs-extra for copying
      for (const target of targets) {
        const destPath = path.join(target, addon);
        try {
          await fs.copy(source, destPath, {
            overwrite: true,
            errorOnExist: false,
          });
          console.log(`Copied from ${source} to ${destPath}`);
        } catch (err) {
          console.error(`Error copying to ${destPath}:`, err);
        }
      }
    },
  };
}

function ExternalSourcePath(part) {
  return 'https://sources.2sxc.org/' + rootVersion + '/' + part + '/';
}

export {
  isProduction,
  getSourceMapConfig,
  createDefineReplacements,
  createCopyAfterBuildPlugin,
  ExternalSourcePath,
};

export const Version = rootVersion;
