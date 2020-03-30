import { Commands } from '..';
import { Actions } from './content-list-actions';

export const CmdAdd = 'add';
/**
 * add brings no dialog, just add an empty item
 *
 * import this module to commands.ts
 */
Commands.add(
    CmdAdd,
    'AddDemo',
    'plus-circled',
    false,
    true,
    {
        showCondition(context) {
            return context.contentBlock.isList &&
                context.button.command.params.useModuleList &&
                context.button.command.params.sortOrder !== -1;
        },
        code(context) {
            return Actions.addItem(context, context.button.command.params.sortOrder + 1);
        },
    },
);
