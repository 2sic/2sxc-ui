import { prefixJson64 } from '../../constants/rules';
import { NoteLink } from './NoteLink';

/**
 * @internal
 */
export type TypeNoteMode = 'info' | 'warning' | 'error' | 'help' | 'link' | undefined;

/**
 * @internal
 */

export class Note {
  constructor(params: Partial<Note> = undefined) {
    if (params) Object.assign(this, params);    
  }
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

  /**
   * delay in ms
   * @internal
   */
  delay?: number;

  /**
   * linger in ms
   * @internal
   */
  linger?: number;

  public static toJson64String(note: Note): string {
    return `${prefixJson64}${window.btoa(JSON.stringify(note))}`;
  }
}
