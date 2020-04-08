import { C } from '../constants';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HtmlTools } from '../html/dom-tools';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { windowInPage as window } from '../interfaces/window-in-page';
import { QuickE } from '../quick-edit/quick-e';
import { ContentBlockEditor } from './content-block-editor';

/*
 * this is the content block manager in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */


class Renderer {
  /**
   * Show a message where the content of a module should be - usually as placeholder till something else happens
   * @param {ContextComplete} context
   * @param {string} newContent
   * @returns {} nothing
   */
  showMessage(context: ContextComplete, newContent: string): void {
    $(SxcEdit.getTag(context.sxc)).html(newContent);
  }


  /**
   * this one assumes a replace / change has already happened, but now must be finalized...
   * @param {ContextComplete} context
   * @param {boolean} forceAjax
   * @param {boolean} preview
   */
  reloadAndReInitialize(context: ContextComplete, forceAjax?: boolean, preview?: boolean): Promise<void> {
    // if ajax is not supported, we must reload the whole page
    if (!forceAjax && !context.app.supportsAjax) {
      window.location.reload();
      return Promise.resolve();
    }

    return this.ajaxLoad(context, C.ContentBlock.UseExistingTemplate, preview)
      .then((result) => {
        // If Evoq, tell Evoq that page has changed if it has changed (Ajax call)
        if (window.dnn_tabVersioningEnabled) { // this only exists in evoq or on new DNNs with tabVersioning
          try {
            window.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
          } catch (e) {
            // ignore
          }
        }
        return result;
      }).catch((error) => console.log('Error in reloadAndReInitialize', error));
  }

  /**
   * ajax-call, then replace
   * @param {ContextComplete} context
   * @param {number} alternateTemplateId
   * @param {boolean} justPreview
   */
  ajaxLoad(context: ContextComplete, alternateTemplateId: number, justPreview: boolean): Promise<void> {
    return ContentBlockEditor.getPreviewWithTemplate(context, alternateTemplateId)
      .then((result: string) => {
        this.replaceContentBlock(context, result, justPreview);
      })
      .then(() => {
        QuickE.reset();
      }); // reset quick-edit, because the config could have changed
  }


  /**
   * ajax update/replace the content of the content-block
   * optionally also initialize the toolbar (if not just preview)
   * @param {ContextComplete} context
   * @param {string} newContent
   * @param {boolean} justPreview
   */
  private replaceContentBlock(context: ContextComplete, newContent: string, justPreview: boolean): void {
    try {
      const newDom = $(newContent);

      // Must disable toolbar before we attach to DOM
      if (justPreview) HtmlTools.disable(newDom);

      $(SxcEdit.getTag(context.sxc)).replaceWith(newDom);

      // reset the cache, so the sxc-object is refreshed
      context.sxc.recreate(true);
    } catch (e) {
      console.log('Error while rendering template:', e);
    }
  }
}



export const renderer = new Renderer();
