import { ContextBundleInstance, ContextOfContentBlock, ContextOfItem } from '..';
import { Sxc } from '../../../../$2sxc/src/sxc/sxc';
import { AttrJsonEditContext } from '../html-attribute';
import { ContentBlockReference } from '../html-attribute/parts/content-block';

/**
 * @public
 */
export class ContextBundleContent extends ContextBundleInstance {
  /**
   * information about the current item
   * @internal
   */
  item: ContextOfItem;

  /**
   * Reference to a Content-Block
   * @internal
   */
  contentBlockReference: ContentBlockReference;

  /**
   * The content-block itself with specs like is-app, etc.
   * @internal
   */
  contentBlock: ContextOfContentBlock;

  /** @internal */
  constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
    super(editCtx, sxc);

    // information about the current item
    this.item = new ContextOfItem(editCtx);

    this.contentBlockReference = new ContentBlockReference(editCtx.contentBlockReference);

    // information related to the current contentBlock
    this.contentBlock = new ContextOfContentBlock(editCtx);
  }
}
