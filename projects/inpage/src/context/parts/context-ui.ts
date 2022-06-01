import { AttrJsonEditContext } from '../html-attribute';

/**
 * ensure that the UI will load the correct assets to enable editing
 * @internal
 */
export class ContextOfUi {
    autoToolbar?: boolean; // toolbar auto-show
    form: string; // decide which dialog opens, eg ng10

    constructor(editCtx: AttrJsonEditContext) {
        if (editCtx.Ui) {
            this.autoToolbar = editCtx.Ui.AutoToolbar; // toolbar auto-show
            if (editCtx.Ui.Form) this.form = editCtx.Ui.Form; // decide which dialog opens, eg ng8
        }
    }
}
