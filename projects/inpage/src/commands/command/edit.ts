import { CommandNames, Commands } from '..';

/**
 * @internal
 */
export const CmdEditDialog = 'edit';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 */
Commands.add(CommandNames.edit, 'Edit', 'pencil', false, true, {
    addParamsToLink: (ctx) => ({ mode: CmdEditDialog }),
    showCondition(ctx) {
        // need ID or a "slot", otherwise edit won't work
        const result =
            !!ctx.button.command.params.entityId ||
            !!ctx.button.command.params.useModuleList;
        return result;
    },
});
