import { CommandDefinition, CommandNames, Commands, SharedLogic } from '..';
import { CmdParHlp } from '../cmd-par-hlp';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = CommandDefinition.build(CommandNames.list, 'Sort', 'list-numbered', false, true, {
  dialog: (_) => CommandNames.list_old_instanceList,

  showCondition: (context) => SharedLogic.isList(context),

  configureLinkGenerator: (context, linkGenerator) => {
    if (!SharedLogic.isFieldList(context)) return;

    const params = context.button.command.params;
    linkGenerator.items = [{
      Add: false,
      Index: CmdParHlp.getIndex(params),
      Parent: params.parent,
      Field: params.fields,
    }];
  },

  // the items contain info about the list to show
  noItems: false,
});

Commands.addCommand(cmd);
Commands.addCommand(CommandDefinition.clone(cmd, CommandNames.list_old_instanceList));
