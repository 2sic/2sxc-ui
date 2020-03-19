import { Actions } from './content-list-actions';
import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('movedown', 'MoveDown', 'move-down', false, true, {
    showCondition(context) {
        // TODO: do not display if is last item in list
        return (
            context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1
        );
    },
    code(context) {
        // TODO: make sure index is never greater than the amount of items
        return Actions.changeOrder(
            context,
            context.button.action.params.sortOrder,
            context.button.action.params.sortOrder + 1,
        );
    },
});
