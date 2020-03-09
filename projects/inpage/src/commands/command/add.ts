import { addItem } from '../../contentBlock/actions';
import { CommandBase } from '../command-base';

/**
 * add brings no dialog, just add an empty item
 *
 * import this module to commands.ts
 */
export class Add extends CommandBase {
  constructor() {
    super();
    this.makeDef('add',
      'AddDemo',
      'plus-circled',
      false,
      true,
      {
        showCondition(context) {
          return (context.contentBlock.isList) && (context.button.action.params.useModuleList) && (context.button.action.params.sortOrder !== -1);
        },
        code(context) {
          return addItem(context, context.button.action.params.sortOrder + 1);
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Add();
