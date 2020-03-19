import { Button } from '.';
import { DictionaryValue, TypeTbD } from '../../plumbing';

export class ButtonGroup {
  defaults: DictionaryValue = {};

  constructor(public buttons: Button[]) {
    // adds these to the items
    this.buttons = buttons || [];
  }

  /** Detect if this is a ButtonGroup */
  static is(thing: TypeTbD): thing is ButtonGroup {
    return (thing as ButtonGroup).buttons !== undefined;
  }

  /** Detect if this is a ButtonGroup */
  static isArray(thing: TypeTbD[]): thing is ButtonGroup[] {
    return thing.length && (thing[0] as ButtonGroup).buttons !== undefined;
  }
}
