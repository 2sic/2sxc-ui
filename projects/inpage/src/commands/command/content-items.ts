import { Commands } from '..';

export const CmdContentItems = 'contentitems';
/**
 * import this module to commands.ts
 */
Commands.add(CmdContentItems, 'ContentItems', 'table', true, false, {
    addParamsToLink: (context) => {
        const typeName = context.button.command.params.contentType
            || context.contentBlock.contentTypeId;
        return {
            // old name for the previous UI
            // 2021-11-29 2dm - believe this is obsolete, will turn off and see if everything works
            // #cleanUp EOY 2021
            // contentTypeName: typeName,

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
