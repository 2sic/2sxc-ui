const webpack = require('webpack');

/*
  2dm: change source map generation based on production mode
  our goal is to not include source maps in the distribution
  but have them when developing
*/
function setExternalSourceMaps(mode, configuration, part) {
  const nodeEnv = mode;// (process.env.NODE_ENV || 'development').trim(); // trim is important because of an issue with package.json
  const isProd = nodeEnv === 'production';
  const pjson = require('../package.json');

  console.log('setExternalSourceMaps:isprod', isProd, '; process.env... ', process.env.NODE_ENV);

  if (isProd) {
    // devTool option is not needed anymore for prod
    // but for development it's just easier to use then SourceMapDevToolPlugin
    configuration.devtool = false;

    if (!configuration.plugins) { configuration.plugins = []; }

    const sourceMapDevToolPlugin = new webpack.SourceMapDevToolPlugin({
      // this is the url of our local sourcemap server
      publicPath: 'https://sources.2sxc.org/' + pjson.version + '/' + part + '/',// + path,
      filename: '[file].map',
    });

    configuration.plugins = [
      // ... other plugins
      ...configuration.plugins,
      sourceMapDevToolPlugin,
    ];
    delete configuration.devtool;
  }

  return configuration;
}

module.exports.setExternalSourceMaps = setExternalSourceMaps;
