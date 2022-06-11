import { ContextBundleInstance, ContextOfContentBlock, ContextOfItem } from '..';
import { Sxc } from '../../../../$2sxc/src';
import { AttrJsonEditContext } from '../html-attribute';
import { ContentBlockReference } from '../html-attribute/parts/content-block';

/**
 * @internal
 */
export class ContextBundleContent extends ContextBundleInstance {
  /** information about the current item */
  item: ContextOfItem;

  /** Reference to a Content-Block */
  contentBlockReference: ContentBlockReference;

  /** The content-block itself with specs like is-app, etc. */
  contentBlock: ContextOfContentBlock;

  constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
    super(editCtx, sxc);

    // information about the current item
    this.item = new ContextOfItem(editCtx);

    this.contentBlockReference = new ContentBlockReference(editCtx.contentBlockReference);

    // information related to the current contentBlock
    this.contentBlock = new ContextOfContentBlock(editCtx);
  }
}
