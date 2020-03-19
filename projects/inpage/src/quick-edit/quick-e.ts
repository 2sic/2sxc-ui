﻿import { Conf } from './conf';
import { Coords } from './coords';
import { Positioning } from './positioning';

interface SelectionOverlay extends JQuery {
  toggleOverlay(target: boolean | JQuery): void;
  target: JQuery;
}


interface MainOverlay extends JQuery {
  actionsForCb: JQuery;
  actionsForModule: JQuery;
  parentContainer: HTMLElement;
}

const selectedOverlay = $("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
.append(
  btn('delete', 'trash-empty', 'Delete'),
  btn('sendToPane', 'move', 'Move', null, null, 'sc-cb-mod-only'),
  "<div id='paneList'></div>",
) as SelectionOverlay;
selectedOverlay.toggleOverlay = (target: boolean | JQuery) => {
    if (!target || (target as JQuery).length === 0) {
      selectedOverlay.hide();
    } else {
      const coords = Positioning.getCoordinates(target as JQuery);
      coords.yh = coords.y + 20;
      Positioning.positionAndAlign(selectedOverlay, coords);
      selectedOverlay.target = target as JQuery;
    }
  };

/**
 * the quick-edit object
 * the quick-insert object
 */
class QuickE {
    body = $('body');
    win = $(window);
    main = $("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>") as MainOverlay;
    template =
        `<a class='sc-content-block-menu-addcontent sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>x</a><a class='sc-content-block-menu-addapp sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>x</a>${
        btn('select', 'ok', 'Select', true)}${btn('paste', 'paste', 'Paste', true, true)}`;
    selected = selectedOverlay;
    // will be populated later in the module section
    contentBlocks: JQuery = null;
    cachedPanes: JQuery = null;
    modules: JQuery = null;
    nearestCb: Coords = null;
    nearestMod: Coords = null;
    // add stuff which depends on other values to create
    cbActions = $(this.template);
    modActions = $(this.template.replace(/QuickInsertMenu.AddBlock/g, 'QuickInsertMenu.AddModule'))
        .attr('data-context', 'module')
        .addClass('sc-content-block-menu-module');
    //
    config: Conf;
    bodyOffset: Coords;

    prepareToolbarInDom(): void {
        this.body.append(this.main).append(this.selected);
        this.main.append(this.cbActions).append(this.modActions);
    }
}

export const $quickE = new QuickE();

function btn(action: string,
             icon: string,
             i18N: string,
             invisible?: boolean,
             unavailable?: boolean,
             classes?: string): string {
  return `<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-${icon} ${invisible ? ' sc-invisible ' : ''}${
    unavailable ? ' sc-unavailable ' : ''}${classes}' data-action='${action
    }' data-i18n='[title]QuickInsertMenu.${i18N}'></a>`;
}
