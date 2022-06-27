﻿import { Command, CommandNames, Commands } from '..';
import { createContentTypeParams } from './command-content-type';

const oldName = 'contentitems';

/**
 * import this module to commands.ts
 * @internal
 */
 const cmd = Command.build(CommandNames.data, 'ContentItems', 'table', true, false, {
  dialog: (_) => oldName,
  
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

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, oldName));