import { DictionaryValue } from '../../plumbing/TypeTbD';
import { ButtonConfig } from './button-config';

export class ButtonGroupConfig {
  buttons: ButtonConfig[] = []; // array of buttons
  defaults: DictionaryValue = {}; // a.ny = []; // v1

//   [propName: string]: a.ny;

  constructor(buttons: ButtonConfig[]) {
    // adds these to the items
    this.buttons = buttons;
  }

//   static fromNameAndParams(name: string, params?: a.ny[]): ButtonGroupConfig {
//     const groupConfig = new ButtonGroupConfig([]);
//     // builds buttons from name and params, then adds
//     return groupConfig;
//   }
}
