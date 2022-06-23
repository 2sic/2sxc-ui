import { ContextBundleContent, ContextComplete } from '.';
import { Sxc } from '../../../../$2sxc/src';
import { Button } from '../../toolbar/config/button';
import { Toolbar } from '../../toolbar/config/toolbar';
import { AttrJsonEditContext } from '../html-attribute';
/**
 * @internal
 */
export declare class ContextBundleToolbar extends ContextBundleContent {
    toolbar: Toolbar;
    constructor(editCtx: AttrJsonEditContext, sxc: Sxc);
    forButton(button: Button): ContextComplete;
}
