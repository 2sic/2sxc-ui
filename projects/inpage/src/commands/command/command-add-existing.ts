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

  // configureLinkGenerator: (context, linkGenerator) => {
  //   if (SharedLogic.isFieldList(context)) {
  //     const params = context.button.command.params;
  //     linkGenerator.items = [{
  //       Add: true,
  //       Index: CmdParHlp.getIndex(params) + 1,
  //       Parent: params.parent,
  //       Field: params.fields,
  //     }];
  //     return;
  //   }
    
  //   if (SharedLogic.isPartOfBlockList(context)) {
  //     const topItem = linkGenerator.items[0] as ItemIdentifierInList;
  //     topItem.Add = true;
  //     topItem.Index++;
  //     linkGenerator.items = [topItem];
  //   }
  // },

  customItems: (ctx, items) => {
    if (SharedLogic.isFieldList(ctx)) {
      const params = ctx.button.command.params;
      return [{
        Add: true,
        Index: CmdParHlp.getIndex(params) + 1,
        Parent: params.parent,
        Field: params.fields,
      }];
    }
    
    if (SharedLogic.isPartOfBlockList(ctx)) {
      const topItem = items[0] as ItemIdentifierInList;
      topItem.Add = true;
      topItem.Index++;
      return [topItem];
    }
  },
    
});
