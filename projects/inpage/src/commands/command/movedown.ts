import { Commands, SharedLogic } from '..';
import { Actions } from './content-list-actions';

export const CmdMoveDown = 'movedown';

/**
 * import this module to commands.ts
 */
Commands.add(CmdMoveDown, 'MoveDown', 'move-down', false, true, {
    // TODO: do not display if is last item in list
    showCondition: (context) => SharedLogic.isList(context),
    code(context) {
        // TODO: make sure index is never greater than the amount of items
        return Actions.changeOrder(
            context,
            context.button.command.params.sortOrder,
            context.button.command.params.sortOrder + 1,
        );
    },
});
