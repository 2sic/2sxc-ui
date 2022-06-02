import { BootstrapInPage } from './bootstrap/bootstrap';
import { Cms } from './cms/Cms';
import { ContextComplete } from './context/bundles/context-bundle-button';
import { DnnActionMenu } from './dnn';
import { translate, Translator } from './i18n';
import { SxcRoot } from './interfaces/sxc-controller-in-page';
import { EditManager } from './manage/edit-manager';
import { Manage } from './manage/manage';
import { NoJQ } from './plumbing';
import { QuickE } from './quick-edit/quick-e';
import { SystemUpgrader } from './system';

/**
 * @internal
 */
import './toolbar/toolbar-global-enable-shake';

// #1 Note that $2sxc must always exist, the server ensures the load order
const $2sxc = window.$2sxc as SxcRoot;

// #2 Now attach initialization helpers and global objects, so that $2sxc always has these
$2sxc.context = ContextComplete.findContext; // primary API to get the context
$2sxc._translateInit = (manage: EditManager) => Translator.initManager(manage); // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
$2sxc.translate = translate;    // provide an official translate API for 2sxc
$2sxc._manage = new Manage();   // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
window.$quickE = QuickE.singleton();        // note: not sure if this is needed as a global object...
$2sxc.cms = new Cms();

// #3 Initialize all objects as needed
function loadInpage() {
    // check if already initialized - just in case these scripts were loaded multiple times
    const bootstrapper = new BootstrapInPage();
    bootstrapper.initialize();
    QuickE.singleton().start();

    /** this enhances the $2sxc client controller with stuff only needed when logged in */
    if (!$2sxc.system) $2sxc.system = new SystemUpgrader();

    /** Connect DNN action mapper to this module instance */
    window.$2sxcActionMenuMapper = (moduleId: number) => {
        return new DnnActionMenu(moduleId);
    };
}

NoJQ.ready(loadInpage);

// Tell Webpack to load CSS
const cssEdit = require('./inpage.css');
const cssIcons = require('../icons/inpage-icons-codes.css');

