import { CmdParHlp, CommandNames, Commands } from '..';
import { ItemIdentifierGroup } from '../../../../$2sxc/src/cms';
import { SharedLogic } from './shared-logic';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.addExisting, 'AddExisting', 'add-existing', false, true, {
  dialog: (_) => 'replace',

  showCondition(context) {
    return SharedLogic.isList(context);
  },

  configureLinkGenerator: (context, linkGenerator) => {
    if (SharedLogic.isFieldList(context)) {
      const params = context.button.command.params;
      linkGenerator.items = [{ Group: {
        Guid: params.parent,
        Part: params.fields,
        Index: CmdParHlp.getIndex(params) + 1,
        Add: true,
      }}];
    } else if (SharedLogic.isPartOfBlockList(context)) {
      const topItem = linkGenerator.items[0] as ItemIdentifierGroup;
      topItem.Group.Add = true;
      topItem.Group.Index++;
      linkGenerator.items = [topItem];
    }
  },
});
