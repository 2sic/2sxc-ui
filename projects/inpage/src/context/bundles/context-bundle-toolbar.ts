import { ContextBundleContent, ContextComplete } from '.';
import { Sxc } from '../../../../$2sxc/src/sxc/sxc';
import { Button } from '../../toolbar/config/button';
import { Toolbar } from '../../toolbar/config/toolbar';
import { AttrJsonEditContext } from '../html-attribute';

/**
 * @public
 */
export class ContextBundleToolbar extends ContextBundleContent {
  /** @internal */
  toolbar: Toolbar;

  /** @internal */
  constructor(editCtx: AttrJsonEditContext, sxc: Sxc) {
    super(editCtx, sxc);
    // note that the toolbar will not be filled here, as it will be filled somewhere else
  }

  /** @internal */
  forButton(button: Button): ContextComplete {
    // the ContextBundleButton is the same as toolbar, just with .button
    const clone = {...this} as unknown as ContextComplete;
    clone.button = button;
    return clone;
  }
}
