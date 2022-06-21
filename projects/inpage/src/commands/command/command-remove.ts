import { CommandNames, Commands, SharedLogic } from '..';
import { translate } from '../../i18n';
import { Actions } from './content-list-actions';

/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.remove, 'Remove', 'minus-circled', false, true, {
  showCondition: (context) => SharedLogic.isList(context),
  code(context) {
    return new Promise((resolve, reject) => {
      if (confirm(translate('Toolbar.ConfirmRemove')))
      return Actions.removeFromList(context);
      return resolve();
    });
  },
});
