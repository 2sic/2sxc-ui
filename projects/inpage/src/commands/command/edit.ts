import { Commands } from '../commands';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 */
Commands.add('edit', 'Edit', 'pencil', false, true, {
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
