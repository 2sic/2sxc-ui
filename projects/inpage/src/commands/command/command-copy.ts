import { CommandNames, Commands } from '..';
import { CommandContentTypeParams, createContentTypeParams } from './command-content-type';
import { CommandParamsEntityById } from './command-params-entity';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.copy, 'Copy', 'copy', false, true, {
  dialog: (_) => CommandNames.edit,

  showCondition(ctx) {
    // needs to have an existing entityId to work
    return !!ctx.button.command.params.entityId;
  },

  configureLinkGenerator: (ctx, linkGenerator) => {
    const originalId = ctx.button.command.params.entityId;
    const typeName = createContentTypeParams(ctx).contentType;
    if (!typeName) throw new Error("can't copy: missing contentType");
    linkGenerator.items = [{ DuplicateEntity: originalId, ContentTypeName: typeName }];
  },
});

/**
 * Parameters used for the command `copy`.
 * Will copy the entity on `entityId`.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandCopyParams extends CommandContentTypeParams, CommandParamsEntityById {
}
