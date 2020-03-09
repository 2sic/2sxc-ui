import { modManage } from './mod-manage';
import { $quickE as quickE } from './quick-e';
import { selectors } from './selectors-instance';

export class Mod implements Delete {
  delete(clip: any): void {
    if (!confirm('are you sure?')) return;
    const modId = modManage.getModuleId(clip.item.className);
    modManage.delete(modId);
  }

  // todo: unsure if this is a good place for this bit of code...
  static move(oldClip: any, newClip: any, from: number, to: number): void {
    const modId = modManage.getModuleId(oldClip.item.className);
    const pane: string = modManage.getPaneName(newClip.list);
    modManage.move(modId, pane, to);
  }

  static sendToPane(): void {
    const pane: string = quickE.main.actionsForModule.closest(selectors.mod.listSelector);

    // show the pane-options
    const pl = quickE.selected.find('#paneList');
    // ReSharper disable once CssBrowserCompatibility
    if (!pl.is(':empty'))
      pl.empty();
    pl.append(modManage.getMoveButtons(modManage.getPaneName(pane)));
  }
}
