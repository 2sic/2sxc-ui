import { CommandNames, Commands } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.appSettings, 'AppSettings', 'sliders', true, false, {

  dialog: () => CommandNames.edit,

  disabled: (ctx) => ctx.app.settingsId === null,

  title: (ctx) =>
  `Toolbar.AppSettings${
    ctx.app.settingsId === null ? 'Disabled' : ''
  }`,

  // only if settings exist, or are 0 (to be created)
  showCondition: (ctx) => ctx.user.CanAdmin,

  // configureLinkGenerator: (context, linkGenerator) => {
  //   linkGenerator.items = [{ EntityId: context.app.settingsId }];
  // },

  customItems: (ctx, _) => {
    return [{ EntityId: ctx.app.settingsId }];
  },

  // if it doesn't have a settings, make it less strong
  dynamicClasses: (ctx) => ctx.app.settingsId !== null ? '' : 'empty',

  // The items will transport the settingsId
  noItems: false,
});
