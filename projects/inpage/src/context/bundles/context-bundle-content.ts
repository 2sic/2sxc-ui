import { ContextBundleInstance, ContextOfContentBlock, ContextOfItem } from '..';
import { SxcEdit } from '../../interfaces/sxc-instance-editable';
import { AttrJsonEditContext } from '../html-attribute';

export class ContextBundleContent extends ContextBundleInstance {
    item: ContextOfItem; // information about the current item
    contentBlock: ContextOfContentBlock;

    constructor(editCtx: AttrJsonEditContext, sxc: SxcEdit) {
        super(editCtx, sxc);

        // information about the current item
        this.item = new ContextOfItem(editCtx);

        // information related to the current contentBlock
        this.contentBlock = new ContextOfContentBlock(editCtx);

    }
}
