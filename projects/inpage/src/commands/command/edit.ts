import { Commands } from '..';

export const CmdEdit = 'edit';
export const CmdEditDialog = 'edit';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 */
Commands.add(CmdEdit, 'Edit', 'pencil', false, true, {
    params: (context) => {
        return { mode: 'edit' };
    },
    showCondition(context) {
        return (
            !!context.button.action.params.entityId ||
            context.button.action.params.useModuleList
        ); // need ID or a "slot", otherwise edit won't work
    },
});
