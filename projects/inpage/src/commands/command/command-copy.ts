import { CommandNames, Commands } from '..';
import { CommandContentTypeParams, createContentTypeParams } from './command-content-type';

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
    // TODO: DROP USE OF contentTypeName as soon as we fixed the events-app
    const typeName = createContentTypeParams(ctx).contentType;
    if (!typeName) throw new Error("can't copy: missing contentType");
    linkGenerator.items = [{ DuplicateEntity: originalId, ContentTypeName: typeName }];
  },
});

/**
 * Parameters used for the command `copy`
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandCopyParams extends CommandContentTypeParams {
  /**
   * Entity to copy, required or the button won't even appear.
   */
  entityId: number;
}
