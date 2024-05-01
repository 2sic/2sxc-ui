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

// #2 Now attach initialization helpers and global objects, so that $2sxc always has these
$2sxc.context = ContextComplete.findContext; // primary API to get the context
$2sxc._translateInit = (manage: EditManager) => Translator.initManager(manage); // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
$2sxc.translate = translate;    // provide an official translate API for 2sxc
$2sxc._manage = new SxcGlobalManage();   // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
window.$quickE = QuickE.singleton();        // note: not sure if this is needed as a global object...
$2sxc.cms = new SxcGlobalCms();

// #3 Initialize all objects as needed
function loadInpage() {
    // check if already initialized - just in case these scripts were loaded multiple times
    const bootstrapper = new BootstrapInPage();
    bootstrapper.initialize();
    QuickE.singleton().start();

    /** this enhances the $2sxc client controller with stuff only needed when logged in */
    if (!$2sxc.system) $2sxc.system = new SystemUpgrader();
}

NoJQ.ready(loadInpage);

// Apply Dnn Bugfixes
import './dnn/index';


import './styles/index.scss';
import { Debug } from './constants/debug';

Debug.log('2sxc inpage - dev mode!');