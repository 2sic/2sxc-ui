import { Attributes } from '../constants';
import { DebugConfig } from '../DebugConfig';
import { SxcIntanceEditable } from '../interfaces/sxc-instance-editable';
import { windowInPage as window } from '../interfaces/window-in-page';
import { Log } from '../logging/log';
import { LogUtils } from '../logging/log-utils';
import { getTag } from '../manage/api';
import { getSxc } from '../plumbing';
import { TypeUnsafe } from '../plumbing/TypeTbD';
import { quickDialog } from '../quick-dialog/quick-dialog';
import * as QuickEditState from '../quick-dialog/state';
import { TagToolbarManager } from '../toolbar/tag-toolbars/tag-toolbar-manager';
import { ToolbarManager } from '../toolbar/toolbar-manager';

/**
 * module & toolbar bootstrapping (initialize all toolbars after loading page)
 * this will run onReady...
 */
const initializedInstances: JQuery[] = [];
let openedTemplatePickerOnce = false;
const diagCancelStateOnStart = QuickEditState.cancelled.get();

$(document).ready(() => {
  // reset cancelled state after one reload
  if (diagCancelStateOnStart) QuickEditState.cancelled.remove();

  // initialize all modules
  initAllInstances(true);

  // start observing the body for configured mutations
  watchDomChanges();
});

/**
 * Scan all instances and initialize them
 * @param isFirstRun should be true only on the very initial call
 */
function initAllInstances(isFirstRun: boolean): void {
  $('div[data-edit-context]').each(function() {
    initInstance(this, isFirstRun);
  });
  if (isFirstRun) tryShowTemplatePicker();
}

/**
 * create an observer instance and start observing
 */
function watchDomChanges() {
  const observer = new MutationObserver((m) => {
    // Watch statistics how changes were processed
    window.$2sxc.stats.watchDomChanges++;
    let processed = 0;

    // 2019-08-29 2rm added automatic initialization of toolbars (not only module nodes)
    m.forEach((v) => {
      Array.prototype.forEach.call(v.addedNodes, (n: HTMLElement) => {
        const node = $(n);
        // Ignore added menu nodes as this may cause performance issues
        if (node.is('.sc-menu')) return;

        processed++;

        // If the added node is a [data-edit-context], it is either a module or a content block which was replaced
        // re-initialize the module
        if (node.is('div[data-edit-context]')) initInstance(node, false);
        // If the added node contains [data-edit-context] nodes, it is likely the DNN module drag manager which added
        // the node. To prevent multiple initialization while dragging modules, we additionally check for the
        // .active-module class which seems to be applied while dragging the module.
        else if (
          node.is(':not(.active-module)') &&
          node.has('div[data-edit-context]')
        ) {
          $('div[data-edit-context]', node).each(function() {
            initInstance(this, false);
          });
        } else ToolbarManager.build(node);
      });
    });

    // Clean up orphan tags if nodes have been added
    if (processed) TagToolbarManager.CleanupOrphanedToolbars();
  });
  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });
}

/**
 * Show the template picker if
 * - template picker has not yet been opened
 * - dialog has not been cancelled
 * - only one uninitialized module on page
 * @returns
 */
function tryShowTemplatePicker(): boolean {
  let sxc: SxcIntanceEditable;
  // first check if we should show one according to the state-settings
  const openDialogId = QuickEditState.cbId.get();
  if (openDialogId) {
    // must check if it's on this page, as it could be from another page
    const found = $(`[data-cb-id="${openDialogId}"]`);
    if (found.length) {
      // since the CB-ID could also be an inner content (marked as a negative "-" number)
      // we must be sure that we use the right id a.nyhow
      if (openDialogId < 0) {
        const instanceId = Number(
          found[0].attributes.getNamedItem(Attributes.InstanceId).value,
        );
        sxc = getSxc(instanceId, openDialogId);
      } else {
        sxc = getSxc(openDialogId);
      }
    }
  }

  if (!sxc) {
    const uninitializedModules = $('.sc-uninitialized');

    if (diagCancelStateOnStart || openedTemplatePickerOnce) return false;

    // already showing a dialog
    if (quickDialog.isVisible()) return false;

    // not exactly one uninitialized module
    if (uninitializedModules.length !== 1) return false;

    // show the template picker of this module
    const module = uninitializedModules.parent('div[data-edit-context]')[0];
    sxc = getSxc(module);
  }

  if (sxc) {
    sxc.manage.run('layout');
    openedTemplatePickerOnce = true;
  }
  return true;
}

function initInstance(module: JQuery, isFirstRun: boolean): void {
  // console.log("initInstance called with ", module, isFirstRun);
  // console.log("Initialized instances are ", initializedInstances);

  // check if module is already in the list of initialized modules
  if (initializedInstances.find((m) => m === module)) return;

  // add to modules-list first, in case we run into recursions
  initializedInstances.push(module);

  let sxc = getSxc(module);

  // check if the sxc must be re-created. This is necessary when modules are dynamically changed
  // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
  if (!isFirstRun) sxc = sxc.recreate(true) as TypeUnsafe as SxcIntanceEditable;

  // check if we must show the glasses
  // this must always run because it can be added ajax-style
  const wasEmpty = showGlassesButtonIfUninitialized(sxc);

  if (isFirstRun || !wasEmpty) {
    // use a logger for each iteration
    const log = new Log('Bts.Module');

    ToolbarManager.buildModule(module);
    if (DebugConfig.bootstrap.initInstance) LogUtils.logDump(log);
  }
}

function showGlassesButtonIfUninitialized(
  sxci: SxcIntanceEditable,
): boolean {
  // already initialized
  if (isInitialized(sxci)) return false;

  // already has a glasses button
  const tag = $(getTag(sxci));
  if (tag.find('.sc-uninitialized').length !== 0) return false;

  // note: title is added on mouseover, as the translation isn't ready at page-load
  const btn = $(
    '<div class="sc-uninitialized" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement">' +
      '<div class="icon-sxc-glasses"></div>' +
      '</div>',
  );

  btn.on('click', () => sxci.manage.run('layout'));

  tag.append(btn);
  return true;
}

function isInitialized(sxci: SxcIntanceEditable): boolean {
  const cg =
    sxci &&
    sxci.manage &&
    sxci.manage._editContext &&
    sxci.manage._editContext.ContentGroup;
  return cg && cg.TemplateId !== 0;
}
