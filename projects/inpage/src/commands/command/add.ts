import { Actions } from './content-list-actions';
import { Commands as Commands } from '../commands';

/**
 * add brings no dialog, just add an empty item
 *
 * import this module to commands.ts
 */
Commands.add(
    'add',
    'AddDemo',
    'plus-circled',
    false,
    true,
    {
        showCondition(context) {
            return context.contentBlock.isList &&
                context.button.action.params.useModuleList &&
                context.button.action.params.sortOrder !== -1;
        },
        code(context) {
            return Actions.addItem(context, context.button.action.params.sortOrder + 1);
        },
    },
);
