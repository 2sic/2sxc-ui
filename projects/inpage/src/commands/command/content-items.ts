import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('contentitems', 'ContentItems', 'table', true, false, {
    params: (context) => ({ contentTypeName: context.contentBlock.contentTypeId }),

    showCondition: (context) => {
        return (
            context.user.canDesign &&
            (!!context.button.action.params.contentType ||
                !!context.contentBlock.contentTypeId)
        );
    },

    configureCommand: (context, linkGenerator) => {
        if (linkGenerator.context.button.action.params.contentType)
            // optionally override with custom type
            linkGenerator.params.contentTypeName =
                linkGenerator.context.button.action.params.contentType;
        // maybe: if item doesn't have a type, use that of template
        // else if (cmdSpecs.contentTypeId)
        //    cmd.params.contentTypeName = cmdSpecs.contentTypeId;
        if (context.button.action.params.filters) {
            let enc = JSON.stringify(context.button.action.params.filters);

            // special case - if it contains a "+" character, this won't survive
            // encoding through the hash as it's always replaced with a space, even if it would be pre converted to %2b
            // so we're base64 encoding it - see https://github.com/2sic/2sxc/issues/1061
            if (enc.indexOf('+') > -1) enc = btoa(enc);
            linkGenerator.params.filters = enc;
        }
    },
});
