import { Actions } from '../../actions/actions';
import { translate } from '../../translate/2sxc.translate';
import { Commands } from '../commands';

/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 */
Commands.add('remove', 'Remove', 'minus-circled', false, true, {
    showCondition(context) {
        return (
            context.contentBlock.isList &&
            context.button.action.params.useModuleList &&
            context.button.action.params.sortOrder !== -1
        );
    },
    code(context) {
        return new Promise((resolve, reject) => {
            if (confirm(translate('Toolbar.ConfirmRemove'))) {
                return Actions.removeFromList(
                    context,
                    context.button.action.params.sortOrder,
                );
            }
            return resolve();
        });
    },
});
