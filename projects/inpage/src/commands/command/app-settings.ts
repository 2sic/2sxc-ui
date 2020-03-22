import { Commands } from '..';
import { CmdEditDialog } from './edit';

export const CmdAppSettings = 'app-settings';

/**
 * import this module to commands.ts
 */
Commands.add(CmdAppSettings, 'AppSettings', 'sliders', true, false, {

    dialog: () => CmdEditDialog,

    disabled: (context) => context.app.settingsId === null,

    title: (context) =>
        `Toolbar.AppSettings${
            context.app.settingsId === null ? 'Disabled' : ''
    }`,

    // only if settings exist, or are 0 (to be created)
    showCondition: (context) => context.user.canDesign && !context.app.isContent,

    configureCommand: (context, linkGenerator) => {
        linkGenerator.items = [{ EntityId: context.app.settingsId }];
    },

    // if it doesn't have a settings, make it less strong
    dynamicClasses: (context) => context.app.settingsId !== null ? '' : 'empty',
});
