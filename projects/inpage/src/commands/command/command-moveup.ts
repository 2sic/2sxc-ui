import { CmdParHlp, CommandNames, Commands } from '..';
import { Actions } from './content-list-actions';
import { SharedLogic } from './shared-logic';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.moveUp, 'MoveUp', 'move-up', false, true, {
  showCondition(context) {
    return !!(SharedLogic.isList(context) && CmdParHlp.getIndex(context) !== 0);
  },
  code(context) {
    const i = CmdParHlp.getIndex(context);
    return Actions.changeOrder(context, i, Math.max(i - 1, 0));
  },
});
