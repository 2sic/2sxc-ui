
const rootPackage = require('../../package.json');
const rootVersion = rootPackage.version;

var envVars = process.env;
var dnnRoot = process.env.Dev2sxcDnnRoot;
if(!dnnRoot) throw "Problem: environment variable 'Dev2sxcDnnRoot' doesn't exist. It should point to the web folder of your dev DNN";
var targetDnn = (dnnRoot + "DesktopModules\\ToSIC_SexyContent\\").replace('//', '/').replace('\\\\', '\\');

var devAssets = process.env.Dev2sxcAssets;
if(!devAssets) throw "Problem: environment variable 'Dev2sxcAssets' doesn't exist. It should point to the assets source folder in your 2sxc environment";
const targetAssets = (devAssets + '\\').replace('//', '/').replace('\\\\', '\\')

console.log('Will build to these targets: \n'
    + "* Dnn:  " + targetDnn + "\n"
    + '* 2sxc: ' + devAssets + '\n\n'
);

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

function createCopyAfterBuildPlugin(source, target) {
    const WebpackShellPlugin = require('webpack-shell-plugin');
    return new WebpackShellPlugin({
        onBuildEnd: [
            'echo Webpack Compile done - will now copy from project assets to DNN',
            // special note: folders in robocopy need to have a space after the name before closing " - special bug
            'robocopy /mir /nfl /ndl /njs "' + source + ' " "' + target + ' " & exit 0'
        ],
        dev: false  // run on every build end, not just once
    })
}

module.exports.SetExternalSourceMaps = setExternalSourceMaps;
module.exports.CreateDefinePlugin = CreateDefinePlugin;
module.exports.Version = rootVersion;
module.exports.DnnTargetFolder = targetDnn; // "C:\\Projects\\2sxc-dnn742\\Website\\DesktopModules\\ToSIC_SexyContent\\";
module.exports.AssetsTarget = targetAssets;
module.exports.createCopyAfterBuildPlugin = createCopyAfterBuildPlugin;

module.exports.ExternalSourcePath = (part) => 'https://sources.2sxc.org/' + rootVersion + '/' + part + '/';