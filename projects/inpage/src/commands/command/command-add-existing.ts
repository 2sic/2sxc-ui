import { CmdParHlp, CommandNames, Commands } from '..';
import { ItemIdentifierInList } from '../../../../$2sxc/src/cms/item-identifiers';
import { SharedLogic } from './shared-logic';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.addExisting, 'AddExisting', 'add-existing', false, true, {
  dialog: (_) => 'replace',

  showCondition: (context) => SharedLogic.isList(context),

  customItems: (ctx, items) => {
    if (SharedLogic.isFieldList(ctx)) {
      const params = ctx.button.command.params!;
      return [{
        Add: true,
        Index: CmdParHlp.getIndex(params) + 1,
        Parent: params.parent!,
        Field: params.fields!,
        ...(params?.contentType ? { ContentType: params.contentType } : {}),
      }];
    }
    
    if (SharedLogic.isPartOfBlockList(ctx)) {
      const topItem = items[0] as ItemIdentifierInList;
      topItem.Add = true;
      topItem.Index++;
      return [topItem];
    }

    return [];
  },

  /**
   * Allow the button to drop certain conflicting parameters which may be inherited from the main toolbar definition.
   * New 2026-06-22 v22 2dm
   * Special edge case: On add-existing the contentType info is usually on the main toolbar, but it will 
   * result in the dialog filtering by it's own contentType, instead of leaving it blank to allow the backend to supply the preferred type.
   * Since we introduced the feature that add-existing _can_ actually filter by contentType, we must ensure that the
   * underlying defined contentType doesn't suddenly become the filter. 
   */
  preCleanSharedParams: (params) => {
      if (!params)
          return params;
      const { contentType, ...rest } = params;
      return rest;
  }

});
