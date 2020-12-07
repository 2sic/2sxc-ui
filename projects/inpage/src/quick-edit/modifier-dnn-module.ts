import { ModifierBase, ModifierDnnModuleInternal, QeSelectors, QuickE, QuickEClipboard, Selection } from '.';
import { $jq } from '../interfaces/sxc-controller-in-page';

export class ModifierDnnModule extends ModifierBase {

    private modInternal: ModifierDnnModuleInternal;

    constructor() {
        super('QE.DnnMod');
        this.modInternal = new ModifierDnnModuleInternal(this);
    }

    delete(clip: Selection): Promise<void> {
        if (!confirm('are you sure?')) return;
        const modId = this.modInternal.getModuleId(clip.item.className);
        this.modInternal.delete(modId);
    }

    // todo: unsure if this is a good place for this bit of code...
    move(oldClip: Selection, newClip: Selection /*, from: number, to: number*/): void {
        const from = oldClip.index;
        const to = newClip.index;
        const modId = this.modInternal.getModuleId(oldClip.item.className);
        const pane: string = this.modInternal.getPaneName(newClip.list);
        this.modInternal.move(modId, pane, to);
    }

    isRealMove(oldClip: Selection, newClip: Selection): boolean {
        const oldPane = this.modInternal.getPaneName(oldClip.list);
        const newPane = this.modInternal.getPaneName(newClip.list);
        return oldPane !== newPane || oldClip.index !== newClip.index;
    }


    showSendToPane(): void {
        const pane = QuickE.main.activeModule.closest(QeSelectors.blocks.mod.listSelector);

        // show the pane-options
        const pl = QuickE.selected.find('#paneList');
        if (!pl.is(':empty')) pl.empty();
        pl.append(this.modInternal.getMoveButtons(this.modInternal.getPaneName(pane)));
    }

    static onModuleButtonClick() {
        const type = $jq(this).data('type');
        const dnnMod = QuickE.main.activeModule;
        const pane = dnnMod.closest(QeSelectors.blocks.mod.listSelector);
        let index = 0;

        if (dnnMod.hasClass('DnnModule'))
            index = pane.find('.DnnModule').index(dnnMod[0]) + 1;

        const cbAction = $jq(this).data('action');
        if (cbAction)
            return QuickEClipboard.do(cbAction, pane, index, QeSelectors.blocks.mod.id); // copy/paste
        const modManage = QuickEClipboard.modDnn.modInternal;
        return modManage.create(modManage.getPaneName(pane), index, type);
    }
}
