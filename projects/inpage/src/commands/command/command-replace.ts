import { CmdParHlp, CommandNames, Commands } from '..';
import { SharedLogic } from './shared-logic';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.replace, 'Replace', 'replace', false, true, {

  showCondition(context) {
    return SharedLogic.isReferencedItem(context);
  },

  // configureLinkGenerator: (ctx, linkGenerator) => {
  //   // default case is ContentBlock - in which case it doesn't need to redefine the items
  //   if (!SharedLogic.isFieldList(ctx))
  //     return;

  //   // fieldList - redefine the items
  //   const params = ctx.button.command.params;
  //   linkGenerator.items = [{
  //     Add: false,
  //     Index: CmdParHlp.getIndex(params),
  //     Parent: params.parent,
  //     Field: params.fields,
  //   }];
  // },

  customItems: (ctx, items) => {
    // default case is ContentBlock - in which case it doesn't need to redefine the items
    if (!SharedLogic.isFieldList(ctx))
      return [];

    const params = ctx.button.command.params;
    return [{
      Add: false,
      Index: CmdParHlp.getIndex(params),
      Parent: params.parent,
      Field: params.fields,
    }];
  },
});
