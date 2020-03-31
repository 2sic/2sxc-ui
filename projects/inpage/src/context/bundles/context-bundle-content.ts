import { ContextBundleInstance, ContextOfContentBlock, ContextOfItem } from '..';
import { AttrJsonEditContext } from '../html-attribute';

export class ContextBundleContent extends ContextBundleInstance {
    item: ContextOfItem; // information about the current item
    contentBlock: ContextOfContentBlock;

    constructor(editCtx: AttrJsonEditContext) {
        super(editCtx);

        // information about the current item
        this.item = new ContextOfItem(editCtx);

        // information related to the current contentBlock
        this.contentBlock = new ContextOfContentBlock(editCtx);

    }
}
