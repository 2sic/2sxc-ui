const webpack = require('webpack');
const webpackHelpers = require('../webpack/webpack-helpers.js');

const dnnTarget = webpackHelpers.DnnTargetFolder + 'js';
const assetsTarget = webpackHelpers.AssetsTarget + 'js';

function buildConfiguration(env, argv) {
  const configuration = {
    mode: 'development',
    entry: './src/2sxc.api.ts',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: argv.onlyTypings ? 'tsconfig.typings.json' : 'tsconfig.json'
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: '2sxc.api' + '.min.js',
      path: assetsTarget,
      library: '$2sxcJsApi',
    },
    plugins: [
      webpackHelpers.CreateDefinePlugin(webpack),
      ...(
        argv.onlyTypings
          ? []
          // after build, copy the files from the project assets
          : [webpackHelpers.createCopyAfterBuildPlugin(assetsTarget, /* dnnTarget */ webpackHelpers.TargetsWithoutAssets, 'js')]
      )
    ]
  };
  return configuration;
}

module.exports = (env, argv) => {
  const configuration = buildConfiguration(env, argv);
  if (!argv.onlyTypings) {
    // change source map generation based on production mode
    webpackHelpers.SetExternalSourceMaps(webpack, argv.mode, configuration, 'js');
  }
  return configuration;
}
