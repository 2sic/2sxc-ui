import { Commands, SharedLogic } from '..';
import { translate } from '../../i18n';
import { Actions } from './content-list-actions';

export const CmdRemove = 'remove';
/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 */
Commands.add(CmdRemove, 'Remove', 'minus-circled', false, true, {
    showCondition: (context) => SharedLogic.isList(context),
    code(context) {
        return new Promise((resolve, reject) => {
            if (confirm(translate('Toolbar.ConfirmRemove')))
                return Actions.removeFromList(context);
            return resolve();
        });
    },
});
