import { prefixJson64 } from '../../constants/rules';
import { TypeValue } from '../../core';

/**
 * @internal
 */
export type TypeNoteMode = 'info' | 'warning' | 'error' | 'help' | 'link' | undefined;

/**
 * @internal
 */
export class Note {
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

  public static toJson64String(note: Note): string {
    return `${prefixJson64}${window.btoa(JSON.stringify(note))}`;
  }
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
