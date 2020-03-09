import { Cb as cb } from './cb';
import { copyPasteInPage } from './clipboard';
import { $quickE as quickE } from './quick-e';
import { selectors } from './selectors-instance';

/**
 * content-block specific stuff like actions
 */
function onCbButtonClick() {
  const list: any = quickE.main.actionsForCb.closest(selectors.cb.listSelector);
  const listItems: any = list.find(selectors.cb.selector);
  const actionConfig: any = JSON.parse(list.attr(selectors.cb.context));
  let index: number = 0;
  const newGuid: string | null = actionConfig.guid || null;

  if (quickE.main.actionsForCb.hasClass(selectors.cb.class))
    index = listItems.index(quickE.main.actionsForCb[0]) + 1;

  // check cut/paste
  const cbAction = $(this).data('action');
  if (cbAction) {
    // this is a cut/paste action
    return copyPasteInPage(cbAction, list, index, selectors.cb.id);
  } else {
    const appOrContent = $(this).data('type');
    return cb.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
  }
}

quickE.cbActions.click(onCbButtonClick);
