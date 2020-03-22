import { Commands } from '..';

export const CmdContentType = 'contenttype';
/**
 * import this module to commands.ts
 */
Commands.add(CmdContentType, 'ContentType', 'fields', true, false, {
    showCondition: (context) => {
        return context.user.canDesign;
    },
});
