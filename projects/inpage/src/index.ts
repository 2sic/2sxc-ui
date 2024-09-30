import { SxcGlobal } from '../../$2sxc/src/sxc-global/sxc-global';
import { BootstrapInPage } from './bootstrap/bootstrap';
import { SxcGlobalCms } from './cms/sxc-global-cms';
import { ContextComplete } from './context/bundles/context-bundle-button';
import { translate, Translator } from './i18n';
import { EditManager } from './manage/edit-manager';
import { SxcGlobalManage } from './manage/sxc-global-manage';
import { NoJQ } from './plumbing';
import { QuickE } from './quick-edit/quick-e';
import { SxcGlobalWithCms } from './sxc/sxc-global-with-cms';
import { SystemUpgrader } from './system';

// Exports for Docs
export * from './commands';
export * from './cms';
export * from './quick-edit';
export * from './sxc';
export * from './workflow';


/**
 * @internal
 */
import './toolbar/toolbar-global-enable-shake';

// #1 Note that $2sxc must always exist, the server ensures the load order
const $2sxc = window.$2sxc as SxcGlobal & SxcGlobalWithCms;
const wasLoaded = !!$2sxc._manage; // for Oqtane

// #2 Now attach initialization helpers and global objects, so that $2sxc always has these
$2sxc.context ??= ContextComplete.findContext; // primary API to get the context
$2sxc._translateInit ??= (manage: EditManager) => Translator.initManager(manage); // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
$2sxc.translate ??= translate; // provide an official translate API for 2sxc
$2sxc._manage ??= new SxcGlobalManage(); // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
$2sxc.cms ??= new SxcGlobalCms();
$2sxc.system ??= new SystemUpgrader(); // this enhances the $2sxc client controller with stuff only needed when logged in
window.$quickE ??= QuickE.singleton(); // store QuickE as global object so it can be reused in case of multiple loads of inpage script

// #3 Initialize all objects as needed
// before calling check if already initialized, just in case these scripts were loaded multiple times
function loadInpage() {
  // The bootstrapper code could be more optimized for multiple loads, 
  // but it was not feasible to do so at this time. 
  const bootstrapper = new BootstrapInPage();
  bootstrapper.initialize();
  QuickE.singleton().start();
}

// For Oqtane, we shouldn't reinitialize inpage if the script is loaded more than once.
if (!wasLoaded)
  NoJQ.ready(loadInpage); // Initialize all on first load, first script
else
  NoJQ.ready(() => window.$quickE.start()); // Just start quickE

// Apply Dnn Bugfixes
import './dnn/index';

import './styles/index.scss';
import { Debug } from './constants/debug';

// TODO: @2dm - this doesn't quite work - only in $2sxc / core but not in the inpage
// probably because it seems to have a duplicate copy of the $2sxc code...
// Debug.log('2sxc inpage - dev mode!');