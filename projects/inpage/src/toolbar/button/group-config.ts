import { ButtonConfig} from './button-config';

export class GroupConfig {
  buttons: ButtonConfig[] = []; // array of buttons
  defaults: any = []; // v1

  [propName: string]: any;

  constructor(buttons: ButtonConfig[]) {
    // adds these to the items
    this.buttons = buttons;
  }

  static fromNameAndParams(name: string, params?: any[]): GroupConfig {
    const groupConfig = new GroupConfig([]);
    // builds buttons from name and params, then adds
    return groupConfig;
  }
}
