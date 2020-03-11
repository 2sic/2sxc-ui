import { ContextOfItem } from '../parts/context-item';
import { ContextBundleContentBlock } from './context-bendle-content-block';

export class ContextBundleItem extends ContextBundleContentBlock {
  item: ContextOfItem; // information about the current item
}
