import { Commands } from '../commands';
import { Actions } from './content-list-actions';
import { SharedLogic } from './shared-logic';

export const CmdMoveUp = 'moveup';
/**
 * import this module to commands.ts
 */
Commands.add(CmdMoveUp, 'MoveUp', 'move-up', false, true, {
    showCondition(context) {
        return !!(SharedLogic.isList(context) &&
            context.button.command.params.sortOrder !== 0
        );
    },
    code(context) {
        return Actions.changeOrder(
            context,
            context.button.command.params.sortOrder,
            Math.max(context.button.command.params.sortOrder - 1, 0),
        );
    },
});
