const webpack = require('webpack');
const nodeEnv = (process.env.NODE_ENV || 'development').trim(); // trim is important because of an issue with package.json

const webpackHelpers = require('../webpack/webpack-helpers');

var configuration = {};

webpackHelpers.SetExternalSourceMaps(webpack, nodeEnv, configuration, 'ng');

// 2020-07-28 2dm adding i18n files
// not working - so I'll just pre-rename to .js to be safe
// console.log('maybe doing extra i18n');
// if (!configuration.plugins) { configuration.plugins = []; }
// const CopyPlugin = require('copy-webpack-plugin');
// configuration.plugins.push(
//   new CopyPlugin({
//     patterns: [
//       {
//         from: './src/i18n/*.js*',
//         to: './i18n',
//         flatten: true,
//         // transformPath(targetPath, absolutePath) {
//         //   console.log('debug');
//         //   return targetPath;
//         // }
//       },
//       {
//         from: './i18n/*.*',
//         to: './test'
//       },
//     ],
//   })
// )
// console.log('config added', configuration.plugins);

module.exports = configuration;
