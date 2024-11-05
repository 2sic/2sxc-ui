import { CommandNames, Commands } from '..';
import { Debug } from '../../constants/debug';
import { ContextComplete } from '../../context';
import { Note } from '../../toolbar/config/Note';
/**
 * This is a dummy command to just set an edition.
 * It's not meant to show in the toolbar, but it should be callable on $2sxc(...).cms.run({ action: 'log', params: { message: 'hello' } })
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

  code(context, event) {
    const appId = context.app.id;
    const cookieName = `app-${appId}-edition`;
    const params = context.button.command.params;
    const edOriginal = params.edition as string;

    if (params.reset)
      return resetCookie();

    const allEditions = params.editions as string ?? context.contentBlock.editions ?? '';
    const niceEditions = allEditions.split(',').join(', ');
    const editionsMsg = allEditions ? `Known Editions (from app.json): ${niceEditions}\n` : '';
    const promptMsg = `To switch to another edition on App ${appId}, enter the edition:\n${editionsMsg}\nRemember to reload the page afterwards to see the changes.`;

    const edition = (params.ask || !edOriginal)
        ? prompt(promptMsg, edOriginal as string ?? '')
        : edOriginal;

    Debug.log('command: app id', appId);
    Debug.log('command: log (message/context)', edition);
    Debug.log('command: edition (edition)', params.edition, context);

    // if edition is empty, unset the cookie
    if (!edition)
      return resetCookie();

    // set a cookie like "app-id-edition" but only for this browser windows session
    console.log(`Will set cookie ${cookieName}=${edition}`)
    document.cookie = `${cookieName}=${edition}; path=/;`;
    return new Promise((resolve, reject) => {});

    function resetCookie(): Promise<void> {
      console.log(`Will unset cookie ${cookieName}`);
      document.cookie = `${cookieName}=flush; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      return new Promise((resolve, reject) => {});
    }
  },

  notes(context) {
    // Debug.log(`2dm ctx`, context);
    const cb = context.contentBlock;
    const edition = cb.edition;
    const editionButton = editionInNote(context, true);

    const stats = `
    View: <strong>${cb.viewName}</strong> - ${(edition ? 'edition: ' + editionButton : '')}<br>
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
  const cb = context.contentBlock;
  const edition = cb.edition;

  // figure out if we provide a button to change editions
  const enableEditionSwitch = showToAll || context.user.CanDevelop || context.user.canSwitchEdition;

  const editionButton = enableEditionSwitch
    ? `<button onclick="$2sxc(${context.sxc.id, context.sxc.id}).cms.run({ action: 'edition', params: { ask: true, edition: '${edition}', editions: 'live,staging' } })">${edition}</button>`
    : edition;

  return editionButton;
}
