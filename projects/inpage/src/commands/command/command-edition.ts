import { CommandNames, Commands } from '..';
import { ContextComplete } from '../../context';
import { Note } from '../../toolbar/config/Note';

const ConfigEditionContentType = 'b535b6aa-d0a1-40c1-b996-b7e8461efc0c'; // this is the content type for the edition configuration

/**
 * This is a dummy command to just set an edition.
 * It's not meant to show in the toolbar, but it should be callable on $2sxc(...).cms.run({ action: 'edition' })
 * 
 * can have these parameters on the params object
 * - ask - force the UI to prompt for the edition
 * - edition - the edition to set, or prefill in the prompt
 * - editions - optional list of editions to suggest
 * - reset: boolean - reset the edition
 * 
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.edition, 'Edition', 'edition', true, false, {

  code(context, _) {
    const edition = context.contentBlock.edition;
    return $2sxc(context.sxc.id, context.sxc.id).cms.run({
      action: CommandNames.new,
      params: {
        contentType: ConfigEditionContentType,
        edition,
      },
      settings: {
        save: 'false'
      },
    });
  },

  notes(context) {
    // Debug.log(`2dm ctx`, context);
    const edition = context.contentBlock.edition;
    const editionButton = editionInNote(context, true);

    const stats = `
    View: <strong>${context.contentBlock.viewName}</strong> - ${(edition ? 'edition: ' + editionButton : '')}<br>
    `;
    const note = `<strong>View / Edition</strong> <br>
    ${stats}`;

    const noteObj = new Note({
      type: 'info',
      note,
      asHtml: true,
      delay: 0,
      interactive: true,
      isSystem: true,
    });
    return [noteObj];
  },

  noItems: true,
});

/**
 * Edition info for inside a note.
 * Will contain either just the info / name, or a button to change it.
 * @param context 
 * @param showToAll show no matter what the permissions (otherwise super-user only)
 * @returns 
 */
export function editionInNote(context: ContextComplete, showToAll: boolean): string {
  const edition = context.contentBlock.edition;

  // figure out if we provide a button to change editions
  const enableEditionSwitch = showToAll || context.user.CanDevelop || context.user.canSwitchEdition;

  const editionButton = enableEditionSwitch
    ? `<button onclick="$2sxc(${context.sxc.id, context.sxc.id}).cms.run({ action:'edition'})">${edition}</button>`
    : edition;

  return editionButton;
}
