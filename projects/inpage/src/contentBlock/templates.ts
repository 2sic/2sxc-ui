﻿import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { isDisabled } from '../toolbar/build-toolbars';
import { renderer } from './render';
import { saveTemplate } from './web-api-promises';

/**
 * prepare the instance so content can be added
 * this ensure the content-group has been created, which is required to add content
 * @param {ContextBundleButton} context
 */
export function prepareToAddContent(context: ContextBundleButton, useModuleList: boolean): Promise<string | void> {
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
 * @param {ContextBundleButton} context
 * @param {number} templateId
 * @param {boolean} forceCreate
 */
export function updateTemplateFromDia(context: ContextBundleButton, templateId: number): Promise<void> {
  const wasShowingPreview = isDisabled(context.sxc);

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
function updateTemplate(context: ContextBundleButton, templateId: number, forceCreate: boolean): Promise<string | void> {

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
