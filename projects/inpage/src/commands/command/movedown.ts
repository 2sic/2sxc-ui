import { changeOrder } from '../../contentBlock/actions';
import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class MoveDown extends CommandBase {
  constructor() {
    super();
    this.makeDef('movedown',
      'MoveDown',
      'move-down',
      false,
      true,
      {
        showCondition(context) {
          // TODO: do not display if is last item in list
          return (context.contentBlock.isList)
            && (context.button.action.params.useModuleList)
            && (context.button.action.params.sortOrder !== -1);
        },
        code(context) {
          // TODO: make sure index is never greater than the amount of items
          return changeOrder(context, context.button.action.params.sortOrder, context.button.action.params.sortOrder + 1);
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new MoveDown();
