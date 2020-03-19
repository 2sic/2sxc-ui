import { ItemIdentifierSimple } from '../../interfaces/item-identifiers';
import { Commands } from '../commands';

/**
 * create a metadata toolbar
 *
 * import this module to commands.ts
 */
Commands.add('metadata', 'Metadata', 'tag', false, false, {
    params: (context) => {
        return { mode: 'new' };
    },
    dialog: (context) => 'edit', // don't use "new" (default) but use "edit"
    dynamicClasses(context): string {
        // if it doesn't have data yet, make it less strong
        return context.button.action.params.entityId ? '' : 'empty';
        // return settings.items && settings.items[0].entityId ? "" : "empty";
    },

    showCondition(context) {
        return !!context.button.action.params.metadata;
    }, // only add a metadata-button if it has metadata-infos

    configureCommand(context, command) {
        const itm: Partial<ItemIdentifierSimple> = {
            Title: 'EditFormTitle.Metadata',
            Metadata: { // O.bject.assign(
                ...{ keyType: 'string', targetType: 10 },
                ...command.context.button.action.params.metadata },
        };
        command.items[0] = {...command.items[0], ...itm };
        // O.bject.assign(command.items[0], itm);
    },
});
