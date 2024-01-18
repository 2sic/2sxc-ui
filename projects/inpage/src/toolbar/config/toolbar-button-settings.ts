import { TypeValue } from '../../core';
import { Note } from './Note';

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

  /** WIP 15.04 */
  note?: Note;

  [key: string]: TypeValue | Note;
}
