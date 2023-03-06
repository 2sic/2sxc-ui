import { TypeValue } from '../../core';

/**
 * @internal
 */
export type TypeNoteMode = 'info' | 'warning' | 'help' | 'link' | undefined;

/**
 * @internal
 */
export interface Note {
  type?: TypeNoteMode;
  note?: string;
  link?: string;
  allowHtml?: boolean;
}

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
