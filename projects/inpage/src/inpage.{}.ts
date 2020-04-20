import { Cms } from './cms/Cms';
import { ContextComplete } from './context/bundles/context-bundle-button';
import { translate, Translator } from './i18n';
import { $2sxcInPage as $2sxc } from './interfaces/sxc-controller-in-page';
import { windowInPage as window } from './interfaces/window-in-page';
import { EditManager } from './manage/edit-manager';
import { Manage } from './manage/manage';
import { QuickE } from './quick-edit/quick-e';
import './x-bootstrap/x-bootstrap';

$2sxc.context = ContextComplete.findContext; // primary API to get the context
$2sxc._translateInit = (manage: EditManager) => Translator.initManager(manage); // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
$2sxc.translate = translate; // provide an official translate API for 2sxc
$2sxc._manage = new Manage(); // _manage; // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js

window.$quickE = QuickE;
$(() => QuickE.start()); // run on-load

$2sxc.cms = new Cms();

// Tell Webpack to load CSS
const cssEdit = require('./inpage.css');
const cssIcons = require('../icons/inpage-icons-codes.css');
