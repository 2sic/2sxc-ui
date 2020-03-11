import { ButtonConfig } from './config/button/button-config';
import ToolbarSettings = Toolbarsettings.ToolbarSettings;
import { ToolbarConfigTemplate } from './toolbar/toolbar-config-template';
import * as Toolbarsettings from './settings/toolbar-settings';

export type ToolbarVariationsBeforeInitializing = ToolbarVariationsForInitializing;

export interface ToolbarVariationsForInitializing extends ToolbarConfigTemplate {
    action?: string;
    // groups?: ButtonGroup[];
    buttons: ButtonConfig[];
}

export interface ToolbarInitConfig {
  toolbar: ToolbarVariationsBeforeInitializing;
  settings: ToolbarSettings;
}
