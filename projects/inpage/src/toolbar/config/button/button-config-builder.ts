﻿import { Commands as Commands } from '../../../commands/commands';
import { ContextOfButton } from '../../../context/parts/context-button';
import { HasLog } from '../../../logging/has-log';
import { Log } from '../../../logging/log';
import { InstanceConfig } from '../../../manage/instance-config';
import { ToolbarConfig } from '../../toolbar/toolbar-config';
import { ButtonGroupConfig } from '../button-group-config';
import { InPageButtonConfiguration, InPageCommandConfiguration, isInPageCommandConfiguration } from './in-page-button-configuration';
import { ButtonConfig } from './button-config';

/**
 * This is a system to build button configurations
 */
export class ButtonConfigurationBuilder extends HasLog {
  constructor(parentLog: Log) {
    super('Tlb.BtCfBl', parentLog);
  }



  /**
   * takes an object like "actionname" or { action: "actionname", ... }
   * and changes it to a { command: { action: "actionname" }, ... }
   *
   * @param {(InPageButtonConfiguration | InPageCommandConfiguration | string)} original
   * @returns {InPageButtonConfiguration}
   * @memberof ButtonConfigurationBuilder
   */
  normalize(original: InPageButtonConfiguration | InPageCommandConfiguration | string): InPageButtonConfiguration {
    const log = new Log('Tlb.ExpBtn', this.log, 'start');

    // prevent multiple inits
    const asBtnConfig = original as InPageButtonConfiguration;
    if (asBtnConfig._expanded || asBtnConfig.command) {
      log.add("already expanded, won't modify");
      return asBtnConfig;
    }

    // if just a name, turn into a command
    // use the deep version with command.action, because of more clean-up later on
    if (typeof original === 'string') {
      log.add(`name "${original}" found, will re-map to .command.action`);
      return {
          command: { action: original.trim() },
          _expanded: true,
      };
    }

    // if it's a command w/action, wrap into command + trim
    if (isInPageCommandConfiguration(asBtnConfig)) {
      log.add('action found, will move down to .command');
      return {
          command: { action: (original as InPageCommandConfiguration).action.trim() },
          _expanded: true,
      };
    }

    throw 'can\'t expand InPageButtonConfiguration - unexpected type signature encountered';
  }




  /**
   * remove buttons which are not valid based on add condition
   * @param {ContextOfButton} context
   * @param {ToolbarConfig} full
   * @param {InstanceConfig} config
   * @memberof ButtonConfigurationBuilder
   */
  removeDisableButtons(context: ContextOfButton, full: ToolbarConfig, config: InstanceConfig): void {
    const log = new Log('Tlb.RmvDsb', this.log,  `start remove disabled buttons for ${full.groups.length} groups`);
    const btnGroups = full.groups;
    for (let g = 0; g < btnGroups.length; g++) {
      const btns = btnGroups[g].buttons;
      removeUnfitButtons(context, btns, config, log);

      log.add('will disable appropriate buttons');
      disableButtons(context, btns, config);

      // remove the group, if no buttons left, or only "more"
      // if (btns.length === 0 || (btns.length === 1 && btns[0].command.action === 'more'))
      if (btns.length === 0 || (btns.length === 1 && btns[0].action.name === 'more')) {
        log.add('found no more buttons except for the "more" - will remove that too');
        btnGroups.splice(g--, 1);
      } // remove, and decrement counter
    }
  }



  /**
   * enhance button-object with default icons, etc.
   * @param btn
   * @param group
   * @param fullToolbarConfig
   * @param actions
   */
  addDefaultBtnSettings(btn: ButtonConfig,
                        group: ButtonGroupConfig,
                        fullToolbarConfig: ToolbarConfig,
                        actions: typeof Commands) {
    this.log.add(`adding default btn settings for ${() => btn.action.name}`);
    for (let d = 0; d < btnProperties.length; d++) {
      fallbackBtnSetting(btn, group, fullToolbarConfig, actions, btnProperties[d]);
    }
  }


}



function removeUnfitButtons(context: ContextOfButton, btns: ButtonConfig[], config: InstanceConfig, log: Log): void {
  let removals = '';
  for (let i = 0; i < btns.length; i++) {
    // let add = btns[i].showCondition;
    // if (add !== undefined)
    //    if (typeof (add) === "function" ? !add(btns[i].command, config) : !add)
    // if (!evalPropOrFunction(btns[i].showCondition, btns[i].command, config, true))
    context.button = btns[i];
    if (btns[i].action && !evalPropOrFunction(btns[i].showCondition, context, config, true)) {
      removals += `#${i} "${btns[i].action.name}"; `;
      btns.splice(i--, 1);
    }
  }
  if (removals)
    log.add(`removed buttons: ${removals}`);
}

function disableButtons(context: ContextOfButton, btns: ButtonConfig[], config: InstanceConfig): void {
  for (let i = 0; i < btns.length; i++) {
    // btns[i].disabled = evalPropOrFunction(btns[i].disabled, btns[i].command, config, false);
    context.button = btns[i];
    if (btns[i].action) {
      btns[i].disabled = evalPropOrFunction(
        btns[i].disabled,
        context,
        config,
        false);
    } else {
      btns[i].disabled = (() => false);
    }

  }
}

function evalPropOrFunction(propOrFunction: any, context: ContextOfButton, config: InstanceConfig, fallback: any): any {
  if (propOrFunction === undefined || propOrFunction === null) {
    return fallback;
  }
  if (typeof (propOrFunction) === 'function') {
    return propOrFunction(context, config);
  } else {
    return propOrFunction;
  }
}

const btnProperties = [
  'classes',
  'icon',
  'title',
  'dynamicClasses',
  'showCondition',
  'disabled',
];

const prvProperties = [
  'defaults',
  'params',
  'name',
];

/**
 * configure missing button properties with various fallback options
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 * @param propName
 */
function fallbackBtnSetting(btn: ButtonConfig,
                            group: ButtonGroupConfig,
                            fullToolbarConfig: ToolbarConfig,
                            actions: typeof Commands,
                            propName: string): void {
  if (btn[propName]) {

    // if already defined, use the already defined property
    btn[propName] = btn[propName];

  } else if (group.defaults &&
    group.defaults[propName]) {

    // if the group has defaults, try use that property
    btn[propName] = group.defaults[propName];

  } else if (fullToolbarConfig &&
    fullToolbarConfig.defaults &&
    fullToolbarConfig.defaults[propName]) {

    // if the toolbar has defaults, try use that property
    btn[propName] = fullToolbarConfig.defaults[propName];

  } else if (btn.action &&
    btn.action.name &&
    actions.get(btn.action.name) &&
    actions.get(btn.action.name).buttonConfig &&
    actions.get(btn.action.name).buttonConfig[propName]) {

    // if there is an action, try to use that property name
    btn[propName] = actions.get(btn.action.name).buttonConfig[propName];

  }
}
