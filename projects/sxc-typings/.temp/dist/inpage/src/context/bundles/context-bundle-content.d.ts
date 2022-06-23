import { ContextBundleInstance, ContextOfContentBlock, ContextOfItem } from '..';
import { Sxc } from '../../../../$2sxc/src';
import { AttrJsonEditContext } from '../html-attribute';
import { ContentBlockReference } from '../html-attribute/parts/content-block';
/**
 * @internal
 */
export declare class ContextBundleContent extends ContextBundleInstance {
    /** information about the current item */
    item: ContextOfItem;
    /** Reference to a Content-Block */
    contentBlockReference: ContentBlockReference;
    /** The content-block itself with specs like is-app, etc. */
    contentBlock: ContextOfContentBlock;
    constructor(editCtx: AttrJsonEditContext, sxc: Sxc);
}
