const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-remove-empty-scripts");
const webpack = require('webpack');
const webpackHelpers = require('../webpack/webpack-helpers.js');
const buildConfig = require('@2sic.com/2sxc-load-build-config').BuildConfig
const bundleName = "cms";

function getConfiguration(env) {
  return {
    entry: {
      wysiwyg: [`./src/scss/wysiwyg.scss`],
    },
    output: {
      filename: "wysiwyg.min.js",
      path: path.resolve(__dirname, `dist`)
    },
    mode: 'production',
    devtool: 'source-map',
    watch: env.watch,
    stats: {
      all: false,
      errors: true,
      assets: true
    },
    cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.temp_cache'),
      compression: 'gzip',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss']
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].min.css',
      }),
      webpackHelpers.createCopyAfterBuildPlugin('./dist/', [...(buildConfig.Sources ?? []), ...(buildConfig.JsTargets ?? [])], path.join('dist', bundleName)),
    ].filter(item => item !== null),
    module: {
      rules: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }]
      }
      ],
    },
  }
};

/* change source map generation based on production mode */
module.exports = (env, argv) => {
  const configuration = getConfiguration(env);
  webpackHelpers.SetExternalSourceMaps(webpack, argv.mode, configuration, `dist/${bundleName}`);
  return configuration;
}