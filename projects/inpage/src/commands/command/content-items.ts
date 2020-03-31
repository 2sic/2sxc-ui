import { Commands } from '..';

export const CmdContentItems = 'contentitems';
/**
 * import this module to commands.ts
 */
Commands.add(CmdContentItems, 'ContentItems', 'table', true, false, {
    params: (context) => {
        const typeName = context.button.command.params.contentType
            || context.contentBlock.contentTypeId;
        return {
            // old name for the previous UI
            contentTypeName: typeName,
            // new name for the new UI
            contentType: typeName,
        };
    },

    // only show to admin-users and in cases where we know the content-type
    showCondition: (context) => {
        return !!context.user.canDesign &&
            (!!context.button.command.params.contentType ||
                !!context.contentBlock.contentTypeId);
    },

    configureLinkGenerator: (context, linkGenerator) => {
        // optionally override with custom type
        // 2020-03-26 2dm seems superflues, because it's already merged in the params
        // if (linkGenerator.context.button.action.params.contentType)
        //     linkGenerator.urlParams.contentTypeName =
        //         linkGenerator.context.button.action.params.contentType;

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
