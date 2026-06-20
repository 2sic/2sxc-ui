import { Sxc } from '../../../../$2sxc/src/sxc/sxc';
import { AttrJsonEditContext } from '../html-attribute';
import { ContentBlockReference, createContentBlockReference } from '../html-attribute/parts/content-block';
import { ContextOfContentBlock, createContextOfContentBlock } from '../parts/context-content-block';
import { ContextBundleInstance, createContextBundleInstance } from './context-bundle-instance';

/**
 * @public
 */
export interface ContextBundleContent extends ContextBundleInstance {
  // 2026-06-20 2dm - has no values and seems unused
  /**
   * information about the current item
   * @internal
   */
  // item: ContextOfItem;

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

  // /** @internal */
  // constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
  //   super(editCtx, sxc);

  //   // information about the current item
  //   // this.item = new ContextOfItem(editCtx);

  //   this.contentBlockReference = createContentBlockReference(editCtx.contentBlockReference);

  //   // information related to the current contentBlock
  //   this.contentBlock = createContextOfContentBlock(editCtx);
  // }
}

/** @internal */
export function createContextBundleContent(editCtx: AttrJsonEditContext, sxc: Sxc): ContextBundleContent {
  return {
    ...createContextBundleInstance(editCtx, sxc),
    contentBlockReference: createContentBlockReference(editCtx.contentBlockReference),
    contentBlock: createContextOfContentBlock(editCtx),
  } satisfies ContextBundleContent;
}
