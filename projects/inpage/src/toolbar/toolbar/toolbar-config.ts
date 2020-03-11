import { ButtonGroupConfig } from '../config/button-group-config';
import { ToolbarSettings } from '../settings/toolbar-settings';

/** contains a toolbar config + settings + mny groups */
export class ToolbarConfig {
  groups: ButtonGroupConfig[] = [];
  settings: ToolbarSettings; // like floating of toolbar, etc.
  params: any; // like EntityId, Content - Type - Name
  // todo: old props, remove
  name: string = 'toolbar'; // name, no real use
  debug?: boolean = false; // show more debug info
  defaults: any; // the button defaults like icon, etc.

  [propName: string]: any;
}
