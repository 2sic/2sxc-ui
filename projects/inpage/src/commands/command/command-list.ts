import { Command, CommandNames, Commands, SharedLogic } from '..';
import { CmdParHlp } from '../cmd-par-hlp';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = Command.build(CommandNames.list, 'Sort', 'list-numbered', false, true, {
  dialog: (_) => CommandNames.list_old_instanceList,

  showCondition: (context) => SharedLogic.isList(context),

  configureLinkGenerator: (context, linkGenerator) => {
    if (!SharedLogic.isFieldList(context)) return;

    const params = context.button.command.params;
    linkGenerator.items = [{
      // #cleanUpDuplicateGroupHeaders
      Add: false,
      Index: CmdParHlp.getIndex(params),
      Parent: params.parent,
      Field: params.fields,
      Group: {
        Guid: params.parent,
        Part: params.fields,
        // Index: CmdParHlp.getIndex(params),
        // Add: false,
      }}];
  },
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.list_old_instanceList));
