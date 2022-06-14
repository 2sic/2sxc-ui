import { Positioning, QuickEditConfigButtons } from '.';
import { C } from '../constants';
import { NoJQ } from '../plumbing';

/**
 * @internal
 */
export namespace QuickEditOverlay {
  export interface Selection extends HTMLElement {
    toggleOverlay(target: boolean | HTMLElement, buttons?: QuickEditConfigButtons): void;
    target: HTMLElement;
  }

  export interface Main extends HTMLElement {
    activeContentBlock: HTMLElement;
    activeModule: HTMLElement;
    _parentNode: HTMLElement;
  }

  export function setButtonActivationClasses(buttons: QuickEditConfigButtons, linkTags: HTMLElement[]) {
    // remove any previously set classes for these
    for (const [k, v] of Object.entries(new QuickEditConfigButtons()))
      linkTags.forEach((l) => {
        l.classList.remove(`enable-${k}`, `disable-${k}`);
      });

    // set classes from config
    for (const [k, v] of Object.entries(buttons))
      linkTags.forEach((l) => {
        l.classList.add(`${(v ? 'enable' : 'disable')}-${k}`);
      });
  }

  export function btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?: boolean, classes?: string): string {
    return `<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-${icon} ${invisible ? ' sc-invisible ' : ''}${unavailable ? ` ${C.ClsNames.UnAvailable} ` : ''}${classes}' data-action='${action}' data-i18n='[title]QuickInsertMenu.${i18N}'></a>`;
  }

  export const selectedOverlay = NoJQ.domFromString('<div class="sc-content-block-menu sc-content-block-selected-menu sc-i18n"></div>').map((o) => {
    o.append(
      NoJQ.domFromString(QuickEditOverlay.btn('delete', 'trash-empty', 'Delete'))[0],
      NoJQ.domFromString(QuickEditOverlay.btn('sendToPane', 'move', 'Move', null, null, 'sc-cb-mod-only'))[0],
      NoJQ.domFromString('<div id="paneList"></div>')[0],
    );
    return o;
  })[0] as QuickEditOverlay.Selection;
}


/** Expand the selectedOverlay with the necessary toggle function */
QuickEditOverlay.selectedOverlay.toggleOverlay = (target: boolean | HTMLElement, buttons?: QuickEditConfigButtons) => {
  if (!target) {
    QuickEditOverlay.selectedOverlay.style.display = 'none';
  } else {
    // 1. set overlay at the right coordinates
    const coords = Positioning.get(target as HTMLElement);
    coords.yh = coords.y + 20;
    Positioning.positionAndAlign(QuickEditOverlay.selectedOverlay, coords);
    QuickEditOverlay.selectedOverlay.target = target as HTMLElement;

    // 2. Activate / deactivate correct buttons
    QuickEditOverlay.setButtonActivationClasses(buttons, Array.from(QuickEditOverlay.selectedOverlay.querySelectorAll<HTMLElement>('a')));
  }
};
