import { ContextBundleContent, ContextComplete } from '.';
import { Button } from '../../toolbar/config/button';
import { Toolbar } from '../../toolbar/config/toolbar';
import { AttrJsonEditContext } from '../html-attribute';

export class ContextBundleToolbar extends ContextBundleContent {
    toolbar: Toolbar;

    constructor(editCtx: AttrJsonEditContext) {
        super(editCtx);
        // note that the toolbar will not be filled here, as it will be filled somewhere else
    }

    forButton(button: Button): ContextComplete {
        // the ContextBundleButton is the same as toolbar, just with .button
        const clone = {...this} as unknown as ContextComplete;
        clone.button = button;
        return clone;
    }
}
