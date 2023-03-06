import tippy from 'tippy.js';
import { CommandNames, Commands } from '..';
import { iconPrefix, tlbI18nPrefix } from '../command';

const noMessage = 'no message specified';

const modes = {
  info: 'info',
  warning: 'warning',
  help: 'help',
  link: 'link',
}
const i18nKeys = {
  info: 'Info',
  warning: 'Warning',
  help: 'Help',
  link: 'Link',
}

const colors = {
  info: 'gray',
  warning: 'orange',
}


/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.info, 'Info', 'info', true, false, {

  icon: (ctx) => iconPrefix + (ctx.button.command.params?.mode ?? 'info'),

  title: (ctx) => tlbI18nPrefix + (i18nKeys[ctx.button.command.params?.mode as keyof typeof i18nKeys ?? 'info'] ?? 'Info'),

  color: (ctx) => colors[ctx.button.command.params?.mode as keyof typeof colors ?? 'info'],

  code(context, event) {
    const params = context.button.command.params;

    if (params?.link)
      window.open(params?.link as string, '_blank');
    else
      console.log('info-button clicked, but nothing will happen, because no link was specified in the params. This may be expected/ok.');

    return Promise.resolve();
  },

  tippy: (ctx, tag) => {
    const params = ctx.button.command.params;
    tippy(tag, {
      content: params?.message as string ?? noMessage,
      theme: 'light',
      arrow: true,
      // activate these to debug the styling in F12
      // trigger: 'click',
      // hideOnClick: false,
      // interactive: true,
    });
    return undefined;
  }

});
