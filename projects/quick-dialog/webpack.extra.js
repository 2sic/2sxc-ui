const webpack = require('webpack');
const nodeEnv = (process.env.NODE_ENV || 'development').trim(); // trim is important because of an issue with package.json
const webpackHelpers = require('../webpack/webpack-helpers');

// set to true to see a lot of details about the plugins used
const debugWebpack = false;

// 2020-08-28 2dm adding i18n files
const CopyPlugin = require('copy-webpack-plugin');
var copyI18n = new CopyPlugin({
  patterns: [
    {
      from: './src/i18n/*.js*',
      to: './i18n',
      flatten: true,
      transformPath(targetPath, absolutePath) {
        // rename .json files to .js, so that they work on every web server
        // even if .json is not a registered mime type
        return targetPath.replace('.json', '.js');
      }
    },
  ],
});

// Function to reconfigure the existing options
module.exports = (config, _options, _targetOptions) => {
  const plugins = config.plugins;

  // if production, change how the source maps are made
  // check production based on angular info, but also on nodeEnv (just because it used to just be nodeEnv, and I'm not sure if we'll run into problems)
  if(config.mode == 'production' || webpackHelpers.isProduction(nodeEnv)) {
    // find the plugin with duckTyping - very unique property
    var sourceMapPluginConfig = plugins.find(p => p.fallbackModuleFilenameTemplate);
    sourceMapPluginConfig.options.publicPath = webpackHelpers.getSourcesRootUrl('ng');

    // new correction in Angular 11
    // Terser complains because the i18n js files are actually JSON, so it's not really valid JS.
    // Find all terser plugins and exclude our i18n js files. Can have multiple for whatever reason
    var optimization = config.optimization;
    var terserPlugins = optimization.minimizer.filter(m => m.options && m.options.terserOptions);
    terserPlugins.forEach(terser => {
      if (!Array.isArray(terser.options.exclude)) {
        // include previous value, if it had one
        terser.options.exclude = terser.options.exclude ? [terser.options.exclude] : [];
      }
      terser.options.exclude.push(/.*i18n\/[a-z]{2}\.js/);
    });
  }

  plugins.push(webpackHelpers.CreateDefinePlugin(webpack));
  plugins.push(copyI18n);
  if (debugWebpack) console.warn('plugins after modifications: ', config.plugins);
  return config;
}
