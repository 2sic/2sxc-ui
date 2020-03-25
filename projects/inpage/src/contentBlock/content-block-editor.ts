import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HtmlTools } from '../html/dom-tools';
import { renderer } from './render';

export class ContentBlockEditor {
    static prepareToAddContent = prepareToAddContent;
    static updateTemplateFromDia = updateTemplateFromDia;
    static getPreviewWithTemplate = getPreviewWithTemplate;
}

/**
 * prepare the instance so content can be added
 * this ensure the content-group has been created, which is required to add content
 * @param {ContextComplete} context
 */
function prepareToAddContent(context: ContextComplete, useModuleList: boolean): Promise<string | void> {
  const isCreated: boolean = context.contentBlock.isCreated;
  if (isCreated || !useModuleList) return Promise.resolve();
  // return persistTemplate(sxc, null);
  // let manage = sxc.manage;
  // let contentGroup = manage._editContext.ContentGroup;
  // let showingAjaxPreview = $2sxc._toolbarManager.isDisabled(sxc);
  // let groupExistsAndTemplateUnchanged = !!contentGroup.HasContent; // && !showingAjaxPreview;

  const templateId = context.contentBlock.templateId;

  // template has not changed
  // if (groupExistsAndTemplateUnchanged) return $.when(null);

  // persist the template
  return updateTemplate(context, templateId, true);
}

/**
 * Update the template and adjust UI accordingly.
 * @param {ContextComplete} context
 * @param {number} templateId
 * @param {boolean} forceCreate
 */
function updateTemplateFromDia(context: ContextComplete, templateId: number): Promise<void> {
  const wasShowingPreview = HtmlTools.isDisabled(context.sxc);

  return updateTemplate(context, templateId, false)
    .then(() => {
      // only reload on ajax, not on app as that was already re-loaded on the preview
      // necessary to show the original template again
      if (wasShowingPreview)
        renderer.reloadAndReInitialize(context);
    });
}

/**
 * Update the template.
 */
function updateTemplate(context: ContextComplete, templateId: number, forceCreate: boolean): Promise<string | void> {

  return saveTemplate(context, templateId, forceCreate).then((data) => {
    if (!data) return null;

    // fixes a special case where the guid is given with quotes (depends on version of angularjs) issue #532
    const newGuid = data.replace(/[\",\']/g, '');

    if (console)
      console.log(`created content group {${newGuid}}`);

    return context.contentBlock.contentGroupId = newGuid;
  }).catch(() => {
    // error handling
    return alert('error - result not ok, was not able to create ContentGroup');
  });
}


/**
 * Save the template configuration for this instance
 * @param {ContextComplete} context
 * @param {number} templateId
 * @param {boolean} [forceCreateContentGroup]
 * @returns {promise}
 */
function saveTemplate(context: ContextComplete, templateId: number, forceCreateContentGroup: boolean): Promise<string> {
    const params: WebApiParams = {
      templateId: templateId,
      forceCreateContentGroup: forceCreateContentGroup,
      newTemplateChooserState: false,
    };
    return new Promise(
      (resolve, reject) => {
        context.sxc.webApi.get(
          {
            url: 'view/module/savetemplateid',
            params: params,
          }).done((data, textStatus, jqXhr) => {
            // resolve or reject based on http-status: 200 & 204 = ok
            if (jqXhr.status === 204 || jqXhr.status === 200)
              resolve(data);
            else
              reject(Error(textStatus));
        }).fail((jqXhr, textStatus, errorThrown: string) => {
            reject(Error(errorThrown));
          });
      });
}


/**
 * Retrieve the preview from the web-api
 * @param {ContextComplete} context
 * @param {number} templateId
 * @returns {promise} promise with the html in the result
 */
function getPreviewWithTemplate(context: ContextComplete, templateId: number): Promise<string> {
    templateId = templateId || -1; // fallback, meaning use saved ID
    const params: WebApiParams = {
      templateId: templateId,
      lang: context.app.currentLanguage,
      cbisentity: context.contentBlock.isEntity,
      cbid: context.contentBlock.id,
      originalparameters: JSON.stringify(context.instance.parameters),
    };
    return new Promise((resolve, reject) => {
        context.sxc.webApi.get({
          url: 'view/module/rendertemplate',
          params: params,
          dataType: 'html',
        }).done((data, textStatus: string, jqXhr) => {
          if (jqXhr.status === 204 || jqXhr.status === 200) {
            // resolve the promise with the response text
            resolve(data);
          } else {
            // otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(textStatus));
          }
          }).fail((jqXhr, textStatus: string, errorThrown: string) => {
            reject(Error(errorThrown));
        });
      });
}

interface WebApiParams {
    templateId?: number;
    lang?: string;
    cbisentity?: boolean;
    cbid?: number;
    originalparameters?: string;
    forceCreateContentGroup?: boolean;
    newTemplateChooserState?: boolean;
    zoneId?: number;
    appId?: number;
}
