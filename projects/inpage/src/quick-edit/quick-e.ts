import { Conf } from './conf';
import { Coords } from './coords';
import { getCoordinates, positionAndAlign } from './positioning';

/**
 * the quick-edit object
 * the quick-insert object
 */
class QuickE {
  body: any = $('body');
  win: any = $(window);
  main = $("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>");
  template =
    `<a class='sc-content-block-menu-addcontent sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>x</a><a class='sc-content-block-menu-addapp sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>x</a>${
      btn('select', 'ok', 'Select', true)}${btn('paste', 'paste', 'Paste', true, true)}`;
  selected: any = $("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
    .append(
      btn('delete', 'trash-empty', 'Delete'),
      btn('sendToPane', 'move', 'Move', null, null, 'sc-cb-mod-only'),
      "<div id='paneList'></div>",
    );
  // will be populated later in the module section
  contentBlocks: any = null;
  cachedPanes: any = null;
  modules: any = null;
  nearestCb: any = null;
  nearestMod: any = null;
  modManage: any = null;
  // add stuff which depends on other values to create
  cbActions: any = $(this.template);
  modActions: any = $(this.template.replace(/QuickInsertMenu.AddBlock/g, 'QuickInsertMenu.AddModule'))
    .attr('data-context', 'module')
    .addClass('sc-content-block-menu-module');
  //
  config: Conf;
  bodyOffset: Coords;

  constructor() {

    this.selected.toggle = (target: any) => {
      if (!target || target.length === 0) {
        this.selected.hide();
      } else {
        const coords = getCoordinates(target);
        coords.yh = coords.y + 20;
        positionAndAlign(this.selected, coords);
        this.selected.target = target;
      }
    };

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

/**
 * build the toolbar (hidden, but ready to show)
 */
export function prepareToolbarInDom(): void {
  $quickE.body.append($quickE.main)
    .append($quickE.selected);
  $quickE.main.append($quickE.cbActions)
    .append($quickE.modActions);
}
