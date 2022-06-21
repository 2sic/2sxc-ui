import { ContextComplete } from '../../context';

/**
 * Shared logic like for deciding if we show list buttons
 * here
 * @internal
 */
export class SharedLogic {
  static isPartOfBlockList(context: ContextComplete) {
    return !!(context.contentBlock.isList &&
      context.button.command.params.useModuleList &&
      context.button.command.params.sortOrder !== -1);    // -1 is the header item
    }

    /**
     * This will tell us, if the item is being referenced (like in a list)
     * It's similar to isBlockList, but will return true even if it's
     * a non-list (single item only)
     */
    static isBlockReference(context: ContextComplete) {
      return !!context.button.command.params.useModuleList;    // -1 is the header item
    }

    static isFieldList(context: ContextComplete) {
      const params = context.button?.command.params;
      return !!(params?.fields && params?.parent);
    }

    static isList(context: ContextComplete) {
      return this.isPartOfBlockList(context) || this.isFieldList(context);
    }

    static isReferencedItem(context: ContextComplete) {
      return this.isBlockReference(context) || this.isFieldList(context);
    }
}
