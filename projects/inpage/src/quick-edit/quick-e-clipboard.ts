import { QeModule, QuickE, QeSelectors, Specs } from '.';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { CmdsStrategyFactory } from './cmds-strategy-factory';

/** add a clipboard to the quick edit */

export class QuickEClipboard {
    static do = copyPasteInPage;
    static get(): Specs { return contents; }

    constructor() {
        $(() => this.initialize());
    }

    /**
     * bind clipboard actions
     */
    initialize() {
        $('a', QuickE.selected).click(function() {
            const action: string = $(this).data('action');
            const clip = contents;
            switch (action) {
            case 'delete':
                return cmdsStrategyFactory.delete(clip);
            case 'sendToPane':
                return QeModule.sendToPane();
            default:
                throw new Error(`unexpected action: ${action}`);
            }
        });
    }
}

/**
 * perform copy and paste commands - needs the clipboard
 * @param cbAction
 * @param list
 * @param index
 * @param type
 */
function copyPasteInPage(cbAction: string, list: JQuery, index: number, type: string): void {
    const newClip = createSpecs(type, list, index);

    // action!
    switch (cbAction) {
        case 'select':
            mark(newClip);
            break;

        case 'paste':
            const from = contents.index;
            const to = newClip.index;
            // check that we only move block-to-block or module to module
            if (contents.type !== newClip.type)
                return alert("can't move module-to-block; move only works from module-to-module or block-to-block");

            if (isNaN(from) || isNaN(to) || from === to) // || from + 1 === to) // this moves it to the same spot, so ignore
                return clear(); // don't do a.nything

            // cb-numbering is a bit different, because the selector is at the bottom
            // only there we should also skip on +1;
            if (newClip.type === QeSelectors.blocks.cb.id && from + 1 === to)
                return clear(); // don't do a.nything

            if (type === QeSelectors.blocks.cb.id) {
                const sxc = SxcEdit.get(list);
                sxc.manage._getCbManipulator().move(newClip.parent, newClip.field, from, to);
            } else
                QeModule.move(contents, newClip, from, to); // sometimes missing oldClip.item

            clear();
            break;
        default:
    }
    return null;
}

/**
 * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
 */
let contents = new Specs();

function mark(newData: Specs): void {
  if (newData) {
    // if it was already selected with the same thing, then release it
    if (contents && contents.item === newData.item)
      return clear();
    contents = newData;
  }
  $(`.${QeSelectors.selected}`).removeClass(QeSelectors.selected); // clear previous markings

  // sometimes missing data.item
  if (!contents.item) {
    return;
  }

  const cb = $(contents.item);
  cb.addClass(QeSelectors.selected);
  if (cb.prev().is('iframe'))
    cb.prev().addClass(QeSelectors.selected);
  setSecondaryActionsState(true);
  QuickE.selected.toggleOverlay(cb);
}

function clear(): void {
  $(`.${QeSelectors.selected}`).removeClass(QeSelectors.selected);
  contents = null;
  setSecondaryActionsState(false);
  QuickE.selected.toggleOverlay(false);
}

function createSpecs(type: string, list: JQuery, index: number): Specs {
  const listItems = list.find(QeSelectors.blocks[type].selector);
  let currentItem: HTMLElement;
  if (index >= listItems.length) {
    // when paste module below the last module in pane
    // index is 1 larger than the length, then select last
    currentItem = listItems[listItems.length - 1];
  } else {
    currentItem = listItems[index];
  }
  const editContext = JSON.parse(list.attr(QeSelectors.blocks.cb.context) || null) || { parent: 'dnn', field: list.id };
  return {
    parent: editContext.parent,
    field: editContext.field,
    list: list,
    item: currentItem,
    index: index,
    type: type,
  };
}


function setSecondaryActionsState(state: boolean): void {
  let btns = $('a.sc-content-block-menu-btn');
  btns = btns.filter('.icon-sxc-paste');
  btns.toggleClass('sc-unavailable', !state);
}

const cmdsStrategyFactory = new CmdsStrategyFactory();

// /**
//  * bind clipboard actions
//  */
// $('a', QuickE.selected).click(function() {
//   const action: string = $(this).data('action');
//   const clip = contents;
//   switch (action) {
//     case 'delete':
//       return cmdsStrategyFactory.delete(clip);
//     case 'sendToPane':
//       return QeModule.sendToPane();
//     default:
//       throw new Error(`unexpected action: ${action}`);
//   }
// });
