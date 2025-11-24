import { CommandNames, Commands, tlbI18nPrefix } from '..';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.appResources, 'AppResources', 'translate', true, false, {
  dialog: (_) => CommandNames.edit,

  disabled: (ctx) => ctx.app.resourcesId === null,

  title: (ctx) => `${tlbI18nPrefix}AppResources${ctx.app.resourcesId === null ? 'Disabled' : ''}`,

  // only if resources exist or are 0 (to be created)...
  showCondition: (ctx) => !!ctx.user.CanAdmin,

  // configureLinkGenerator: (context, linkGenerator) => {
  //   linkGenerator.items = [{ EntityId: context.app.resourcesId }];
  // },

  customItems: (ctx, _) => {
    return [{ EntityId: ctx.app.resourcesId }];
  },

  // if it doesn't have a query, make the button faded
  dynamicClasses: (ctx) => ctx.app.resourcesId !== null ? '' : 'empty',

  // The items will transport the resourcesId
  noItems: false,
});
