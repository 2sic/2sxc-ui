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
        // rename .json files to .js, so that they work on every web server
        // even if .json is not a registered mime type
        transformPath(targetPath, absolutePath) {
          return targetPath.replace('.json', '.js');
        }
      },
    ],
  });

module.exports = (config, _options, _targetOptions) => {
  const plugins = config.plugins;

  // if production, change how the source maps are made
  if(webpackHelpers.isProduction(nodeEnv)) {
    // find the plugin with duckTyping - very unique property
    var sourceMapPluginConfig = plugins.find(p => p.fallbackModuleFilenameTemplate);
    sourceMapPluginConfig.options.publicPath = webpackHelpers.getSourcesRootUrl('ng');
  }

  plugins.push(webpackHelpers.CreateDefinePlugin(webpack));
  plugins.push(copyI18n);
  if (debugWebpack) console.warn('plugins after modifications: ', config.plugins);
  return config;
}
