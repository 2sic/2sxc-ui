import { Commands } from '..';
import { CmdEditDialog } from './edit';

export const CmdAppResources = 'app-resources';
/**
 * import this module to commands.ts
 */
Commands.add(CmdAppResources, 'AppResources', 'translate', true, false, {
    dialog: (_) => CmdEditDialog,

    disabled: (context) => context.app.resourcesId === null,

    title: (context) => `Toolbar.AppResources${context.app.resourcesId === null ? 'Disabled' : ''}`,

    // only if resources exist or are 0 (to be created)...
    showCondition: (context) => !!context.user.canDesign && !context.app.isContent,

    configureLinkGenerator: (context, linkGenerator) => {
        linkGenerator.items = [{ EntityId: context.app.resourcesId }];
    },

    // if it doesn't have a query, make the button faded
    dynamicClasses: (context) => context.app.resourcesId !== null ? '' : 'empty',
});
