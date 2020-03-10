import { Actions } from '../../actions/actions';
import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('moveup', 'MoveUp', 'move-up', false, true, {
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
