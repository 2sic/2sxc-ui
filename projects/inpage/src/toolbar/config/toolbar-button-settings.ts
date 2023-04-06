import { TypeValue } from '../../core';

/**
 * @internal
 */
export type TypeNoteMode = 'info' | 'warning' | 'help' | 'link' | undefined;

/**
 * @internal
 */
export interface Note {
  /** The note itself, as text. ATM no HTML support. */
  note?: string;
  /** The type is mainly for the icon ATM. */
  type?: TypeNoteMode;
  /** The link - not yet used */
  link?: string;
  /** background color */
  background?: string;
  /** allowHtml - ATM not used */
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
