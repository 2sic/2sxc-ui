import { CommandNames, Commands, SharedLogic } from '..';
import { Actions } from './content-list-actions';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.moveDown, 'MoveDown', 'move-down', false, true, {
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
