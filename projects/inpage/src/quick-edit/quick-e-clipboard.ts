import { QeModule, QeSelectors, QuickE, Specs } from '.';
import { SxcEdit } from '../interfaces/sxc-instance-editable';
import { HasLog, Insights } from '../logging';
import { CmdsStrategyFactory } from './cmds-strategy-factory';
import { ContextForLists } from './context-for-lists';


const cmdsStrategyFactory = new CmdsStrategyFactory();

/**
 * add a clipboard to the quick edit
 */
class QuickEClipboardSingleton extends HasLog {
    /**
     * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
     */
    clipboard = new Specs();

    constructor() {
        super('Q-E.Clpbrd');
        Insights.add('Q-E', 'clipboard', this.log);
        // initialize once the DOM is ready
        $(() => this.initialize());
    }

    /**
     * bind clipboard actions to DOM buttons
     */
    initialize() {
        const cl = this.log.call('initialize');
        $('a', QuickE.selected).click(function() {
            const action: string = $(this).data('action');
            switch (action) {
                case 'delete': return cmdsStrategyFactory.delete(this.clipboard);
                case 'sendToPane': return QeModule.sendToPane();
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

                if (isNaN(from) || isNaN(to) || from === to) // || from + 1 === to) // this moves it to the same spot, so ignore
                    return this.clearUi(); // don't do a.nything

                // cb-numbering is a bit different, because the selector is at the bottom
                // only there we should also skip on +1;
                if (newClip.type === QeSelectors.blocks.cb.id && from + 1 === to)
                    return this.clearUi(); // don't do a.nything

                if (type === QeSelectors.blocks.cb.id) {
                    const sxc = SxcEdit.get(list);
                    sxc.manage._getCbManipulator().move(newClip.parent as number, newClip.field, from, to);
                } else
                    QeModule.move(this.clipboard, newClip, from, to); // sometimes missing oldClip.item

                this.clearUi();
                break;
            default:
        }
        return cl.return(null);
    }


    private mark(newData: Specs): void {
        const cl = this.log.call('mark');
        cl.addData('specs', newData);

        if (newData) {
            // if it was already selected with the same thing, then release it
            if (this.clipboard && this.clipboard.item === newData.item)
                return cl.return(this.clearUi());
            this.clipboard = newData;
        }

        this.removeSelectionMarker(); // clear previous markings

        // sometimes missing data.item
        if (!this.clipboard.item) return cl.done();

        const cb = $(this.clipboard.item);
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
        $(`.${QeSelectors.selected}`).removeClass(QeSelectors.selected);
    }

    private setSecondaryActionsState(state: boolean): void {
        const cl = this.log.call('setSecondaryActionsState');
        let btns = $('a.sc-content-block-menu-btn');
        btns = btns.filter('.icon-sxc-paste');
        btns.toggleClass('sc-unavailable', !state);
        cl.done();
    }


    private createSpecs(type: string, list: JQuery, index: number): Specs {
        const cl = this.log.call('createSpecs', `${type}, ..., ${index}`);
        const listItems = list.find(QeSelectors.blocks[type].selector);
        // when paste module below the last module in pane
        // index is 1 larger than the length, then select last
        const currentItem: HTMLElement = (index >= listItems.length)
            ? listItems[listItems.length - 1]
            : listItems[index];

        const editContext = ContextForLists.getFromDom(list) || { parent: 'dnn', field: list.id };
        return cl.return({
            parent: editContext.parent,
            field: editContext.field,
            list: list,
            item: currentItem,
            index: index,
            type: type,
        });
    }

}

export const QuickEClipboard = new QuickEClipboardSingleton();
