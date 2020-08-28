
var chalk = require('chalk');
const webpackHelpers = require('./webpack-helpers.js');
const cpxHelpers = require('./distribute-helpers.js');

// Get arguments from command line
const args = process.argv.slice(2);
console.log(chalk.blue(`Process running in ${process.cwd()} with args: `, args));

if(args.length < 2) throw "Need src / dest parameters"
const src = args[0];
const dst = args[1];
const watch = args.length > 2 && args[2] === '-w';

var dnnTarget = webpackHelpers.DnnTargetFolder + dst;
var assetsTarget = webpackHelpers.AssetsTarget + dst;

// Start CPX in copy or watch mode
cpxHelpers.startCpx(src, assetsTarget, watch);
cpxHelpers.startCpx(src, dnnTarget, watch);

console.log(chalk.blue('Copy watchers running...'));
