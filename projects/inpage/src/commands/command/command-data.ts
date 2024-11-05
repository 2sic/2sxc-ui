import { Command, CommandNames, Commands } from '..';
import { createContentTypeParams } from './command-content-type';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = Command.build(CommandNames.data, 'ContentItems', 'table', true, false, {
  dialog: (_) => CommandNames.data_old_contentItems,

  parameters: createContentTypeParams,

  // only show to admin-users and in cases where we know the content-type
  showCondition: (context) => !!context.user.CanAdmin && !!createContentTypeParams(context).contentType,

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

  noItems: true,
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.data_old_contentItems));
