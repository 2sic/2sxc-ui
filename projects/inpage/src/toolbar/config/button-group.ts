import { Button } from '.';
import { DictionaryValue } from '../../plumbing';

export class ButtonGroup {
  buttons: Button[] = []; // array of buttons
  defaults: DictionaryValue = {}; // a.ny = []; // v1

  constructor(buttons: Button[]) {
      // TODO: 2dm - seems unnecessary
    // adds these to the items
    this.buttons = buttons;
  }

}
