import { TypeValue } from '../../core';

/**
 * @internal
 */
export interface ToolbarButtonSettings {
  icon?: string;
  class?: string;
  color?: string;
  show?: boolean;
  code?: string;
  title?: string;
  [key: string]: TypeValue;
}
