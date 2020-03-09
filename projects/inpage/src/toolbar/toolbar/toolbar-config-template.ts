import { ButtonGroup } from './button-group';
import { ToolbarSettings } from './toolbar-settings';

export class ToolbarConfigTemplate {
  groups: ButtonGroup[] = [];
  defaults?: HashTable<string> = {};
  params?: HashTable<string> = {};
  settings?: Partial<ToolbarSettings> = {};
}
