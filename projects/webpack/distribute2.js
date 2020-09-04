
const chalk = require('chalk');
const cpxHelpers = require('./distribute-helpers2.js');

// Get arguments from command line
const args = process.argv.slice(2);
console.log(chalk.blue(`Process running in ${process.cwd()} with args: `, args));

if(args.length < 2) throw "Need src / dest parameters"
let argId = 0;
const root = args[argId++];
const dst = args[argId++];
const watch = args.length >= argId && args[argId++] === '-w';

if(watch) 
  cpxHelpers.waitToRunAllCpx(root, dst);
else
  cpxHelpers.runAllCpx(root, dst, false);

console.log(chalk.blue('Copy watchers running...'));
