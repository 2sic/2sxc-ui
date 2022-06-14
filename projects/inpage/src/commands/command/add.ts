﻿import { CommandNames, Commands } from '..';
import { Actions } from './content-list-actions';
import { SharedLogic } from './shared-logic';

/**
 * add brings no dialog, just add an empty item
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(
    CommandNames.add,
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
