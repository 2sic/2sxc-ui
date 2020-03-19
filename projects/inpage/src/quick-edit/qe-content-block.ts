import { Delete, QuickE, QuickEClipboard, QeSelectors, Specs } from '.';
import { SxcEdit } from '../interfaces/sxc-instance-editable';

/**
 * extend the quick edit with the core commands
 */
export class QeContentBlock implements Delete {
  delete(clip: Specs): Promise<void> {
    const sxc = SxcEdit.get(clip.list);
    return sxc.manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
  }

  static create(parent: number, field: string, index: number, appOrContent: string, list: JQuery, newGuid: string): Promise<void> {
    const sxc = SxcEdit.get(list);
    return sxc.manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
  }

  static onCbButtonClick() {
    const list = QuickE.main.actionsForCb.closest(QeSelectors.blocks.cb.listSelector);
    const listItems = list.find(QeSelectors.blocks.cb.selector);
    const actionConfig = JSON.parse(list.attr(QeSelectors.blocks.cb.context));
    let index: number = 0;
    const newGuid: string | null = actionConfig.guid || null;

    if (QuickE.main.actionsForCb.hasClass(QeSelectors.blocks.cb.class))
        index = listItems.index(QuickE.main.actionsForCb[0]) + 1;

    // check cut/paste
    const cbAction = $(this).data('action');
    if (cbAction) {
        // this is a cut/paste action
        return QuickEClipboard.do(cbAction, list, index, QeSelectors.blocks.cb.id);
    } else {
        const appOrContent = $(this).data('type');
        return QeContentBlock.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
    }
}

}
