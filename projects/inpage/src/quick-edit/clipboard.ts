import { getSxcInstance } from '../x-bootstrap/sxc';
import { CmdsStrategyFactory } from './cmds-strategy-factory';
import { Mod } from './mod';
import { $quickE as quickE } from './quick-e';
import { selectors } from './selectors-instance';
import { Specs } from './specs';

/** add a clipboard to the quick edit */

/**
 * perform copy and paste commands - needs the clipboard
 * @param cbAction
 * @param list
 * @param index
 * @param type
 */
export function copyPasteInPage(cbAction: string, list: any, index: number, type: any): any {
  const newClip = createSpecs(type, list, index);

  // action!
  switch (cbAction) {
    case 'select':
      mark(newClip);
      break;

    case 'paste':
      const from = data.index;
      const to = newClip.index;
       // check that we only move block-to-block or module to module
      if (data.type !== newClip.type)
        return alert("can't move module-to-block; move only works from module-to-module or block-to-block");

      if (isNaN(from) || isNaN(to) || from === to) // || from + 1 === to) // this moves it to the same spot, so ignore
        return clear(); // don't do anything

      // cb-numbering is a bit different, because the selector is at the bottom
      // only there we should also skip on +1;
      if (newClip.type === selectors.cb.id && from + 1 === to)
        return clear(); // don't do anything

      if (type === selectors.cb.id) {
        const sxc = getSxcInstance(list) as SxcInstanceWithInternals;
        sxc.manage._getCbManipulator().move(newClip.parent, newClip.field, from, to);
      } else {
        // sometimes missing oldClip.item
        // if (clipboard.data.item)
        Mod.move(data, newClip, from, to);
      }
      clear();
      break;
    default:
  }
  return null;
}

/**
 * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
 */
export let data: any = {};

export function mark(newData: Specs): void {
  if (newData) {
    // if it was already selected with the same thing, then release it
    if (data && data.item === newData.item)
      return clear();
    data = newData;
  }
  $(`.${selectors.selected}`).removeClass(selectors.selected); // clear previous markings

  // sometimes missing data.item
  if (!data.item) {
    return;
  }

  const cb: any = $(data.item);
  cb.addClass(selectors.selected);
  if (cb.prev().is('iframe'))
    cb.prev().addClass(selectors.selected);
  setSecondaryActionsState(true);
  quickE.selected.toggle(cb, data.type);
}

export function clear(): void {
  $(`.${selectors.selected}`).removeClass(selectors.selected);
  data = null;
  setSecondaryActionsState(false);
  quickE.selected.toggle(false);
}

export function createSpecs(type: string, list: any, index: number): Specs {
  const listItems: any = list.find(selectors[type].selector);
  let currentItem: any;
  if (index >= listItems.length) {
    // when paste module below the last module in pane
    // index is 1 larger than the length, then select last
    currentItem = listItems[listItems.length - 1];
  } else {
    currentItem = listItems[index];
  }
  const editContext = JSON.parse(list.attr(selectors.cb.context) || null) || { parent: 'dnn', field: list.id };
  return {
    parent: editContext.parent,
    field: editContext.field,
    list: list,
    item: currentItem,
    index: index,
    type: type,
  };
}


function setSecondaryActionsState(state: boolean): any {
  let btns = $('a.sc-content-block-menu-btn');
  btns = btns.filter('.icon-sxc-paste');
  btns.toggleClass('sc-unavailable', !state);
}

const cmdsStrategyFactory = new CmdsStrategyFactory();

/**
 * bind clipboard actions
 */
$('a', quickE.selected).click(function () {
  const action: string = $(this).data('action');
  const clip: any = data;
  switch (action) {
    case 'delete':
      return cmdsStrategyFactory.delete(clip);
    case 'sendToPane':
      return Mod.sendToPane();
    default:
      throw new Error(`unexpected action: ${action}`);
  }
});
