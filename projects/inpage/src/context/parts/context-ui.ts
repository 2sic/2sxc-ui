import { AttrJsonEditContext } from "../html-attribute";

/**
 * ensure that the UI will load the correct assets to enable editing
 * @internal
 */
export interface ContextOfUi {
  autoToolbar?: boolean; // toolbar auto-show

  // constructor(editCtx: AttrJsonEditContext) {
  //   if (editCtx.Ui) {
  //     this.autoToolbar = editCtx.Ui.AutoToolbar; // toolbar auto-show
  //   }
  // }
}

export function createContextOfUi(editCtx: AttrJsonEditContext): ContextOfUi {
  return {
    autoToolbar: editCtx.Ui?.AutoToolbar, // toolbar auto-show
  } satisfies ContextOfUi; // new ContextOfUi(editCtx);
}