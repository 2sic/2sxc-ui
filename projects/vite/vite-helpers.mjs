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
function createDefineReplacements(mode, isProd) {
  console.log('Define Replacements: ', mode, isProd);
  return {
    ROOTVERSION: JSON.stringify(rootVersion),
    IsDevBuild: !isProd,
    'process.env.NODE_ENV': JSON.stringify(mode),
  };
}

/**
 * Configure source maps for Vite based on production mode
 * In production, we want external source maps
 * In development, we want inline source maps
 */
function getSourceMapConfig(mode, part = 'js') {
  const isProd = isProduction(mode);
  
  if (isProd) {
    // External source maps in production
    return {
      sourcemap: true, // Generate external .map files
      sourcemapBaseUrl: ExternalSourcePath(part), // Base URL for source maps
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
 * @param {string} source - Source directory to copy from
 * @param {string[]} targets - Array of target directories
 * @param {string} addon - Subdirectory path to append to targets
 * @param {function} filter - Optional filter function (filePath, stat) => boolean
 */
function createCopyAfterBuildPlugin(source, targets, addon, filter) {
  console.log('createCopyAfterBuildPlugin:source', source, '; targets', targets, '; addon', addon);
  if (!source || !targets)
    return null;
  if (!Array.isArray(targets))
    throw new Error(`targets should be an array: ${targets}`);
  if (!addon)
    throw new Error("addon parameter missing - something like 'js'");

  return {
    name: 'copy-after-build',
    closeBundle: async () => {
      console.log('Vite build done - will now copy from project assets to targets');
      
      // Use fs-extra for copying
      for (const target of targets) {
        const destPath = path.join(target, addon);
        try {
          await fs.copy(source, destPath, {
            overwrite: true,
            errorOnExist: false,
            filter: filter,
          });
          console.log(`Copied from ${source} to ${destPath}`);
        } catch (err) {
          console.error(`Error copying to ${destPath}:`, err);
        }
      }
    },
  };
}

/**
 * Create a Vite plugin to copy and transform i18n JSON files to JS
 * This replaces the copy-webpack-plugin functionality
 * Only runs if i18n folder exists in the calling project
 */
function createI18nCopyPlugin(baseDir) {
  return {
    name: 'copy-i18n',
    closeBundle: async () => {
      const i18nSource = path.resolve(baseDir || import.meta.dirname, 'i18n');
      
      // Check if i18n folder exists, skip if not
      const i18nExists = await fs.pathExists(i18nSource);
      if (!i18nExists) {
        return;
      }
      
      const i18nDest = path.resolve(baseDir || import.meta.dirname, 'dist/i18n');
      
      // Ensure destination directory exists
      await fs.ensureDir(i18nDest);
      
      // Read all JSON files from i18n folder
      const files = await fs.readdir(i18nSource);
      const jsonFiles = files.filter(f => f.endsWith('.json'));
      
      for (const file of jsonFiles) {
        const sourcePath = path.join(i18nSource, file);
        const destPath = path.join(i18nDest, file.replace('.json', '.js'));
        
        // Copy file (just copy as-is, the .js extension signals it's ready)
        await fs.copy(sourcePath, destPath);
        console.log(`Copied i18n: ${file} -> ${path.basename(destPath)}`);
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
  createI18nCopyPlugin,
  ExternalSourcePath,
};

export const Version = rootVersion;
