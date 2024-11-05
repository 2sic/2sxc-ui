import { CommandNames, Commands } from '..';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.edit, 'Edit', 'pencil', false, true, {
  addParamsToLink: _ => ({ mode: CommandNames.edit }),
  showCondition(ctx) {
    const pars = ctx.button.command.params;
    // need ID or a "slot", otherwise edit won't work
    const result = !!pars.entityId || !!pars.useModuleList;
    return result;
  },
});
