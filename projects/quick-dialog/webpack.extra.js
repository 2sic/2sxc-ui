const webpack = require('webpack');
const nodeEnv = (process.env.NODE_ENV || 'development').trim(); // trim is important because of an issue with package.json

const webpackHelpers = require('../webpack/webpack-helpers');

var configuration = {};

webpackHelpers.SetExternalSourceMaps(webpack, nodeEnv, configuration, 'ng');

module.exports = configuration;
