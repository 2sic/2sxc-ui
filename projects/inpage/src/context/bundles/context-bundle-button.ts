import { Sxc } from '../../../../$2sxc/src/sxc/sxc';
import { ButtonConfiguration } from '../../toolbar/config/button';
import { ToolbarWorkflowManager } from '../../workflow';
import { AttrJsonEditContext } from '../html-attribute';
import { ContextBundleToolbar, createContextBundleToolbar } from './context-bundle-toolbar';
/**
 * @public
 */
export interface ContextComplete extends ContextBundleToolbar {
  /** @internal */
  _isCtxComplete: true;

  /** @internal */
  button?: ButtonConfiguration;

  /** @internal */
  commandWorkflow?: ToolbarWorkflowManager;

  // /** @internal */
  // constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
  //   super(editCtx, sxc);
  //   this.sxc = sxc;
  //   // note that the button will not be filled here, as it will be filled somewhere else
  // }

  // /**
  //  * Create copy of context, so it can be modified before use
  //  * @internal
  //  */
  // static contextCopy(htmlElementOrId: HTMLElement | number, cbid?: number): ContextComplete {
  //   const contextOfButton = ContextHelpers.expandContext(htmlElementOrId, cbid);
  //   // set sxc to null because of cyclic reference, so we can serialize it
  //   contextOfButton.sxc = null!;
  //   // make a copy
  //   const copyOfContext = Obj.DeepClone(contextOfButton);
  //   // bring sxc back to context
  //   contextOfButton.sxc = window.$2sxc(htmlElementOrId) as Sxc;
  //   return copyOfContext;
  // }
}

export interface ContextCompleteWithButton extends ContextComplete {
  button: ButtonConfiguration;
}

export function createContextComplete(editCtx: AttrJsonEditContext, sxc: Sxc): ContextComplete {
  return {
    _isCtxComplete: true,
    ...createContextBundleToolbar(editCtx, sxc),
  } satisfies ContextComplete;
}

/** @internal */
export function cloneForButton(original: ContextComplete, button: ButtonConfiguration): ContextCompleteWithButton {
  // the ContextBundleButton is the same as toolbar, just with .button
  return { ...original, button };
}