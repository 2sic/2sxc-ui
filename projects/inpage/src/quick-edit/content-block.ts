import { Cb as cb } from './cb';
import { copyPasteInPage } from './clipboard';
import { $quickE as quickE } from './quick-e';
import { selectors } from './selectors-instance';

/**
 * content-block specific stuff like actions
 */
function onCbButtonClick() {
  const list = quickE.main.actionsForCb.closest(selectors.blocks.cb.listSelector);
  const listItems = list.find(selectors.blocks.cb.selector);
  const actionConfig = JSON.parse(list.attr(selectors.blocks.cb.context));
  let index: number = 0;
  const newGuid: string | null = actionConfig.guid || null;

  if (quickE.main.actionsForCb.hasClass(selectors.blocks.cb.class))
    index = listItems.index(quickE.main.actionsForCb[0]) + 1;

  // check cut/paste
  const cbAction = $(this).data('action');
  if (cbAction) {
    // this is a cut/paste action
    return copyPasteInPage(cbAction, list, index, selectors.blocks.cb.id);
  } else {
    const appOrContent = $(this).data('type');
    return cb.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
  }
}

quickE.cbActions.click(onCbButtonClick);
