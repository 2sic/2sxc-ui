﻿import { ModifierBase, QeSelectors, QuickE, QuickEClipboard, Selection } from '.';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { ContextForLists } from './context-for-lists';
import { ModifierContentBlockInstance } from './modifier-content-block-internal';

/**
 * extend the quick edit with the core commands
 */
export class ModifierContentBlock extends ModifierBase {

    constructor() {
        super('QE.CntBlk');
    }

    getInstanceModifier(tag: JQuery) {
        const sxc = SxcEdit.get(tag);
        return new ModifierContentBlockInstance(this, sxc);
    }

    delete(clip: Selection): Promise<void> {
        return this.getInstanceModifier(clip.list).delete(clip.parent as number, clip.field, clip.index);
    }

    create(parent: number, field: string, index: number, appOrContent: string, list: JQuery, newGuid: string): Promise<void> {
        return this.getInstanceModifier(list).create(parent, field, index, appOrContent, list, newGuid);
    }

    move(oldClip: Selection, newClip: Selection) {
        const from = oldClip.index;
        const to = newClip.index;
        this.getInstanceModifier(oldClip.list).move(newClip.parent as number, newClip.field, from, to);
    }

    static onCbButtonClick() {
        const list = QuickE.main.activeContentBlock.closest(QeSelectors.blocks.cb.listSelector);
        const listItems = list.find(QeSelectors.blocks.cb.selector);
        const actionConfig = ContextForLists.getFromDom(list);
        let index: number = 0;
        const newGuid: string | null = actionConfig.guid || null;

        if (QuickE.main.activeContentBlock.hasClass(QeSelectors.blocks.cb.class))
            index = listItems.index(QuickE.main.activeContentBlock[0]) + 1;

        // check if it's a cut/paste action
        const cbAction = $(this).data('action');
        if (cbAction)
            return QuickEClipboard.do(cbAction, list, index, QeSelectors.blocks.cb.id);

        const appOrContent = $(this).data('type');
        return QuickEClipboard.modCb.create(actionConfig.parent as number, actionConfig.field, index, appOrContent, list, newGuid);
    }

}