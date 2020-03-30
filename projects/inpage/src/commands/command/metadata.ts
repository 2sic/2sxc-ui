import { Commands } from '..';
import { ItemIdentifierSimple } from '../../interfaces/item-identifiers';
import { CmdEditDialog } from './edit';
import { CmdNewMode } from './new';

export const CmdMetadata = 'metadata';
/**
 * create a metadata toolbar
 *
 * import this module to commands.ts
 */
Commands.add(CmdMetadata, 'Metadata', 'tag', false, false, {

    params: (context) => ({ mode: CmdNewMode }),

    dialog: (context) => CmdEditDialog, // don't use "new" (default) but use "edit"

    // if it doesn't have data yet, make it less strong
    dynamicClasses: (context) => context.button.command.params.entityId ? '' : 'empty',

    // only add a metadata-button if it has metadata-infos
    showCondition: (context) => !!context.button.command.params.metadata,

    configureLinkGenerator(_, linkGenerator) {
        const itm: Partial<ItemIdentifierSimple> = {
            Title: 'EditFormTitle.Metadata',
            Metadata: { // O.bject.assign(
                ...{ keyType: 'string', targetType: 10 },
                ...linkGenerator.context.button.command.params.metadata },
        };
        linkGenerator.items[0] = {...linkGenerator.items[0], ...itm };
        // O.bject.assign(command.items[0], itm);
    },
});
