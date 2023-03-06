import { CommandNames, Commands } from '..';
import { ContextComplete } from '../../context';
import { TypeNoteMode } from '../../toolbar/config';
import { iconPrefix, tlbI18nPrefix } from '../command';
import { Note } from '../../toolbar/config/toolbar-button-settings';

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

function getNote(ctx: ContextComplete): Note {
  const note = ContextComplete.getRule(ctx)?.ui?.note;
  if (!note) return { type: 'info', note: null };
  // if (typeof note === 'string')
  //   return { note: note, type: 'info' };
  // if (typeof note === 'object') 
  return { type: 'info', ...note };
}

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.info, 'Info', 'info', true, false, {

  icon: (ctx) => iconPrefix + (getNote(ctx)?.type),

  title: (ctx) => tlbI18nPrefix + (i18nKeys[getNote(ctx)?.type as TypeNoteMode] ?? 'Info'),

  color: (ctx) => colors[getNote(ctx)?.type as keyof typeof colors ?? 'info'],

  code(context, event) {
    const params = context.button.command.params;

    if (params?.link)
      window.open(params?.link as string, '_blank');
    else
      console.log('info-button clicked, but nothing will happen, because no link was specified in the params. This may be expected/ok.');

    return Promise.resolve();
  },
});
