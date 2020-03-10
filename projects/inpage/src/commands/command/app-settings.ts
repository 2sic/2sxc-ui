﻿import { Commands } from '../commands';

/**
 * import this module to commands.ts
 */
Commands.add('app-settings', 'AppSettings', 'sliders', true, false, {
    dialog: (context) => 'edit',
    disabled: (context) => {
        return context.app.settingsId === null;
    },
    title: (context) =>
        `Toolbar.AppSettings${
            context.app.settingsId === null ? 'Disabled' : ''
        }`,
    showCondition: (context) => {
        return context.user.canDesign && !context.app.isContent; // only if settings exist, or are 0 (to be created)
    },
    configureCommand: (context, command) => {
        command.items = [{ EntityId: context.app.settingsId }];
    },
    dynamicClasses: (context) => {
        return context.app.settingsId !== null ? '' : 'empty'; // if it doesn't have a query, make it less strong
    },
});
