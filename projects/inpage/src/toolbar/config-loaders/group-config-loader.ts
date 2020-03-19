import { ToolbarWip } from '.';
import { CommandParams, Commands } from '../../commands';
import { HasLog, Log } from '../../logging';
import { TypeUnsafe } from '../../plumbing';
import { Button, ButtonCommand, ButtonGroup, Toolbar, ToolbarSettings } from '../config';
import { InPageButtonJson } from './in-page-button';
import { ToolbarConfigLoader } from './toolbar-config-loader';

export class ButtonGroupConfigLoader extends HasLog {

    constructor(public toolbar: ToolbarConfigLoader) {
        super('Tlb.GrpCnf', toolbar.log);
    }

    /**
     * this will traverse a groups-tree and expand each group
     * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
     * @param fullToolbar
     */
    expandButtonGroups(fullToolbar: Toolbar, parentLog: Log): Toolbar {
        const log = new Log('Tlb.ExpGrp', parentLog, 'start');

        // by now we should have a structure, let's check/fix the buttons
        log.add(`will expand groups - found ${fullToolbar.groups.length} items`);
        for (let g = 0; g < fullToolbar.groups.length; g++) {
            // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
            expandButtonList(this, fullToolbar.groups[g], fullToolbar.settings);

            // fix all the buttons
            const btns = (fullToolbar.groups[g]).buttons;

            const buttonConfigs: Button[] = [];

            if (Array.isArray(btns)) {
                log.add(`will process ${btns.length} buttons`);
                for (let b = 0; b < btns.length; b++) {
                    const btn = btns[b];
                    const btnCommand = (btn as unknown as { command: CommandParams }).command;

                    if (!(Commands.get(btnCommand.action))) {
                        log.add(`couldn't find action ${btnCommand.action} - show warning`);
                        console.warn('warning: toolbar-button with unknown action-name:', btnCommand.action);
                    }

                    const name = btnCommand.action;
                    const contentType = btnCommand.contentType;

                    // if the button belongs to a content-item, move the specs up to the item into the settings-object
                    this.toolbar.command.normalizeCommandJson(btnCommand);

                    // parameters adapter from v1 to v2
                    let params = this.toolbar.command.removeActionProperty(btnCommand);
                    params = {...params, ...fullToolbar.params};
                    // O.bject.assign(params, fullToolbarConfig.params);

                    // Toolbar API v2
                    const newButtonAction = new ButtonCommand(name, contentType, params);
                    let newButtonConfig = new Button(newButtonAction);
                    newButtonConfig.name = name;

                    // settings adapter from v1 to v2
                    const settings = Button.normalize(btn);
                    newButtonConfig = {...newButtonConfig, ...settings};
                    // O.bject.assign(newButtonConfig, settings);

                    // ensure all buttons have either own settings, or the fallback
                    this.toolbar.button.addDefaultBtnSettings(newButtonConfig, fullToolbar.groups[g], fullToolbar, Commands);

                    buttonConfigs.push(newButtonConfig);
                }
            } else
                log.add("no button array found, won't do a.nything");

            // Toolbar API v2 overwrite V1
            fullToolbar.groups[g].buttons = buttonConfigs;
        }
        return fullToolbar;
    }

}


/**
 * take a list of buttons (objects OR strings)
 * and convert to proper array of buttons with actions
 * on the in is a object with buttons, which are either:
 * - a string like "edit" or multi-value "layout,more"
 * - an array of such strings incl. optional complex objects which are
 * @param root
 * @param settings
 */
function expandButtonList(parent: ButtonGroupConfigLoader, root: ButtonGroup, settings: ToolbarSettings): void {
  const log = new Log('Tlb.ExpBts', parent.log, 'start');

  let btns: Array<Button | string> = [];

  // convert compact buttons (with multi-verb action objects) into own button-objects
  // important because an older syntax allowed {action: "new,edit", entityId: 17}
  if (Array.isArray(root.buttons)) {
    log.add(`detected array of btns (${root.buttons.length}), will ensure it's an object`);
    for (let b = 0; b < root.buttons.length; b++) {
      const btn = root.buttons[b];
      const actionString: string = btn.action as TypeUnsafe as string;
      if (typeof actionString === 'string' && actionString.indexOf(',') > -1) {
        log.add(`button def "${btn} is string of ma.ny names, will expand into array with action-properties"`);
        const acts = actionString.split(',');
        for (let a = 0; a < acts.length; a++) {
            // TODO: must fix, the action isn't correctly expanded
            (btn as any).action = acts[a];
            btns.push(btn);
        }
      } else {
        btns.push(btn);
      }
    }

  } else if (typeof root.buttons === 'string') {
    log.add(`detected that it is a string "${root.buttons}", will split by "," and ...`);
    btns = (root.buttons as string).split(',');

    // 2020-03-11 2dm removed, as it seems unused completely
    // sharedProperties = O.bject.assign({}, root); // inherit all fields used in the button
    // delete sharedProperties.buttons; // this one's not needed
    // delete sharedProperties.name; // this one's not needed
    // delete sharedProperties.action; //

  } else {
    log.add('no special case detected, will use the buttons-object as is');
    btns = root.buttons;
  }
  log.add(`after check, found ${btns.length} buttons`);

  // optionally add a more-button in each group
  if (settings.autoAddMore) {
    if ((settings.autoAddMore === 'end')
      || (settings.autoAddMore.toString() === 'right') // fallback for older v1 setting
      ) {
      log.add('will add a more "..." button to end');
      btns.push('more');
    } else {
      log.add('will add a more "..." button to start');
      btns.unshift('more');
    }
  } else {
    log.add('will not add more "..." button');
  }

  // add each button - check if it's already an object or just the string
//   const finalButtons: Button[] = btns.map(this.toolbar.button.normalize);

//   for (let v = 0; v < btns.length; v++)
//     finalButtons[v] = this.toolbar.button.normalize(btns[v]/* sharedProperties, */);

  root.buttons = btns.map((x) => parent.toolbar.button.normalize(x as any)) as any; // ensure the internal def is also an array now
  log.add('done');
}
