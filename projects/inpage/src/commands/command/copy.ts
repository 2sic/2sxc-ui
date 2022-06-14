import { CommandNames, Commands } from '..';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 */
Commands.add(CommandNames.copy, 'Copy', 'copy', false, true, {
  dialog: (_) => CommandNames.edit,

  showCondition(ctx) {
    // needs to have an existing entityId to work
    return !!ctx.button.command.params.entityId;
  },

  // TODO: MAKE IT DISABLED IF DATA IS MISSING
  // disabled(context) {
  //     return !context.instance.allowPublish;
  // },

  configureLinkGenerator: (ctx, linkGenerator) => {
    // console.warn('debug link generator, ', ctx);
    // console.warn('items, ', linkGenerator.items);
    const originalId = ctx.button.command.params.entityId;
    const typeName = ctx.button.command.params.contentTypeName;
    if (!typeName) throw new Error("can't copy: missing contentTypeName");
    linkGenerator.items = [{ DuplicateEntity: originalId, ContentTypeName: typeName }];
    // console.warn('items, ', linkGenerator.items);
  },
});
