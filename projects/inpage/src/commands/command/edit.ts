import { Commands } from '..';

export const CmdEdit = 'edit';
export const CmdEditDialog = 'edit';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 */
Commands.add(CmdEdit, 'Edit', 'pencil', false, true, {
    params: (_) => {
        return { mode: 'edit' };
    },
    showCondition(context) {
        // need ID or a "slot", otherwise edit won't work
        const result =
            !!context.button.command.params.entityId ||
            !!context.button.command.params.useModuleList;
        return result;
    },
});
