const path = require('path');
const rootPackage = require('../../package.json');
const rootVersion = rootPackage.version;

/*
  create a define plugin which will add the root version to the build
  this is used to load the correct sources from the sources.2sxc.org server
*/
function createDefinePlugin(webpack) {
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
  // const nodeEnv = mode;
  const isProd = isProduction(mode); // mode === 'production';
  // const pjson = require('../package.json');
  console.log('setExternalSourceMaps:isprod', isProd, '; process.env... ', process.env.NODE_ENV);

  if (isProd) {
    // devTool option is not needed anymore for prod
    // but for development it's just easier to use then SourceMapDevToolPlugin
    configuration.devtool = false;

    if (!configuration.plugins) { configuration.plugins = []; }

    const sourceMapDevToolPlugin = new webpack.SourceMapDevToolPlugin({
      // this is the url of our local sourcemap server
      publicPath: module.exports.ExternalSourcePath(part), // 'https://sources.2sxc.org/' + rootVersion + '/' + part + '/',
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

function isProduction(mode) {
  return mode === 'production';
}

function createCopyAfterBuildPlugin(source, targets, addon) {
  console.log('createCopyAfterBuildPlugin:source', source, '; targets', targets, '; addon', addon);
  if (!source || !targets) return null;
  if (!Array.isArray(targets)) throw `targets should be an array: ${targets}`;
  if (!addon) throw "addon parameter missing - something like 'inpage'";
  const WebpackShellPlugin = require('webpack-shell-plugin-next');
  const commands = [
    'echo Webpack Compile done - will now copy from project assets to DNN',
    // folders in robocopy need to have a space after the name before closing " - special bug
    // 'robocopy /mir /nfl /ndl /njs "' + source + ' " "' + target + ' " & exit 0'
  ];
  targets.forEach(t => {
    commands.push('robocopy /mir /nfl /ndl /njs "' + source + ' " "' + path.join(t, addon) + ' " & exit 0');
  });
  return new WebpackShellPlugin({
    // must use onBuildExit and not onBuildEnd, as i18n files are otherwise not ready yet
    onBuildExit: {
      scripts: commands,
      parallel: false,
      blocking: true,
      safe: true, // experimental...
    },
    dev: false  // run on every build end, not just once
  })
}

module.exports.isProduction = isProduction;
module.exports.SetExternalSourceMaps = setExternalSourceMaps;
module.exports.CreateDefinePlugin = createDefinePlugin;
module.exports.Version = rootVersion;
module.exports.createCopyAfterBuildPlugin = createCopyAfterBuildPlugin;
module.exports.ExternalSourcePath = (part) => 'https://sources.2sxc.org/' + rootVersion + '/' + part + '/';
