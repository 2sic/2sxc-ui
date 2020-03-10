import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('contenttype', 'ContentType', 'fields', true, false, {
    showCondition: (context) => {
        return context.user.canDesign;
    },
});
