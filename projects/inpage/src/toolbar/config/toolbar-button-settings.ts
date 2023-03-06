import { TypeValue } from '../../core';

/**
 * @internal
 */
export type TypeNoteMode = 'info' | 'warning' | 'help' | 'link' | undefined;

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
  note?: string;

  /** WIP 15.04 */
  noteType?: TypeNoteMode;


  [key: string]: TypeValue;
}
