import { ModifierBase, ModifierDnnModule, QeSelectors, QuickE, Selection } from '.';
import { C } from '../constants';
import { HasLog, Insights, NoJQ } from '../logging';
import { ContextForLists } from './context-for-lists';
import { ModifierContentBlock } from './modifier-content-block';

/**
 * add a clipboard to the quick edit
 * @internal
 */
export class QuickEClipboard extends HasLog {

    /** Singleton */
    public static singleton(): QuickEClipboard {
        return this._singleton ?? (this._singleton = new QuickEClipboard());
    }
    private static _singleton: QuickEClipboard;

    /**
     * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
     */
    clipboard = new Selection();

    mods: { [key: string]: ModifierBase } = {};
    modDnn: ModifierDnnModule;
    modCb: ModifierContentBlock;

    private constructor() {
        super('Q-E.Clpbrd');
        Insights.add('Q-E', 'clipboard', this.log);
        this.mods.cb = this.modCb = new ModifierContentBlock();
        this.mods.mod = this.modDnn = new ModifierDnnModule();

        // initialize once the DOM is ready
        NoJQ.ready(() => this.initializeSecondaryButtons());
    }

    /**
     * bind clipboard actions to DOM buttons
     */
    initializeSecondaryButtons() {
        const cl = this.log.call('initializeSecondaryButtons');
        const qem = this;
        QuickE.singleton().selected.querySelectorAll<HTMLElement>('a').forEach((e) => {
            e.addEventListener('click', function () {
                const action = this.getAttribute('data-action');
                switch (action) {
                    case 'delete': return qem.mods[qem.clipboard.type].delete(qem.clipboard);
                    case 'sendToPane': return qem.modDnn.showSendToPane();
                    default: throw new Error(`unexpected action: ${action}`);
                }
            });
        });
        cl.done();
    }


    /**
     * perform copy and paste commands - needs the clipboard
     * @param cbAction
     * @param list
     * @param domIndex
     * @param type
     */
    do(cbAction: string, list: HTMLElement, domIndex: number, type: string): void {
        const cl = this.log.call('do', `${cbAction}, ..., ${domIndex}`);
        const newClip = this.createSpecs(type, list, domIndex);

        // action!
        switch (cbAction) {
            case 'select':
                this.mark(newClip);
                break;

            case 'paste':
                const from = this.clipboard.index;
                const to = newClip.index;
                // check that we only move block-to-block or module to module
                if (this.clipboard.type !== newClip.type)
                    return alert("can't move module-to-block; move only works from module-to-module or block-to-block");

                if (isNaN(from) || isNaN(to)) return this.clearUi(); // skip, nothing real

                const operator = newClip.type === QeSelectors.blocks.cb.id ? this.modCb : this.modDnn;

                if (!operator.isRealMove(this.clipboard, newClip)) return this.clearUi(); // skip, no change
                operator.move(this.clipboard, newClip);

                this.clearUi();
                break;
            default:
        }
        return cl.return(null);
    }


    private mark(newData: Selection): void {
        const cl = this.log.call('mark');
        cl.data('specs', newData);

        if (newData) {
            // if it was already selected with the same thing, then release it
            if (this.clipboard && this.clipboard.item === newData.item)
                return cl.return(this.clearUi());
            this.clipboard = newData;
        }

        this.removeSelectionMarker(); // clear previous markings

        // sometimes missing data.item
        if (!this.clipboard.item) return cl.done();

        const selectedItem = this.clipboard.item;
        selectedItem.classList.add(QeSelectors.selected);
        if (selectedItem.previousElementSibling?.matches('iframe'))
            selectedItem.previousElementSibling.classList.add(QeSelectors.selected);
        this.setSecondaryActionsState(true);
        const quickE = QuickE.singleton();
        const btnConfig = this.clipboard?.type === QeSelectors.blocks.cb.id
            ? quickE.config.innerBlocks.buttons
            : quickE.config.modules.buttons;
        quickE.selected.toggleOverlay(selectedItem, btnConfig);
        cl.done();
    }

    /** Clear the UI so nothing is selected any more */
    private clearUi(): void {
        const cl = this.log.call('clearUi');
        this.removeSelectionMarker();
        this.clipboard = null;
        this.setSecondaryActionsState(false);
        QuickE.singleton().selected.toggleOverlay(false);
        cl.done();
    }


    private removeSelectionMarker() {
        document.querySelectorAll<HTMLElement>(`.${QeSelectors.selected}`).forEach((s) => s.classList.remove(QeSelectors.selected));
    }

    private setSecondaryActionsState(state: boolean): void {
        const cl = this.log.call('setSecondaryActionsState');
        let btns = Array.from(document.querySelectorAll<HTMLElement>('a.sc-content-block-menu-btn'));
        btns = btns.filter((btn) => btn.classList.contains('icon-sxc-paste'));
        btns.forEach((btn) => btn.classList.toggle(C.ClsNames.UnAvailable, !state));
        cl.done();
    }


    private createSpecs(type: string, list: HTMLElement, domIndex: number): Selection {
        const cl = this.log.call('createSpecs', `${type}, ..., ${domIndex}`);
        const listItems = list.querySelectorAll<HTMLElement>(QeSelectors.blocks[type].selector);
        // when paste module below the last module in pane
        // index is 1 larger than the length, then select last
        const currentItem: HTMLElement = (domIndex >= listItems.length)
            ? listItems[listItems.length - 1]
            : listItems[domIndex];

        // get info what item/block is being edited
        const contextInfo = ContextForLists.getFromDom(list) || {
            parent: 'dnn',
            field: list.id,
            parentGuid: null as string,
        };
        return cl.return({
            parent: contextInfo.parent,
            parentGuid: contextInfo.parentGuid,
            field: contextInfo.field,
            list: list,
            item: currentItem,
            index: domIndex,
            type: type,
        } as Selection);
    }

}
