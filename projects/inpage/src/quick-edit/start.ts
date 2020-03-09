import { _readPageConfig } from './config';
import { getBodyPosition, refresh } from './positioning';
import { $quickE as quickE, prepareToolbarInDom } from './quick-e';
import { selectors } from './selectors-instance';

function enable(): void {
  // build all toolbar html-elements
  prepareToolbarInDom();

  // Cache the panes (because panes can't change dynamically)
  initPanes();
}

/**
 * start watching for mouse-move
 */
function watchMouse() {
  let refreshTimeout: any = null;
  $('body').on('mousemove',
    (e: any) => {
      if (refreshTimeout === null)
        refreshTimeout = window.setTimeout(() => {
            requestAnimationFrame(() => {
              refresh(e);
              refreshTimeout = null;
            });
          },
          20);
    });
}

export function start(): void {
  try {
    _readPageConfig();
    if (quickE.config.enable) {
      // initialize first body-offset
      quickE.bodyOffset = getBodyPosition();

      enable();

      toggleParts();

      watchMouse();
    }
  } catch (e) {
    console.error("couldn't start quick-edit", e);
  }
}

/**
 * cache the panes which can contain modules
 */
function initPanes(): void {
  quickE.cachedPanes = $(selectors.mod.listSelector);
  quickE.cachedPanes.addClass('sc-cb-pane-glow');
}

/**
 * enable/disable module/content-blocks as configured
 */
function toggleParts(): void {
  //// content blocks actions
  // quickE.cbActions.toggle(quickE.config.innerBlocks.enable);

  //// module actions
  // quickE.modActions.hide(quickE.config.modules.enable);
}

/**
 * reset the quick-edit
 * for example after ajax-loading a content-block, which may cause changed configurations
 */
export function reset(): void {
  _readPageConfig();
  toggleParts();
}
