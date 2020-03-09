import { ContextOfContentBlock } from './context-of-content-block';
import { ItemContext } from './item-context/item-context';

export class ContextOfItem extends ContextOfContentBlock {
  item: ItemContext; // information about the current item
}
