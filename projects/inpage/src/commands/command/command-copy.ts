import { CmdParHlp, CommandNames, Commands } from '..';
import { createContentTypeParams } from './command-content-type';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.copy, 'Copy', 'copy', false, true, {
  dialog: (_) => CommandNames.edit,

  // needs to have an existing entityId to work
  showCondition: (ctx) => !!ctx.button.command.params.entityId,

  // configureLinkGenerator: (ctx, linkGenerator) => {
  //   const originalId = ctx.button.command.params.entityId;
  //   const typeName = createContentTypeParams(ctx).contentType;
  //   if (!typeName)
  //     throw new Error("can't copy: missing contentType");
  //   linkGenerator.items = [{ DuplicateEntity: originalId, ContentTypeName: typeName }];
  // },

  customItems: (ctx, _) => {
    const params = ctx.button.command.params;
    const originalId = params.entityId;
    const typeName = createContentTypeParams(ctx).contentType;
    if (!typeName)
      throw new Error("can't copy: missing contentType");

    console.log('2dm - copy custom items', params);

    // only return the copy info if not using module list - variant for before 20.09
    const item = { DuplicateEntity: originalId, ContentTypeName: typeName };
    if (!params.parent || !params.fields)
      return [item];

    return [{
      ...item,
      EntityId: 0,
      Add: true,
      Parent: params.parent,
      Field: params.fields,
      Index: CmdParHlp.getIndex(params) + 1,
    }];
  },
});
