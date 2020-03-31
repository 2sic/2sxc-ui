﻿import { Commands } from '..';

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
        const result = (
            !!context.button.command.params.entityId ||
            !!context.button.command.params.useModuleList
        ); // need ID or a "slot", otherwise edit won't work
console.log('showCondition edit', context.button.command.params.entityId, result, );
        return result;
    },
});
