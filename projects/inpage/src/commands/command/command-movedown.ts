import { CmdParHlp, CommandNames, Commands, SharedLogic } from '..';
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
    const i = CmdParHlp.getIndex(context);
    return Actions.changeOrder(context, i, i + 1);
  },
});
