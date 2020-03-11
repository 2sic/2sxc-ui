import { ButtonConfig } from '../../toolbar/config/button/button-config';
import { ToolbarConfig } from '../../toolbar/toolbar/toolbar-config';
import { ContextBundleButton } from './context-bundle-button';
import { ContextBundleItem } from './context-bundle-item';

export class ContextBundleToolbar extends ContextBundleItem {
  toolbar: ToolbarConfig;

  forButton(button: ButtonConfig): ContextBundleButton {
      const clone = Object.assign({}, this) as ContextBundleButton;
      clone.button = button;
      return clone;
  }
}
