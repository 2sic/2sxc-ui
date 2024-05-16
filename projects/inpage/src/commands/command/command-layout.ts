import { CmsEngine, CommandNames, Commands } from '..';
import { QeSelectors } from '../../quick-edit';
import { ContextForLists } from '../../quick-edit/context-for-lists';
import { Note } from '../../toolbar/config/Note';
import { DomTools } from '../../../../$2sxc/src/dom/dom-tools';
import { Debug } from '../../constants/debug';
/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.layout, 'ChangeLayout', 'glasses', true, true, {

  inlineWindow: (_) => true,

  code(context, event) {
    // console.log('layout');
    // Try to find the closest tag based on the click
    // if this fails, try to find it based on the sxc-instance
    const attrSel = '[' + QeSelectors.blocks.cb.context + ']';
    // note: sometimes when the page loads, this can be auto-triggered and not have an event
    const listSpecs = DomTools.getTag(context.sxc).closest<HTMLElement>(attrSel);

    // Now check if we have apps-parameters to pass on
    if (listSpecs) {
      const specs = ContextForLists.getFromDom(listSpecs);
      context.button.command.params.apps = specs.apps;
    }
    return CmsEngine.openDialog(context, event);
  },

  
  notes(context) {
    // Debug.log(`2dm ctx`, context);

    const app = context.app;
    const cb = context.contentBlock;
    const edition = cb.edition;

    const lightspeed = `<a href="https://go.2sxc.org/lightspeed" target="_blank">⚡ LightSpeed Cache</a>`
    const renderTime = cb.renderLightspeed
      ? `<strike>${cb.renderMs}ms</strike> 0ms using ${lightspeed}`
      : `${cb.renderMs}ms (no ${lightspeed})`;

    const queryInfo = cb.queryName ? `Query: ${cb.queryName} <br>${cb.queryInfo}<br>` : '';

    const stats = `
    App: <strong>${app.appName}</strong> <br>
    View: <strong>${cb.viewName}</strong> ${(edition ? '[edition: ' + edition + ']' : '')}<br>
    ${queryInfo}
    Page: ${context.page.id}, Module: ${context.instance.id} <br>
    ⌛ ${renderTime} <br>
    `;
    const note = `<strong>Layout</strong> <br>
    ${stats}`;

    const noteObj = new Note({
      type: 'info',
      note,
      asHtml: true,
      delay: 500,
      interactive: true,
      isSystem: true,
    });
    return [noteObj];
  }
});
