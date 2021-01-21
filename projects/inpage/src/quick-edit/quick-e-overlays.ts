import { Positioning, QuickEditConfig } from '.';
import { $jq } from '../interfaces/sxc-controller-in-page';

export namespace QuickEditOverlay {
  export interface Selection extends JQuery {
    toggleOverlay(target: boolean | JQuery, buttons?: QuickEditConfig.Buttons): void;
    target: JQuery;
  }

  export interface Main extends JQuery {
    activeContentBlock: JQuery;
    activeModule: JQuery;
    parentNode: HTMLElement;
  }

  export function setButtonActivationClasses(buttons: QuickEditConfig.Buttons, linkTags: JQuery) {
    // remove any previously set classes for these
    for (const [k, v] of Object.entries(QuickEditConfig.DefaultButtons))
      linkTags.removeClass(`enable-${k} disable-${k}`);

    // set classes from config
    for (const [k, v] of Object.entries(buttons))
      linkTags.addClass(`${(v ? 'enable' : 'disable')}-${k}`);
  }

  export function btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?: boolean, classes?: string): string {
    return `<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-${icon} ${invisible ? ' sc-invisible ' : ''}${
      unavailable ? ' sc-unavailable ' : ''}${classes}' data-action='${action
      }' data-i18n='[title]QuickInsertMenu.${i18N}'></a>`;
  }

  export const selectedOverlay = $jq("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
    .append(
      QuickEditOverlay.btn('delete', 'trash-empty', 'Delete'),
      QuickEditOverlay.btn('sendToPane', 'move', 'Move', null, null, 'sc-cb-mod-only'),
      "<div id='paneList'></div>",
    ) as QuickEditOverlay.Selection;
}


/** Expand the selectedOverlay with the necessary toggle function */
QuickEditOverlay.selectedOverlay.toggleOverlay = (target: boolean | JQuery, buttons?: QuickEditConfig.Buttons) => {
  if (!target || (target as JQuery).length === 0) {
    QuickEditOverlay.selectedOverlay.hide();
  } else {
    // 1. set overlay at the right coordinates
    const coords = Positioning.get(target as JQuery);
    coords.yh = coords.y + 20;
    Positioning.positionAndAlign(QuickEditOverlay.selectedOverlay, coords);
    QuickEditOverlay.selectedOverlay.target = target as JQuery;

    // 2. Activate / deactivate correct buttons
    QuickEditOverlay.setButtonActivationClasses(buttons, QuickEditOverlay.selectedOverlay.children('a'));
  }
};
