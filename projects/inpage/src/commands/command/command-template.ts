import { Command, CommandNames, Commands } from '..';
import { TemplateIdentifier } from '../../../../$2sxc/src/cms/item-identifiers';

/**
 * import this module to commands.ts
 * @internal
 */
const cmd = Command.build(CommandNames.template, 'Develop', 'code', true, false, {
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

  parameters: (ctx) => ({ isshared: ctx.contentBlock.templateIsShared }),

  // Special: the items are fake, they transport info about the template
  noItems: false,
});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.template_old_develop));
