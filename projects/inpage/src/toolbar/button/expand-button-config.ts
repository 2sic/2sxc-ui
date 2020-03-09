import { Commands } from '../../commands/commands';
import { Definition } from '../../commands/definition';
import { ContextOfButton } from '../../context/context-of-button';
import { Log } from '../../logging/log';
import { ToolbarConfig } from '../toolbar/toolbar-config';
import { ButtonConfig } from './button-config';
import { GroupConfig } from './group-config';

// takes an object like "actionname" or { action: "actionname", ... } and changes it to a { command: { action: "actionname" }, ... }
// ReSharper disable once UnusedParameter
export function expandButtonConfig(original: any, sharedProps: any[], parentLog: Log) {
  const log = new Log('Tlb.ExpBtn', parentLog, 'start');

  // prevent multiple inits
  if (original._expanded || original.command) {
    log.add("already expanded, won't modify");
    return original;
  }

  // if just a name, turn into a command
  if (typeof original === 'string') {
    log.add(`name "${original}" found, will re-map to .command.action`);
    original = { command: { action: original.trim() } };
  }

  // if it's a command w/action, wrap into command + trim
  if (typeof original.action === 'string') {
    log.add('action found, will move down to .command');
    original.action = original.action.trim();
    original = { command: original };
  }

  // some clean-up
  delete original.action; // remove the action property
  original._expanded = true;

  log.add('done');
  return original;
}

export function getButtonConfigDefaultsV1(name: string,
                                          icon: string,
                                          translateKey: string,
                                          uiOnly: boolean,
                                          partOfPage: boolean,
                                          more: Definition): Partial<ButtonConfig> {
  //
  // stv: v1 code
  const partialButtonConfig = {
    icon: (context: ContextOfButton) => `icon-sxc-${icon}`,
    title: (context: ContextOfButton) => `Toolbar.${translateKey}`,
    uiActionOnly: (context: ContextOfButton) => uiOnly,
    partOfPage: (context: ContextOfButton) => partOfPage,
  } as Partial<ButtonConfig>;

  Object.assign(partialButtonConfig, more);

  return partialButtonConfig;
}

// remove buttons which are not valid based on add condition
export function removeDisableButtons(context: any, full: ToolbarConfig, config: any, parentLog: Log): void {
  const log = new Log(`Tlb.RmvDsb', parentLog, 'start remove disabled buttons for ${full.groups.length} groups`);
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

function removeUnfitButtons(context: any, btns: ButtonConfig[], config: any, log: Log): void {
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

function disableButtons(context: ContextOfButton, btns: ButtonConfig[], config: any): void {
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

function evalPropOrFunction(propOrFunction: any, context: ContextOfButton, config: any, fallback: any): any {
  if (propOrFunction === undefined || propOrFunction === null) {
    return fallback;
  }
  if (typeof (propOrFunction) === 'function') {
    return propOrFunction(context, config);
  } else {
    return propOrFunction;
  }
}

/**
 * enhance button-object with default icons, etc.
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 */
export function addDefaultBtnSettings(btn: ButtonConfig,
                                      group: GroupConfig,
                                      fullToolbarConfig: ToolbarConfig,
                                      actions: Commands,
                                      log: Log) {

  // log.add(`adding default btn settings for ${btn.action.name}`);
  log.add(`adding default btn settings for ${() => btn.action.name}`);
  for (let d = 0; d < btnProperties.length; d++) {
    fallbackBtnSetting(btn, group, fullToolbarConfig, actions, btnProperties[d]);
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
                            group: GroupConfig,
                            fullToolbarConfig: ToolbarConfig,
                            actions: Commands,
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

// ReSharper disable once UnusedParameter
export function customize(toolbar: ToolbarConfig): void {
  // if (!toolbar.settings) return;
  // let set = toolbar.settings;
  // if (set.autoAddMore) {
  //    console.log("auto-more");
  //    let grps = toolbar.groups;
  //    for (let g = 0; g < grps.length; g++) {
  //        let btns = grps[g];
  //        for (let i = 0; i < btns.length; i++) {
  //        }
  //    }
  // }
}
