import { ToolbarSettings } from '../config/toolbar-settings';
import { ToolbarTemplateButtonGroup } from './toolbar-templaten-button-group';

/**
 * This describes a template configuration of a toolbar
 * It's meant to provide type-save templates for what buttons are used where
 */
export class ToolbarTemplateToolbar {
  groups: ToolbarTemplateButtonGroup[] = [];
  defaults?: HashTable<string> = {};
  params?: HashTable<string> = {};
  settings?: Partial<ToolbarSettings> = {};
  debug?: boolean;
}
