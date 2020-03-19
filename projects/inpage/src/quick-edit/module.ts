import { InstanceClipboard } from './clipboard';
import { modManage } from './mod-manage';
import { $quickE as quickE } from './quick-e';
import { selectors } from './selectors-instance';

/**
 * module specific stuff
 */
function onModuleButtonClick() {
  const type = $(this).data('type');
  const dnnMod = quickE.main.actionsForModule;
  const pane = dnnMod.closest(selectors.blocks.mod.listSelector);
  let index = 0;

  if (dnnMod.hasClass('DnnModule'))
    index = pane.find('.DnnModule').index(dnnMod[0]) + 1;

  const cbAction = $(this).data('action');
  if (cbAction) {
    return InstanceClipboard.do(cbAction, pane, index, selectors.blocks.mod.id); // copy/paste
  }
  return modManage.create(modManage.getPaneName(pane), index, type);
}

/**
 * bind module actions click
 */
quickE.modActions.click(onModuleButtonClick);
