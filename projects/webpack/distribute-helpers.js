var cpx = require('cpx');
var chalk = require('chalk');

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

module.exports.showCopyProgress = showCopyProgress;
module.exports.startCpx = startCpx;