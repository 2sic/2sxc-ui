const cpx = require('cpx');
const chalk = require('chalk');
const chokidar = require('chokidar');
const fs = require('fs-extra');
const webpackHelpers = require('./webpack-helpers.js');

const debug = true;

function showCopyProgress(e) {
  var now = new Date();
  var time = `${(`0${now.getHours()}`).slice(-2)}:${(`0${now.getMinutes()}`).slice(-2)}:${(`0${now.getSeconds()}`).slice(-2)}`;
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




function runAllCpx(root, targetAddOn, watch) {
    const cpxFilter = root + '/**/*.*';
    // Start CPX in copy or watch mode
    startCpx(cpxFilter, webpackHelpers.AssetsTarget + targetAddOn, watch);
    startCpx(cpxFilter, webpackHelpers.DnnTargetFolder + targetAddOn, watch);
}

// Watch the dist folder till the important folders are created, then start file sync
function waitToRunAllCpx(path, targetAddOn) {
  const lastSlash = path.lastIndexOf('/');
  const parentPath = path.substr(0, lastSlash);
  const folderToWaitFor = path.substr(lastSlash + 1, 25);
  console.log(chalk.blue(`Watch to Copy '${parentPath}', '${folderToWaitFor}', '${targetAddOn}'`));


  var runInnerCallback = true;
  const watcher = chokidar.watch(parentPath);
  watcher
    .on('addDir', path => { 
        if(!runInnerCallback) return;
        if(debug) console.log(chalk.yellow(`checking '${path}'`));
        // If it's not the entry path we're looking for, just return
        if(!path.endsWith(`\\${folderToWaitFor}`) && !path.endsWith(`/${folderToWaitFor}`)) return;
        console.log(chalk.blue(`Folder ${chalk.yellow(folderToWaitFor)} created, will stop parent-watcher`));
        // call the main cpx routine - but wait ca. 1 second as changes to the dist could break CPX
        setTimeout(() => runAllCpx(path, targetAddOn, true), 1000);
        // prevent further auto-starts for now
        runInnerCallback = false;
    })
    .on('unlinkDir', path => {
        if(runInnerCallback) return;
        if(debug) console.log(chalk.yellow(`checking delete for '${path}'`));
        // If it's not the entry path we're looking for, just return
        if(path.endsWith(`\\${folderToWaitFor}`) && path.endsWith(`/${folderToWaitFor}`)) return;
        // If we got this far, then our main folder was removed
        // In this case, CPX will terminate, so we will need to restart it when it's created again
        console.log(chalk.blue(`Folder ${chalk.yellow(folderToWaitFor)} was removed, will re-activate auto-start when re-created.`));
        runInnerCallback = true;
    });
    console.log(chalk.blue(`Copy watchers running on '${parentPath}'`));
}

module.exports.showCopyProgress = showCopyProgress;
module.exports.waitToRunAllCpx = waitToRunAllCpx;
module.exports.runAllCpx = runAllCpx;