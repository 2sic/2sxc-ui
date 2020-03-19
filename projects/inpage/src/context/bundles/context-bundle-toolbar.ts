import { ContextBundleButton, ContextBundleItem } from '.';
import { Button } from '../../toolbar/config/button';
import { Toolbar } from '../../toolbar/config/toolbar';

export class ContextBundleToolbar extends ContextBundleItem {
  toolbar: Toolbar;

  forButton(button: Button): ContextBundleButton {
      const clone = Object.assign({}, this) as ContextBundleButton;
      clone.button = button;
      return clone;
  }
}
