import { ButtonConfig} from './button/button-config';

export class ButtonGroupConfig {
  buttons: ButtonConfig[] = []; // array of buttons
  defaults: any = []; // v1

  [propName: string]: any;

  constructor(buttons: ButtonConfig[]) {
    // adds these to the items
    this.buttons = buttons;
  }

  static fromNameAndParams(name: string, params?: any[]): ButtonGroupConfig {
    const groupConfig = new ButtonGroupConfig([]);
    // builds buttons from name and params, then adds
    return groupConfig;
  }
}
