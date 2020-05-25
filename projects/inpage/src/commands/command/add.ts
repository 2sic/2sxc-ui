import { Commands } from '..';
import { Actions } from './content-list-actions';
import { SharedLogic } from './shared-logic';

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
        showCondition: (context) => SharedLogic.isList(context),
        code(context) {
            return Actions.addItem(context, context.button.command.params.sortOrder + 1);
        },
    },
);
