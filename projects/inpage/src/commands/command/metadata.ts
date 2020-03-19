import { ItemIdentifierSimple } from '../../interfaces/item-identifiers';
import { Commands } from '../commands';

/**
 * create a metadata toolbar
 *
 * import this module to commands.ts
 */
Commands.add('metadata', 'Metadata', 'tag', false, false, {

    params: (context) => ({ mode: 'new' }),

    dialog: (context) => 'edit', // don't use "new" (default) but use "edit"

    // if it doesn't have data yet, make it less strong
    dynamicClasses: (context) => context.button.action.params.entityId ? '' : 'empty',

    // only add a metadata-button if it has metadata-infos
    showCondition: (context) => !!context.button.action.params.metadata,

    configureCommand(context, linkGenerator) {
        const itm: Partial<ItemIdentifierSimple> = {
            Title: 'EditFormTitle.Metadata',
            Metadata: { // O.bject.assign(
                ...{ keyType: 'string', targetType: 10 },
                ...linkGenerator.context.button.action.params.metadata },
        };
        linkGenerator.items[0] = {...linkGenerator.items[0], ...itm };
        // O.bject.assign(command.items[0], itm);
    },
});
