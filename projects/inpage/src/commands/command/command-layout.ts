import { CmsEngine, CommandNames, Commands, tlbI18nPrefix } from '..';
import { QeSelectors } from '../../quick-edit';
import { ContextForLists } from '../../quick-edit/context-for-lists';
import { Note } from '../../toolbar/config/Note';
import { DomTools } from '../../../../$2sxc/src/dom/dom-tools';
import { editionInNote } from './command-edition';

const translateKey = 'ChangeLayout';

/**
 * import this module to commands.ts
 * @internal
 */
Commands.add(CommandNames.layout, translateKey, 'glasses', true, true, {

  inlineWindow: (_) => true,

  code(ctx, event) {
    // console.log('layout');
    // Try to find the closest tag based on the click
    // if this fails, try to find it based on the sxc-instance
    const attrSel = '[' + QeSelectors.blocks.cb.context + ']';
    // note: sometimes when the page loads, this can be auto-triggered and not have an event
    const listSpecs = DomTools.getTag(ctx.sxc).closest<HTMLElement>(attrSel);

    // Now check if we have apps-parameters to pass on
    if (listSpecs) {
      const specs = ContextForLists.getFromDom(listSpecs);
      ctx.button.command.params.apps = specs.apps;
    }
    return CmsEngine.openDialog(ctx, event, 'commandLayout.add');
  },

  /** make button disabled on details-views */
  disabled(ctx) {
    return !!ctx.contentBlock.viewSwitchDisabled;
  },

  title(ctx) {
    const i18nKey = tlbI18nPrefix + translateKey + (!ctx.contentBlock.viewSwitchDisabled ? '' : 'Disabled');
    // console.log('layout title', i18nKey);
    return i18nKey;
  },

  
  notes(ctx) {
    // Debug.log(`2dm ctx`, context);

    const app = ctx.app;
    const cb = ctx.contentBlock;
    const edition = cb.edition;

    const lightspeed = `<a href="https://go.2sxc.org/lightspeed" target="_blank">⚡ LightSpeed Cache</a>`
    const renderTime = cb.renderLightspeed
      ? `<strike>${cb.renderMs}ms</strike> 0ms using ${lightspeed}`
      : `${cb.renderMs}ms (no ${lightspeed})`;

    const queryInfo = cb.queryName ? `Query: ${cb.queryName} <br>${cb.queryInfo}<br>` : '';

    const editionButton = editionInNote(ctx, false);

    const stats = `
    App: <strong>${app.appName}</strong> <br>
    View: <strong>${cb.viewName}</strong> - ${(edition ? 'edition: ' + editionButton : '')}<br>
    ${queryInfo}
    Page: ${ctx.page.id}, Module: ${ctx.instance.id} <br>
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
  },

  noItems: true,
});
