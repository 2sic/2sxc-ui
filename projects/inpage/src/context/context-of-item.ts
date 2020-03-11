import { ContextBundleContentBlock } from './context-of-content-block';
import { ItemContext } from './item-context/item-context';

export class ContextOfItem extends ContextBundleContentBlock {
  item: ItemContext; // information about the current item
}
