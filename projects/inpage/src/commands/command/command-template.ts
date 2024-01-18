import { Command, CommandNames, Commands } from '..';
import { TemplateIdentifier } from '../../../../$2sxc/src/cms';

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

  addParamsToLink: (ctx) => ({ isshared: ctx.contentBlock.templateIsShared }),

});

Commands.addCommand(cmd);
Commands.addCommand(Command.clone(cmd, CommandNames.template_old_develop));
