import { Commands } from '..';
import { TemplateIdentifier } from '../../interfaces/item-identifiers';

/**
 * @internal
 */
export const CmdTemplateDevelop = 'template-develop';

/**
 * import this module to commands.ts
 */
Commands.add(CmdTemplateDevelop, 'Develop', 'code', true, false, {
  newWindow: (_) => true,
  dialog: (_) => 'develop',

  showCondition: (context) => !!context.user.CanDevelop,

  configureLinkGenerator: (context, linkGenerator) => {
    const cb = context.contentBlock;
    const identifier: TemplateIdentifier = { EntityId: cb.templateId };
    if (cb.templatePath) identifier.Path = cb.templatePath;
    if (cb.edition) identifier.Edition = cb.edition;
    linkGenerator.items = [identifier];
  },

  addParamsToLink: (ctx) => ({ isshared: ctx.contentBlock.TemplateIsShared }),

});
