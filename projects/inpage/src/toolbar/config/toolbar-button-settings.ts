import { TypeValue } from '../../core';

export interface ToolbarButtonSettings {
  icon?: string,
  class?: string,
  color?: string,
  show?: boolean,
  code?: string,
  title?: string,
  [key: string]: TypeValue,
}