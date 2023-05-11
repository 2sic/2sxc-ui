import { Note } from '../config';
import { ToolbarSettings } from '../config/toolbar-settings';
import { ToolbarInitConfig } from '../initialize/toolbar-init-config';

/**
 * @internal
 */
export function getToolbarWhenNoneProvided(errorCode: string): ToolbarInitConfig {
  const toolbar = [ToolbarSettings.getForEmptyAsRule()];

  // we have an error code, so we should add the insights button
  if (errorCode)
    toolbar.push(`insights&color=red&pos=10&note=${Note.toJson64String({
      note: '<strong>Server Insights Logs</strong> can help <br> you debug server errors.',
      allowHtml: true,
    } as Note)}`);

  return {
    toolbar,
  } as ToolbarInitConfig;
}
