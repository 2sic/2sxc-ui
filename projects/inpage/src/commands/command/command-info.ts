import tippy from 'tippy.js';
// import 'tippy.js/themes/light.css';
import { CommandNames, Commands } from '..';
import { iconPrefix, tlbI18nPrefix } from '../command';

const noMessage = 'no message specified';


// todo
// - mode - naming etc.
// - color by code
// - icon by code
// - clearer tooltip api

const modes = {
  info: 'info',
  warning: 'warning',
  help: 'help',
  link: 'link',
}
const i18n = {
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

  // inlineWindow: (_) => true,
  icon: (ctx) => iconPrefix + (ctx.button.command.params?.mode ?? 'info'),

  title: (ctx) => tlbI18nPrefix + (i18n[ctx.button.command.params?.mode as keyof typeof i18n ?? 'info'] ?? 'Info'),

  color: (ctx) => colors[ctx.button.command.params?.mode as keyof typeof colors ?? 'info'],

  code(context, event) {
    const params = context.button.command.params; 

    const message = params?.message;
    if (!message) {
      alert(noMessage);
      return Promise.resolve();
    }
    
    if (!params?.link) {
      console.log('user clicked on info button, but nothing will happen, because no link was specified in the params');
      return Promise.resolve();
    }
    window.open(params?.link as string, '_blank');


    alert('info!' + message);
    console.log(context.ui, context, context.button);

    return Promise.resolve();
  },

  tippy: (ctx, tag) => {
    console.log('tippy', tag, ctx);
    tippy(tag, {
      content: 'this is a test',
      theme: 'light',
      arrow: true,
      trigger: 'click',
      interactive: true,
    });
    return undefined;
  }

});
