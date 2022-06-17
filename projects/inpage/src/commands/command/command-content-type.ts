import { CommandNames, Commands } from '..';
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
 * Parameters used for the command `contenttype`.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandContentTypeParams {
  /**
   * The content-type name determines what items will be managed.
   */
  contentType: string;
}

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
