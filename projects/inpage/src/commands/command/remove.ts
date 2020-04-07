import { Commands } from '..';
import { translate } from '../../translate';
import { Actions } from './content-list-actions';

export const CmdRemove = 'remove';
/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 */
Commands.add(CmdRemove, 'Remove', 'minus-circled', false, true, {
    showCondition(context) {
        return !!(
            context.contentBlock.isList &&
            context.button.command.params.useModuleList &&
            context.button.command.params.sortOrder !== -1
        );
    },
    code(context) {
        return new Promise((resolve, reject) => {
            if (confirm(translate('Toolbar.ConfirmRemove'))) {
                return Actions.removeFromList(
                    context,
                    context.button.command.params.sortOrder,
                );
            }
            return resolve();
        });
    },
});
