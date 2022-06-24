import { CommandContentTypeParams, CommandNames, Commands } from '..';
import { ContextComplete } from '../../context';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.contentType, 'ContentType', 'fields', true, false, {
  addParamsToLink: createContentTypeParams,

  // only show to admin-users and in cases where we know the content-type
  showCondition: (context) => {
    return !!context.user.CanDevelop && !!createContentTypeParams(context).contentType;
  },
});




/**
 * @internal
 */
export function createContentTypeParams(context: ContextComplete) {
  const result: CommandContentTypeParams = {
    contentType: context.button.command.params.contentType
    || context.contentBlock.contentTypeId,
  };
  return result;
}
