import 'shake.js';
// import * as Shake from 'shake.js';
// import {Shake } from 'shake.js';
// import * as Shake from 'shake.js';
// import './polyfills/include-polyfills';

import { Cms } from './cms/Cms';
import { Commands } from './commands/commands';
import { context } from './context/context';
import { $2sxcInPage as $2sxc } from './interfaces/sxc-controller-in-page';
import { windowInPage as window } from './interfaces/window-in-page';
import { _manage } from './manage/manage';
import { $quickE } from './quick-edit/quick-e';
import { start } from './quick-edit/start';
import { _translateInit } from './translate/2sxc._translateInit';
import { translate } from './translate/2sxc.translate';
import './x-bootstrap/module-bootstrapper';


$2sxc.context = context; // primary API to get the context
$2sxc._translateInit = _translateInit; // reference in ./2sxc-api/js/ToSic.Sxc.Instance.ts
$2sxc.translate = translate; // provide an official translate API for 2sxc
$2sxc._commands = Commands.getInstance();
$2sxc._manage = _manage; // used out of this project in ToSic.Sxc.Instance and 2sxc.api.js

window.$quickE = $quickE;
$(start); // run on-load

$2sxc.cms = new Cms();
