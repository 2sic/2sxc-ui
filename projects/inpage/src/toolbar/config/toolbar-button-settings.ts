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

  links?: NoteLink[];

  /** background color */
  background?: string;

  /** 
   * allowHtml - ATM not used - could change
   * @internal
   */
  allowHtml?: boolean;

  /** 
   * ATM not used - could change
   * @internal
   */
  interactive?: boolean;

  public static toJson64String(note: Note): string {
    return `${prefixJson64}${window.btoa(JSON.stringify(note))}`;
  }
}

interface NoteLink {
  url: string;
  label?: string;
  primary?: boolean;
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
