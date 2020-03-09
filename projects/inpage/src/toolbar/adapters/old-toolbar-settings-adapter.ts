import { ToolbarSettings } from '../toolbar/toolbar-settings';

/**
 * removes autoAddMore and classes if are null or empty, to keep same behaviour like in v1
 * @param toolbarSettings
 */
export function oldToolbarSettingsAddapter(toolbarSettings: ToolbarSettings): Partial<ToolbarSettings> {
  const partialToolbaSettings: Partial<ToolbarSettings> = Object.assign({}, toolbarSettings);
  if (!partialToolbaSettings.autoAddMore) {
    delete partialToolbaSettings.autoAddMore;
  }
  if (!partialToolbaSettings.classes) {
    delete partialToolbaSettings.classes;
  }
  return partialToolbaSettings;
}
