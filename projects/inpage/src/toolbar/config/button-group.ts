import { Button } from '.';
import { DictionaryValue } from '../../plumbing';

export class ButtonGroup {
  defaults: DictionaryValue = {};

  constructor(public buttons: Button[]) {
    // adds these to the items
    this.buttons = buttons || [];
  }

}
