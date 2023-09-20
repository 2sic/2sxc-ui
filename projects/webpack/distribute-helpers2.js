const path = require('path');
const cpx = require('cpx');
const chalk = require('chalk');
const chokidar = require('chokidar');
const fs = require('fs-extra');
// const bc = require('@2sic.com/2sxc-load-build-config');
const bc = require('../../packages/2sxc-load-build-config');
const buildConfig = bc.BuildConfig;
const debug = true;

function showCopyProgress(e) {
  var now = new Date();
  var time = `${(`0${now.getHours()}`).slice(-2)}:${(`0${now.getMinutes()}`).slice(-2)}:${(`0${now.getSeconds()}`).slice(-2)}`;
  console.log(chalk.green(`${time} copied : ${e.srcPath.padEnd(30, ' ')} -> ${e.dstPath}`));
}

function startCpx(src, target, useWatch) {
  console.log(chalk.blue(`Starting copy for '${src}' to '${target}' with watch=${useWatch}`));
  const msgWatch = useWatch ? '-watcher' : '';
  if (!useWatch) {
    // Clear destination folders
    fs.readdir(target, (err, files) => {
      // Skip this if the folder doesn't exist (eg. new setups)
      if (!files) return;
      files.forEach(file => {
        // delete old files except Default.aspx
        if (file === 'Default.aspx') return;
        fs.removeSync(path.join(target, file));
      });
    });
  }
  var cpxCommand = useWatch ? cpx.watch : cpx.copy;
  cpxCommand(src, target).on("copy", showCopyProgress);
}

function runAllCpx(root, targetAddOn, watch) {
    const cpxFilter = path.join(bc.fixPath(root, false, true),'/**/*.*');
    // Start CPX in copy or watch mode

    // dist to Sources
    buildConfig.Sources?.forEach(t => {
      startCpx(cpxFilter, path.join(t, targetAddOn), watch);
    });

    // dist to all JsTargets
    buildConfig.JsTargets?.forEach(t => {
        startCpx(cpxFilter, path.join(t, targetAddOn), watch);
    });
}

// Watch the dist folder till the important folders are created, then start file sync
function waitToRunAllCpx(runPath, targetAddOn) {
  const lastSlash = runPath.lastIndexOf('/');
  const parentPath = runPath.substr(0, lastSlash);
  const folderToWaitFor = runPath.substr(lastSlash + 1, 25);
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
