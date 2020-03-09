import { removeFromList } from '../../contentBlock/actions';
import { translate } from '../../translate/2sxc.translate';
import { CommandBase } from '../command-base';

/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 */
export class Remove extends CommandBase {
  constructor() {
    super();
    this.makeDef('remove',
      'Remove',
      'minus-circled',
      false,
      true,
      {
        showCondition(context) {
          return (context.contentBlock.isList) &&
            (context.button.action.params.useModuleList) &&
            (context.button.action.params.sortOrder !== -1);
        },
        code(context) {
          return new Promise((resolve, reject) => {
            if (confirm(translate('Toolbar.ConfirmRemove'))) {
              return removeFromList(context, context.button.action.params.sortOrder);
            }
            return resolve();
          });
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Remove();
