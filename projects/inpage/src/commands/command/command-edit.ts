import { CommandNames, Commands } from '..';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.edit, 'Edit', 'pencil', false, true, {
  addParamsToLink: (ctx) => ({ mode: CommandNames.edit }),
  showCondition(ctx) {
    // need ID or a "slot", otherwise edit won't work
    const result =
      !!ctx.button.command.params.entityId ||
      !!ctx.button.command.params.useModuleList;
    return result;
  },
});
