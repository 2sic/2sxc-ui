import { ButtonConfigLoader, InPageCommandJson } from '.';
import { CommandConfigLoader } from '.';
import { Commands } from '../../commands/commands';
import { HasLog } from '../../logging/has-log';
import { Log } from '../../logging/log';
import { TypeUnsafe } from '../../plumbing/TypeTbD';
import { buttonConfigUpgrade } from '../adapters/settings-adapter';
import { ButtonCommand } from '../button/button-command';
import { ButtonConfig } from '../config/button-config';
import { ButtonGroupConfig } from '../config/button-group-config';
import { ToolbarSettings } from '../settings/toolbar-settings';
import { ToolbarConfig } from '../toolbar/toolbar-config';
import { ToolbarConfigLoader } from './toolbar-config-loader';

export class ButtonGroupConfigLoader extends HasLog {

    constructor(private toolbar: ToolbarConfigLoader) {
        super('Tlb.GrpCnf', toolbar.log);
    }

    /**
     * this will traverse a groups-tree and expand each group
     * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
     * @param fullToolbarConfig
     */
    expandButtonGroups(fullToolbarConfig: ToolbarConfig, parentLog: Log): ToolbarConfig {
        const log = new Log('Tlb.ExpGrp', parentLog, 'start');

        const btnConfigBuilder = this.toolbar.button;// new ButtonConfigurationBuilder(log);

        // by now we should have a structure, let's check/fix the buttons
        log.add(`will expand groups - found ${fullToolbarConfig.groups.length} items`);
        for (let g = 0; g < fullToolbarConfig.groups.length; g++) {
            // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
            expandButtonList(fullToolbarConfig.groups[g], fullToolbarConfig.settings, log);

            // fix all the buttons
            const btns = fullToolbarConfig.groups[g].buttons;

            const buttonConfigs: ButtonConfig[] = [];

            if (Array.isArray(btns)) {
            log.add(`will process ${btns.length} buttons`);
            for (let b = 0; b < btns.length; b++) {
                const btn = btns[b];
                const btnCommand = (btn as any).command;

                if (!(Commands.get(btnCommand.action))) {
                log.add(`couldn't find action ${btnCommand.action} - show warning`);
                console.warn('warning: toolbar-button with unknown action-name:', btnCommand.action);
                }

                const name = btnCommand.action;
                const contentType = btnCommand.contentType;

                // if the button belongs to a content-item, move the specs up to the item into the settings-object
                this.toolbar.command.normalizeCommandJson(btnCommand);

                // parameters adapter from v1 to v2
                const params = this.toolbar.command.removeActionProperty(btnCommand);
                Object.assign(params, fullToolbarConfig.params);

                // Toolbar API v2
                const newButtonAction = new ButtonCommand(name, contentType, params);
                const newButtonConfig = new ButtonConfig(newButtonAction);
                newButtonConfig.name = name;

                // settings adapter from v1 to v2
                const settings = buttonConfigUpgrade(btn);
                Object.assign(newButtonConfig, settings);

                // ensure all buttons have either own settings, or the fallback
                btnConfigBuilder.addDefaultBtnSettings(newButtonConfig,
                fullToolbarConfig.groups[g], fullToolbarConfig, Commands);

                buttonConfigs.push(newButtonConfig);
            }
            } else log.add("no button array found, won't do a.nything");

            // Toolbar API v2 overwrite V1
            fullToolbarConfig.groups[g].buttons = buttonConfigs;
        }
        return fullToolbarConfig;
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
function expandButtonList(root: ButtonGroupConfig, settings: ToolbarSettings, parentLog: Log): void {
  const log = new Log('Tlb.ExpBts', parentLog, 'start');

  // let root = grp; // the root object which has all params of the command
  let btns: any[] = [];
  // 2020-03-11 2dm removed, as it seems unused completely
//   let sharedProperties: a.ny = null;

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
          btns.push($.extend(true, {}, btn, { action: acts[a] }) as ButtonConfig);
        }
      } else {
        btns.push(btn);
      }
    }

  } else if (typeof root.buttons === 'string') {
    log.add(`detected that it is a string "${root.buttons}", will split by "," and ...`);
    btns = (root.buttons as string).split(',');

    // 2020-03-11 2dm removed, as it seems unused completely
    // sharedProperties = Object.assign({}, root); // inherit all fields used in the button
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
  for (let v = 0; v < btns.length; v++) {
    btns[v] = new ToolbarConfigLoader(null).button.normalize(btns[v]/* sharedProperties, */);
    // todo: refactor this out, not needed a.ny more as they are all together now
    // btns[v].group = root;// grp;    // attach group reference, needed for fallback etc.
  }

  root.buttons = btns; // ensure the internal def is also an array now
  log.add('done');
}
