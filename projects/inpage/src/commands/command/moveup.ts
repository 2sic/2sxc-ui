import { Commands } from '../commands';
import { Actions } from './content-list-actions';

export const CmdMoveUp = 'moveup';
/**
 * import this module to commands.ts
 */
Commands.add(CmdMoveUp, 'MoveUp', 'move-up', false, true, {
    showCondition(context) {
        return (
            context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1 &&
            context.button.action.params.sortOrder !== 0
        );
    },
    code(context) {
        return Actions.changeOrder(
            context,
            context.button.action.params.sortOrder,
            Math.max(context.button.action.params.sortOrder - 1, 0),
        );
    },
});
