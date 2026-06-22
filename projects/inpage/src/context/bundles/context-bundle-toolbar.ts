import { Sxc } from '../../../../$2sxc/src/sxc/sxc';
import { Toolbar } from '../../toolbar/config/toolbar';
import { AttrJsonEditContext } from '../html-attribute';
import { ContextBundleContent, createContextBundleContent } from './context-bundle-content';

/**
 * @public
 */
export interface ContextBundleToolbar extends ContextBundleContent {
    /** @internal */
    toolbar?: Toolbar;

    // /** @internal */
    // constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
    //   super(editCtx, sxc);
    //   // note that the toolbar will not be filled here, as it will be filled somewhere else
    // }

    // /** @internal */
    // forButton(button: ButtonConfiguration): ContextComplete {
    //   // the ContextBundleButton is the same as toolbar, just with .button
    //   const clone = {...this} as unknown as ContextComplete;
    //   clone.button = button;
    //   return clone;
    // }
}

export function createContextBundleToolbar(editCtx: AttrJsonEditContext, sxc: Sxc): ContextBundleToolbar {
    return {
        ...createContextBundleContent(editCtx, sxc),
        // note that the toolbar will not be filled here, as it will be filled somewhere else
        // toolbar: ...,
    } satisfies ContextBundleToolbar;
}
