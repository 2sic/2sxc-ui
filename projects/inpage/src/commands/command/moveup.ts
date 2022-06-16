import { CommandNames } from '../command-names';
import { Commands } from '../commands';
import { Actions } from './content-list-actions';
import { SharedLogic } from './shared-logic';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.moveUp, 'MoveUp', 'move-up', false, true, {
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
