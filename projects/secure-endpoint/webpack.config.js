const path = require('path');
const webpack = require('webpack');
const webpackHelpers = require('../webpack/webpack-helpers.js');
// const buildConfig = require('@2sic.com/2sxc-load-build-config').BuildConfig;
const buildConfig = require('../../packages/2sxc-load-build-config').BuildConfig;
const assetsTarget = (buildConfig.hasSource) ? path.join(buildConfig.source, 'js') : null;
const assetsTargetFallback = path.resolve(__dirname, 'dist');

const configuration = {
  mode: 'development',
  entry: "./src/index.ts",
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "2sxc.secure-endpoint" + ".min.js",
    path: (buildConfig.hasSource) ? assetsTarget : assetsTargetFallback,
    library: '$2sxcSecureEndpointLibrary',
  },
  plugins: [
    webpackHelpers.CreateDefinePlugin(webpack),
    // after build, copy the files from the project assets
    webpackHelpers.createCopyAfterBuildPlugin(assetsTarget, buildConfig.JsTargets, 'js'),
  ].filter(item => item !== null)
};

/* change source map generation based on production mode */

module.exports = (env, argv) => {
  webpackHelpers.SetExternalSourceMaps(webpack, argv.mode, configuration, 'js');
  return configuration;
}
