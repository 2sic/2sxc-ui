﻿import { CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.appSettings, 'AppSettings', 'sliders', true, false, {

  dialog: () => CommandNames.edit,

  disabled: (context) => context.app.settingsId === null,

  title: (context) =>
  `Toolbar.AppSettings${
    context.app.settingsId === null ? 'Disabled' : ''
  }`,

  // only if settings exist, or are 0 (to be created)
  showCondition: (context) => context.user.CanAdmin,

  configureLinkGenerator: (context, linkGenerator) => {
    linkGenerator.items = [{ EntityId: context.app.settingsId }];
  },

  // if it doesn't have a settings, make it less strong
  dynamicClasses: (context) => context.app.settingsId !== null ? '' : 'empty',

  // The items will transport the settingsId
  noItems: false,
});
