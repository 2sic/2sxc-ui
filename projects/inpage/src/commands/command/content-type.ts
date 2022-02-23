import { Commands } from '..';

export const CmdContentType = 'contenttype';
/**
 * import this module to commands.ts
 */
Commands.add(CmdContentType, 'ContentType', 'fields', true, false, {
    addParamsToLink: (context) => ({
        // added in 10.27 to help with the new edit ui
        contentType: context.button.command.params.contentType
            || context.contentBlock.contentTypeId,
    }),

    // only show to admin-users and in cases where we know the content-type
    showCondition: (context) => {
        return !!context.user.CanDevelop &&
            (!!context.button.command.params.contentType ||
                !!context.contentBlock.contentTypeId);
    },
});
