import tippy from 'tippy.js';
import { CommandNames, Commands } from '..';
import { ContextComplete } from '../../context';
import { TypeNoteMode } from '../../toolbar/config';
import { iconPrefix, tlbI18nPrefix } from '../command';

const noMessage = 'no message specified';

const i18nKeys: Record<TypeNoteMode, string> = {
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

  icon: (ctx) => iconPrefix + (ContextComplete.getRule(ctx)?.ui?.noteType ?? 'info'),

  title: (ctx) => tlbI18nPrefix + (i18nKeys[ContextComplete.getRule(ctx)?.ui?.noteType as TypeNoteMode ?? 'info'] ?? 'Info'),

  color: (ctx) => colors[ContextComplete.getRule(ctx)?.ui?.noteType as keyof typeof colors ?? 'info'],

  code(context, event) {
    const params = context.button.command.params;

    if (params?.link)
      window.open(params?.link as string, '_blank');
    else
      console.log('info-button clicked, but nothing will happen, because no link was specified in the params. This may be expected/ok.');

    return Promise.resolve();
  },

  tippy: (ctx, tag) => {
    const ui = ContextComplete.getRule(ctx)?.ui;
    tippy(tag, {
      content: ui?.note as string ?? noMessage,
      theme: 'light',
      arrow: true,
      delay: [null, 500], // delay hide by 500ms
      // activate these to debug the styling in F12
      // trigger: 'click',
      // hideOnClick: false,
      // interactive: true,
    });
    return undefined;
  }

});
