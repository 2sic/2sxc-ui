
var cpx = require('cpx');
var chalk = require('chalk');
const webpackHelpers = require('./webpack-helpers');

console.log(chalk.red(process.cwd()));

//#region helpers

function showCopyProgress(e) {
  var now = new Date();
  var time =
    ("0" + now.getHours()).slice(-2)   + ":" +
    ("0" + now.getMinutes()).slice(-2) + ":" +
    ("0" + now.getSeconds()).slice(-2);
  console.log(chalk.green(`${time} copied : ${e.srcPath.padEnd(30, ' ')} -> ${e.dstPath}`));
}

function startCpx(src, target, useWatch) {
  const msgWatch = useWatch ? '-watcher' : '';
  var cpxCommand = useWatch ? cpx.watch : cpx.copy;
  console.log(chalk.blue(`Starting copy${msgWatch} for '${src}' to '${target}'`));
  cpxCommand(src, target, {
    clean: true,
  }).on("copy", showCopyProgress);
}

//#endregion

// Get arguments from command line
const args = process.argv.slice(2);
console.log("args:", args);

if(args.length < 2) throw "Need src / dest parameters"
const src = args[0];
const dst = args[1];

let watch = args.length > 2 && args[2] === '-w';

var dnnTarget = webpackHelpers.DnnTargetFolder + dst;
var assetsTarget = webpackHelpers.AssetsTarget + dst;

// Start CPX in copy or watch mode
startCpx(src, assetsTarget, watch);
startCpx(src, dnnTarget, watch);

console.log(chalk.blue('Copy watchers running...'));
