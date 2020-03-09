import { changeOrder } from '../../contentBlock/actions';
import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class MoveUp extends CommandBase {
  constructor() {
    super();
    this.makeDef('moveup',
      'MoveUp',
      'move-up',
      false,
      true,
      {
        showCondition(context) {
          return (context.contentBlock.isList) &&
            (context.button.action.params.useModuleList) &&
            (context.button.action.params.sortOrder !== -1) &&
            (context.button.action.params.sortOrder !== 0);
        },
        code(context) {
          return changeOrder(context, context.button.action.params.sortOrder, Math.max(context.button.action.params.sortOrder - 1, 0));
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new MoveUp();
