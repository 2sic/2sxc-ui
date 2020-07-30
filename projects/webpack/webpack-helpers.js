
const rootPackage = require('../../package.json');
const rootVersion = rootPackage.version;


function CreateDefinePlugin(webpack) {
    // const webpack = require('webpack');
    return new webpack.DefinePlugin({
        ROOTVERSION: JSON.stringify(rootVersion),
    });
}

/*
  2dm: change source map generation based on production mode
  our goal is to not include source maps in the distribution
  but have them when developing
*/
function setExternalSourceMaps(webpack, mode, configuration, part) {
  const nodeEnv = mode;
  const isProd = nodeEnv === 'production';
//   const pjson = require('../package.json');

  console.log('setExternalSourceMaps:isprod', isProd, '; process.env... ', process.env.NODE_ENV);

  if (isProd) {
    // devTool option is not needed anymore for prod
    // but for development it's just easier to use then SourceMapDevToolPlugin
    configuration.devtool = false;

    if (!configuration.plugins) { configuration.plugins = []; }

    const sourceMapDevToolPlugin = new webpack.SourceMapDevToolPlugin({
      // this is the url of our local sourcemap server
      publicPath: 'https://sources.2sxc.org/' + rootVersion + '/' + part + '/',
      filename: '[file].map',
    });

    configuration.plugins = [
      // ... other plugins
      ...configuration.plugins,
      sourceMapDevToolPlugin,
    ];
  }

  return configuration;
}

module.exports.SetExternalSourceMaps = setExternalSourceMaps;
module.exports.CreateDefinePlugin = CreateDefinePlugin;
module.exports.Version = rootVersion;
module.exports.DnnTargetFolder = "C:\\Projects\\2sxc-dnn742\\Website\\DesktopModules\\ToSIC_SexyContent\\";

module.exports.ExternalSourcePath = (part) => 'https://sources.2sxc.org/' + rootVersion + '/' + part + '/';