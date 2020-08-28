const webpack = require('webpack');
const nodeEnv = (process.env.NODE_ENV || 'development').trim(); // trim is important because of an issue with package.json
const webpackHelpers = require('../webpack/webpack-helpers');

const debugWebpack = false;

var dnnTarget = webpackHelpers.DnnTargetFolder + '\\dist\\ng';
var assetsTarget = webpackHelpers.AssetsTarget + '\\dist\\ng';

// var configuration = {
//   plugins: [],
// };

// webpackHelpers.SetExternalSourceMaps(webpack, nodeEnv, configuration, 'ng');

// copy the build to 2sxc-assets and dnn
const dist = __dirname + '\\dist\\ng';
var copyAfterBuildPlugin = webpackHelpers.createCopyAfterBuildPlugin(dist, assetsTarget, dnnTarget);
// configuration.plugins.push(copyAfterBuildPlugin);

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

module.exports = (config, options, targetOptions) => {
  const plugins = config.plugins;

  // if production, change how the source maps are made
  if(webpackHelpers.isProduction(nodeEnv)) {
    var sourceMapPluginConfig = plugins.find(p => p.fallbackModuleFilenameTemplate);
    sourceMapPluginConfig.options.publicPath = webpackHelpers.getSourcesRootUrl('ng');
  }

  plugins.push(copyI18n);
  plugins.push(copyAfterBuildPlugin);
  if (debugWebpack) console.warn('plugins after changes', config.plugins);
  return config;
}
