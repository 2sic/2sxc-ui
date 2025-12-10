import { CommandDefinition, CommandContentTypeParams, CommandNames, Commands } from '..';
import { ContextComplete } from '../../context';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = CommandDefinition.build(CommandNames.fields, 'ContentType', 'fields', true, false, {
  dialog: (_) => CommandNames.fields_old_contenttype,

  parameters: createContentTypeParams,

  // only show to admin-users and in cases where we know the content-type
  showCondition: (ctx) => !!ctx.user.CanDevelop && !!createContentTypeParams(ctx).contentType,

  noItems: true,
});

Commands.addCommand(cmd);
Commands.addCommand(CommandDefinition.clone(cmd, CommandNames.fields_old_contenttype));


/**
 * @internal
 */
export function createContentTypeParams(ctx: ContextComplete): { contentType: string } {
  return {
    contentType: ctx.button.command.params.contentType
    || ctx.contentBlock.contentTypeId,
  } satisfies CommandContentTypeParams;
}
