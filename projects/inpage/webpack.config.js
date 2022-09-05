const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const webpackHelpers = require('../webpack/webpack-helpers.js');
const CopyPlugin = require('copy-webpack-plugin');

const bundleName = "inpage";
// const dnnTarget = webpackHelpers.DnnTargetFolder + '/dist/' + bundleName;
const assetsTarget = webpackHelpers.AssetsTarget + '/dist/' + bundleName;

const configuration = {
  mode: 'development',
  entry: "./src/index.ts",
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({})
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'inpage.min.css',
    }),
    webpackHelpers.CreateDefinePlugin(webpack),
    new CopyPlugin({
      patterns: [
        {
          from: './i18n/*.json',
          to: './i18n/[name].js',
          toType: 'template'
        }
      ],
    }),
    webpackHelpers.createCopyAfterBuildPlugin(assetsTarget, webpackHelpers.TargetsWithoutAssets, '/dist/' + bundleName),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: [/src/, /icons/],
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { sourceMap: true } }
        ]
      },
      {
        // place images and font-files directly into the CSS
        // makes deployment, cache-breaking etc. much easier and transfers fewer files
        test: /\.(png|woff|svg)$/,
        exclude: /node_modules/,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: bundleName + ".min.js",
    path: assetsTarget, // webpackHelpers.DnnTargetFolder + '/dist/' + bundleName,
    library: '$2sxcInpage',
  },
  stats: {
    errorDetails: true
  }
};

/* change source map generation based on production mode */
module.exports = (env, argv) => {
  webpackHelpers.SetExternalSourceMaps(webpack, argv.mode, configuration, bundleName);
  return configuration;
}
