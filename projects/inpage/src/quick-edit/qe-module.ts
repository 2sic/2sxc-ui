import { Delete, modManage, QeSelectors, QuickE, QuickEClipboard, Specs } from '.';

export class QeModule implements Delete {
  delete(clip: Specs): Promise<void> {
    if (!confirm('are you sure?')) return;
    const modId = modManage.getModuleId(clip.item.className);
    modManage.delete(modId);
  }

  // todo: unsure if this is a good place for this bit of code...
  static move(oldClip: Specs, newClip: Specs, from: number, to: number): void {
    const modId = modManage.getModuleId(oldClip.item.className);
    const pane: string = modManage.getPaneName(newClip.list);
    modManage.move(modId, pane, to);
  }

  static sendToPane(): void {
    const pane = QuickE.main.actionsForModule.closest(QeSelectors.blocks.mod.listSelector);

    // show the pane-options
    const pl = QuickE.selected.find('#paneList');
    // ReSharper disable once CssBrowserCompatibility
    if (!pl.is(':empty'))
      pl.empty();
    pl.append(modManage.getMoveButtons(modManage.getPaneName(pane)));
  }

  static onModuleButtonClick() {
    const type = $(this).data('type');
    const dnnMod = QuickE.main.actionsForModule;
    const pane = dnnMod.closest(QeSelectors.blocks.mod.listSelector);
    let index = 0;

    if (dnnMod.hasClass('DnnModule'))
        index = pane.find('.DnnModule').index(dnnMod[0]) + 1;

    const cbAction = $(this).data('action');
    if (cbAction)
        return QuickEClipboard.do(cbAction, pane, index, QeSelectors.blocks.mod.id); // copy/paste
    return modManage.create(modManage.getPaneName(pane), index, type);
  }
}
