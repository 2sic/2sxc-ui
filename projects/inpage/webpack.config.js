const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const webpackHelpers = require('../webpack/webpack-helpers.js');
// const buildConfig = require('@2sic.com/2sxc-load-build-config').BuildConfig;
const buildConfig = require('../../packages/2sxc-load-build-config').BuildConfig;
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const bundleName = "inpage";

const assetsTarget = buildConfig.hasSource ? path.join(buildConfig.source, 'dist', bundleName) : null;
const assetsTargetFallback = path.resolve(__dirname, 'dist');

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
    webpackHelpers.createCopyAfterBuildPlugin(assetsTarget, [...(buildConfig.Sources ?? []), ...(buildConfig.JsTargets ?? [])], path.join('dist', bundleName)),
    new BundleAnalyzerPlugin({
      // disable this to get stats and optimize
      analyzerMode: 'disabled',
    }),
  ].filter(item => item !== null),
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
          { loader: 'css-loader', options: { sourceMap: true } },
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        include: [/src/, /icons/],
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          // "style-loader",
          // { loader: 'css-loader', options: { sourceMap: true } },
          "css-loader",
          "sass-loader",
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
    path: (buildConfig.hasSource) ? assetsTarget : assetsTargetFallback,
    library: '$2sxcInpage',
  },
  stats: {
    errorDetails: true
  }
};

/* change source map generation based on production mode */
module.exports = (env, argv) => {
  webpackHelpers.SetExternalSourceMaps(webpack, argv.mode, configuration, `dist/${bundleName}`);
  return configuration;
}
