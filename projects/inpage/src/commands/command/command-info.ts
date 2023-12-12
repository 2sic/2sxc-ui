import { CmsEngine, CommandNames, Commands } from '..';
import { ContextComplete } from '../../context';
import { TypeNoteMode } from '../../toolbar/config';
import { iconPrefix, tlbI18nPrefix } from '../command';
import { Note } from '../../toolbar/config/toolbar-button-settings';
import { Debug } from '../../constants/debug';

const debug = Debug.parts.commandInfo;

const i18nKeys: Record<TypeNoteMode, string> = {
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
  help: 'Help',
  link: 'Link',
}

const icons: Record<TypeNoteMode, string> = {
  info: 'info',
  warning: 'warning',
  error: 'warning',
  help: 'Help',
  link: 'Link',
}
const colors = {
  info: 'gray',
  warning: 'orange',
  error: 'red',
}

function getNote(ctx: ContextComplete): Note {
  if (debug) console.log('2dm - note: ctx-ui', ctx?.ui);
  const note = ContextComplete.getRule(ctx)?.ui?.note ?? { };
  // Set type explicitly (spread operator wouldn't always work, because type could be null)
  note.type = note.type ?? 'info';
  if (debug) console.log('2dm - note', note);
  return note;
}

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.info, 'Info', 'info', true, false, {

  icon: (ctx) => iconPrefix + (icons[getNote(ctx).type] ?? 'info'),

  title: (ctx) => tlbI18nPrefix + (i18nKeys[getNote(ctx).type as TypeNoteMode] ?? 'Info'),

  color: (ctx) => colors[getNote(ctx)?.type as keyof typeof colors ?? 'info'],

  // TODO: improve call so params are always directly available
  code(context, event) {
    if (debug) console.log('2dm - info-button code', context);
    const params = context.button.command.params;
    const link = params?.link as string;
    const target = params?.target as string; 
    if (debug) console.log('2dm - info-button code - link', link);

    if (!link) {
      console.log('info-button clicked, but nothing will happen, because no link was specified in the params. This may be expected/ok.');
      return Promise.resolve();
    }

    // try to use normal click behavior, otherwise use window.open
    if (!CmsEngine.applyLinkToButton(event, link, target))
      window.open(link as string, target ?? '_blank');
    return Promise.resolve();
  },
});
