import { ToolbarSettings } from '../config/toolbar-settings';
import { ToolbarInitConfig } from '../initialize/toolbar-init-config';

/**
 * @internal
 */
export function getToolbarWhenNoneProvided(): ToolbarInitConfig {
  const toolbar = [ToolbarSettings.getForEmptyAsRule()];

  return {
    toolbar,
  } as ToolbarInitConfig;
}
