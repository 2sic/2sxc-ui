import { ModifierBase, ModifierDnnModule, QeSelectors, QuickE, Selection } from '.';
import { $jq } from '../interfaces/sxc-controller-in-page';
import { HasLog, Insights } from '../logging';
import { ContextForLists } from './context-for-lists';
import { ModifierContentBlock } from './modifier-content-block';


/**
 * add a clipboard to the quick edit
 */
class QuickEClipboardSingleton extends HasLog {
    /**
     * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
     */
    clipboard = new Selection();

    mods: {[key: string]: ModifierBase } = {};
    modDnn: ModifierDnnModule;
    modCb: ModifierContentBlock;

    constructor() {
        super('Q-E.Clpbrd');
        Insights.add('Q-E', 'clipboard', this.log);
        this.mods.cb = this.modCb = new ModifierContentBlock();
        this.mods.mod = this.modDnn = new ModifierDnnModule();

        // initialize once the DOM is ready
        $jq(() => this.initializeSecondaryButtons());
    }

    /**
     * bind clipboard actions to DOM buttons
     */
    initializeSecondaryButtons() {
        const cl = this.log.call('initializeSecondaryButtons');
        const qem = this;
        $jq('a', QuickE.selected).on('click', function() {
            const action: string = $jq(this).data('action');
            switch (action) {
                case 'delete': return qem.mods[qem.clipboard.type].delete(qem.clipboard);
                case 'sendToPane': return qem.modDnn.showSendToPane();
                default: throw new Error(`unexpected action: ${action}`);
            }
        });
        cl.done();
    }


    /**
     * perform copy and paste commands - needs the clipboard
     * @param cbAction
     * @param list
     * @param index
     * @param type
     */
    do(cbAction: string, list: JQuery, index: number, type: string): void {
        const cl = this.log.call('do', `${cbAction}, ..., ${index}`);
        const newClip = this.createSpecs(type, list, index);

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

                if (isNaN(from) || isNaN(to))  return this.clearUi(); // skip, nothing real

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

        const cb = $jq(this.clipboard.item);
        cb.addClass(QeSelectors.selected);
        if (cb.prev().is('iframe'))
            cb.prev().addClass(QeSelectors.selected);
        this.setSecondaryActionsState(true);
        QuickE.selected.toggleOverlay(cb);
        cl.done();
    }

    /** Clear the UI so nothing is selected any more */
    private clearUi(): void {
        const cl = this.log.call('clearUi');
        this.removeSelectionMarker();
        this.clipboard = null;
        this.setSecondaryActionsState(false);
        QuickE.selected.toggleOverlay(false);
        cl.done();
    }


    private removeSelectionMarker() {
        $jq(`.${QeSelectors.selected}`).removeClass(QeSelectors.selected);
    }

    private setSecondaryActionsState(state: boolean): void {
        const cl = this.log.call('setSecondaryActionsState');
        let btns = $jq('a.sc-content-block-menu-btn');
        btns = btns.filter('.icon-sxc-paste');
        btns.toggleClass('sc-unavailable', !state);
        cl.done();
    }


    private createSpecs(type: string, list: JQuery, index: number): Selection {
        const cl = this.log.call('createSpecs', `${type}, ..., ${index}`);
        const listItems = list.find(QeSelectors.blocks[type].selector);
        // when paste module below the last module in pane
        // index is 1 larger than the length, then select last
        const currentItem: HTMLElement = (index >= listItems.length)
            ? listItems[listItems.length - 1]
            : listItems[index];

        const editContext = ContextForLists.getFromDom(list) || {
            parent: 'dnn',
            field: list.id,
            parentGuid: null as string,
        };
        return cl.return({
            parent: editContext.parent,
            parentGuid: editContext.parentGuid,
            field: editContext.field,
            list: list,
            item: currentItem,
            index: index,
            type: type,
        } as Selection);
    }

}

export const QuickEClipboard = new QuickEClipboardSingleton();
