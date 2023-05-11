import { AttrJsonEditContext } from "../html-attribute";

/**
 * ensure that the UI will load the correct assets to enable editing
 * @internal
 */
export class ContextOfUi {
  autoToolbar?: boolean; // toolbar auto-show

  constructor(editCtx: AttrJsonEditContext) {
    if (editCtx.Ui) {
      this.autoToolbar = editCtx.Ui.AutoToolbar; // toolbar auto-show
    }
  }
}
