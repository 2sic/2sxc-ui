import { CommandNames, Commands } from '..';
import { CommandMoveParams } from './command-movedown';
import { SharedLogic } from './shared-logic';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.replace, 'Replace', 'replace', false, true, {

    showCondition(context) {
        return SharedLogic.isReferencedItem(context);
    },

    configureLinkGenerator: (context, linkGenerator) => {
        // default case is ContentBlock - in which case it doesn't need to redefine the items
        if (!SharedLogic.isFieldList(context)) return;

        // fieldList - redefine the items
        const params = context.button.command.params;
        linkGenerator.items = [{ Group: {
            Guid: params.parent,
            Part: params.fields,
            Index: params.sortOrder,
            Add: false,
        }}];
    },
});


/**
 * Parameters used for the command `replace`.
 * <br>
 * ⚠️ do not use parameters in custom code, we plan to change the signature.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandReplaceParams extends CommandMoveParams {
}
