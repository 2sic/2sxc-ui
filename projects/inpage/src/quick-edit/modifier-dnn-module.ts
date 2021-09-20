import { ModifierBase, ModifierDnnModuleInternal, QeSelectors, QuickE, QuickEClipboard, Selection } from '.';
import { NoJQ } from '../interfaces/no-jquery';

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
        // debugger; // there is a bug where pane options are not updated when user clicks send to pane once, until that button is clicked again
        // to reproduce: select module in header pane, click sendToPane. Now select module in content pane and notice panes list is showing panes for previous module
        const pane = QeSelectors.blocks.mod.findClosestList(QuickE.main.activeModule);
        // debugger; // breaks in inner content buttons, like Accordion App. Check if I can hide this button in inner content
        if (!pane) return;

        // show the pane-options
        const pl = QuickE.selected.querySelector<HTMLElement>('#paneList');
        if (!pl.matches(':empty')) NoJQ.empty(pl);
        pl.append(this.modInternal.getMoveButtons(this.modInternal.getPaneName(pane)));
    }

    static onModuleButtonClick() {
        const _this = this as unknown as HTMLElement;
        const type = _this.getAttribute('data-type');
        const dnnMod = QuickE.main.activeModule;
        const pane = QeSelectors.blocks.mod.findClosestList(dnnMod);
        let index = 0;

        if (dnnMod.classList.contains('DnnModule'))
            index = Array.from(pane.querySelectorAll<HTMLElement>('.DnnModule')).indexOf(dnnMod) + 1;

        const cbAction = _this.getAttribute('data-action');
        if (cbAction)
            return QuickEClipboard.do(cbAction, pane, index, QeSelectors.blocks.mod.id); // copy/paste
        const modManage = QuickEClipboard.modDnn.modInternal;
        return modManage.create(modManage.getPaneName(pane), index, type);
    }
}
