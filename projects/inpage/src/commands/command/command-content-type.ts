import { Command, CommandContentTypeParams, CommandNames, Commands } from '..';
import { ContextComplete } from '../../context';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = Command.build(CommandNames.fields, 'ContentType', 'fields', true, false, {
  dialog: (_) => CommandNames.fields_old_contenttype,

  addParamsToLink: createContentTypeParams,

  // only show to admin-users and in cases where we know the content-type
  showCondition: (context) => !!context.user.CanDevelop && !!createContentTypeParams(context).contentType,

  noItems: true,
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.fields_old_contenttype));


/**
 * @internal
 */
export function createContentTypeParams(context: ContextComplete): { contentType: string } {
  const result: CommandContentTypeParams = {
    contentType: context.button.command.params.contentType
    || context.contentBlock.contentTypeId,
  };
  return result;
}
