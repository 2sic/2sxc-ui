
const rootPackage = require('../../package.json');
const rootVersion = rootPackage.version;

var dnnRoot = process.env.Dev2sxcDnnRoot;
if(!dnnRoot) throw "Problem: environment variable 'Dev2sxcDnnRoot' doesn't exist. It should point to the web folder of your dev DNN";
var targetDnn = (dnnRoot + "\\DesktopModules\\ToSIC_SexyContent\\").replace('//', '/').replace('\\\\', '\\');

var oqtRoot = process.env.Dev2sxcOqtaneRoot;
if(!oqtRoot) console.log("Oqtane root env variable Dev2sxcOqtaneRoot doesn't exist - will not build to oqtane. It should point to your OqtaneServer root path before wwwroot");
var targetOqt = oqtRoot + '\\wwwroot\\Modules\\ToSic.Sxc\\';

var devAssets = process.env.Dev2sxcAssets;
if(!devAssets) throw "Problem: environment variable 'Dev2sxcAssets' doesn't exist. It should point to the assets source folder in your 2sxc environment";
const targetAssets = (devAssets + '\\').replace('//', '/').replace('\\\\', '\\')

console.log('Will build to these targets: \n'
    + "* Dnn:  " + targetDnn + "\n"
    + '* 2sxc: ' + devAssets + '\n\n'
);

function CreateDefinePlugin(webpack) {
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
//   const pjson = require('../package.json');

  console.log('setExternalSourceMaps:isprod', isProd, '; process.env... ', process.env.NODE_ENV);

  if (isProd) {
    // devTool option is not needed anymore for prod
    // but for development it's just easier to use then SourceMapDevToolPlugin
    configuration.devtool = false;

    if (!configuration.plugins) { configuration.plugins = []; }

    const sourceMapDevToolPlugin = new webpack.SourceMapDevToolPlugin({
      // this is the url of our local sourcemap server
      publicPath: getSourcesRootUrl(part), // 'https://sources.2sxc.org/' + rootVersion + '/' + part + '/',
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

function getSourcesRootUrl(part) {
    return 'https://sources.2sxc.org/' + rootVersion + '/' + part + '/';
}

function isProduction(mode) {
    return mode === 'production';
}

function createCopyAfterBuildPlugin(source, targets, addon) { // , target2) {
    if(!Array.isArray(targets)) throw "Targets should be an array";
    if(!addon) throw "addon parameter missing - something like 'inpage'";


    const WebpackShellPlugin = require('webpack-shell-plugin-next');
    const commands = [
        'echo Webpack Compile done - will now copy from project assets to DNN',
        // folders in robocopy need to have a space after the name before closing " - special bug
        // 'robocopy /mir /nfl /ndl /njs "' + source + ' " "' + target + ' " & exit 0'
    ];
    targets.forEach(t => {
        commands.push('robocopy /mir /nfl /ndl /njs "' + source + ' " "' + t + addon + ' " & exit 0');
    });
    // if(target2) commands.push('robocopy /mir /nfl /ndl /njs "' + source + ' " "' + target2 + ' " & exit 0');
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
module.exports.getSourcesRootUrl = getSourcesRootUrl;
module.exports.SetExternalSourceMaps = setExternalSourceMaps;
module.exports.CreateDefinePlugin = CreateDefinePlugin;
module.exports.Version = rootVersion;
module.exports.DnnTargetFolder = targetDnn;
module.exports.AssetsTarget = targetAssets;
module.exports.createCopyAfterBuildPlugin = createCopyAfterBuildPlugin;

// new 2020-10-30 for multi-targets
var targets = [targetDnn, targetAssets];
var targetsWithoutAssets = [targetDnn];
if(targetOqt) {
    targets.push(targetOqt);
    targetsWithoutAssets.push(targetOqt);
}
module.exports.Targets = targets;
module.exports.TargetsWithoutAssets = targetsWithoutAssets;

module.exports.ExternalSourcePath = (part) => 'https://sources.2sxc.org/' + rootVersion + '/' + part + '/';
