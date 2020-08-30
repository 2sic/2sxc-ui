
const chalk = require('chalk');
const webpackHelpers = require('./webpack-helpers.js');
const cpxHelpers = require('./distribute-helpers2.js');

// Get arguments from command line
const args = process.argv.slice(2);
console.log(chalk.blue(`Process running in ${process.cwd()} with args: `, args));

if(args.length < 2) throw "Need src / dest parameters"
let argId = 0;
const root = args[argId++];
// const part = args[argId++];
const cpxSrc = root + '/**/*.*'; // args[argId++];
const dst = args[argId++];
const watch = args.length >= argId && args[argId++] === '-w';

if(watch) 
  cpxHelpers.watchToCopy(root, cpxSrc, dst); //, createCallbackToRunAllCpx(cpxSrc, dst, watch)); 
else
  cpxHelpers.createCallbackToRunAllCpx(cpxSrc, dst, false)();

// function createCallbackToRunAllCpx(cpxFilter, targetAddOn, watch) {
//   return () => {
//     // Start CPX in copy or watch mode
//     cpxHelpers.startCpx(cpxFilter, webpackHelpers.AssetsTarget + targetAddOn, watch);
//     cpxHelpers.startCpx(cpxFilter, webpackHelpers.DnnTargetFolder + targetAddOn, watch);
//   }
// }

console.log(chalk.blue('Copy watchers running...'));
