import { ContextBundleButton, ContextBundleItem } from '.';
import { Button } from '../../toolbar/config/button';
import { Toolbar } from '../../toolbar/config/toolbar';

export class ContextBundleToolbar extends ContextBundleItem {
  toolbar: Toolbar;

  forButton(button: Button): ContextBundleButton {
      // the ContextBundleButton is the same as toolbar, just with .button
      const clone = {...this} as unknown as ContextBundleButton;
      clone.button = button;
      return clone;
  }
}
