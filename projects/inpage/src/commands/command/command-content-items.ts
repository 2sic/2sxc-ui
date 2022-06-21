import { CommandNames, Commands } from '..';
import { CommandContentTypeParams, createContentTypeParams } from './command-content-type';


/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.contentItems, 'ContentItems', 'table', true, false, {
  addParamsToLink: createContentTypeParams,

  // only show to admin-users and in cases where we know the content-type
  showCondition: (context) => {
    return !!context.user.CanAdmin && !!createContentTypeParams(context).contentType;
  },

  configureLinkGenerator: (context, linkGenerator) => {
    if (context.button.command.params.filters) {
      let enc = JSON.stringify(context.button.command.params.filters);

      // special case - if it contains a "+" character, this won't survive
      // encoding through the hash as it's always replaced with a space, even if it would be pre converted to %2b
      // so we're base64 encoding it - see https://github.com/2sic/2sxc/issues/1061
      if (enc.indexOf('+') > -1) enc = btoa(enc);
      linkGenerator.urlParams.filters = enc;
    }
  },
});

/**
 * Parameters used for the command `contentitems`.
 * <br>
 * The content-type name determines what items will be managed.
 * <br>
 * ⤴️ back to [All Command Names](xref:Api.Js.SxcJs.CommandNames)
 */
export interface CommandContentItemsParams extends CommandContentTypeParams {
  /**
   * Filters to apply to the list of items.
   * <br>
   * Each property targets a field.
   * The value is a string, number or array for filtering EntityIds or EntityGuids
   */
  filters?: Record<string, string | number | string[] | number[]>;
}
