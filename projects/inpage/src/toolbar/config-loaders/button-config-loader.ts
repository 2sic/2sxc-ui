﻿import { InPageCommandJson, ButtonGroupWip, ToolbarWip } from '.';
import { InPageButtonJson } from '.';
import { ToolbarConfigLoader } from '.';
import { Commands } from '../../commands/commands';
import { ContextBundleButton } from '../../context/bundles';
import { HasLog } from '../../logging';
import { Log } from '../../logging';
import { InstanceConfig } from '../../manage/instance-config';
import { DictionaryValue, TypeTbD, TypeUnsafe, TypeWeDontCare } from '../../plumbing';
import { Button, ButtonCommand, ButtonGroup, Toolbar } from '../config';

/**
 * This is a system to build button configurations
 */
export class ButtonConfigLoader extends HasLog {

    constructor(private toolbar: ToolbarConfigLoader) {
        super('Tlb.BtCfBl', toolbar.log);
    }


    /**
     * Converts the InPageButtonJson to a Button
     * WARNING: Note that this does the same task as convertToButton in the ButtonGroupConfigLoader - but very differently
     *          I'm not sure why though.
     */
    convertToButton(jsonBtn: InPageButtonJson): Button {
        const btn: Partial<Button> = {};

        if (jsonBtn.code) btn.code = (c: ContextBundleButton) => jsonBtn.code(c.button.action.params);
        if (jsonBtn.icon) btn.icon = () => `icon-sxc-${jsonBtn.icon}`;
        if (jsonBtn.classes) btn.classes = jsonBtn.classes;
        if (jsonBtn.dialog) btn.dialog = () => jsonBtn.dialog;
        if (jsonBtn.disabled) btn.disabled = () => jsonBtn.disabled;
        if (jsonBtn.dynamicClasses) btn.dynamicClasses = (c: ContextBundleButton) => jsonBtn.dynamicClasses(c.button.action.params);
        if (jsonBtn.fullScreen) btn.fullScreen = () => jsonBtn.fullScreen;
        if (jsonBtn.inlineWindow) btn.inlineWindow = () => jsonBtn.inlineWindow;
        if (jsonBtn.name) btn.name = jsonBtn.name;
        if (jsonBtn.newWindow) btn.newWindow = () => jsonBtn.newWindow;

        // todo: stv, this do not looking good, because old simple parameters become methods with context as parameter,
        // we need parameter adapter to do this...
        if (jsonBtn.params) btn.params = () => jsonBtn.params;
        if (jsonBtn.partOfPage) btn.partOfPage = () => jsonBtn.partOfPage;
        if (jsonBtn.showCondition) btn.showCondition = (c: ContextBundleButton) => jsonBtn.showCondition(c.button.action.params);
        if (jsonBtn.title) btn.title = () => `Toolbar.${jsonBtn.title}`;
        if (jsonBtn.uiActionOnly) btn.uiActionOnly = () => jsonBtn.uiActionOnly;

        jsonBtn = this.normalize(jsonBtn);

        const name = jsonBtn.command.action;
        const contentType = jsonBtn.command.contentType;

        // if the button belongs to a content-item, move the specs up to the item into the settings-object
        this.toolbar.command.normalizeCommandJson(jsonBtn.command);

        // parameters adapter from v1 to v2
        const params = this.toolbar.command.removeActionProperty(jsonBtn.command);

        // Toolbar API v2
        const newButtonAction = new ButtonCommand(name, contentType, params);
        return new Button(newButtonAction, name);
    }



    /**
     * takes an object like "actionname" or { action: "actionname", ... }
     * and changes it to a { command: { action: "actionname" }, ... }
     */
    normalize(original: InPageButtonJson | InPageCommandJson | string): InPageButtonJson {
        const log = new Log('Tlb.ExpBtn', this.log, 'start');

        // prevent multiple inits
        const asBtnConfig = original as InPageButtonJson;
        if (asBtnConfig._expanded || asBtnConfig.command) {
            log.add("already expanded, won't modify");
            return asBtnConfig;
        }

        // if just a name, turn into a command
        // use the deep version with command.action, because of more clean-up later on
        if (typeof original === 'string') return this.getFromName(original);
        // {
        //     log.add(`name "${original}" found, will re-map to .command.action`);
        //     return {
        //         command: { action: original.trim() },
        //         _expanded: true,
        //     };
        // }

        // if it's a command w/action, wrap into command + trim
        if (InPageCommandJson.is(asBtnConfig)) {
            log.add('action found, will move down to .command');
            return {
                command: { action: (original as InPageCommandJson).action.trim() },
                _expanded: true,
            };
        }

        throw 'can\'t expand InPageButtonConfiguration - unexpected type signature encountered';
    }

    getFromName(name: string): InPageButtonJson {
        this.log.add(`name "${name}" found, will re-map to .command.action`);
        return {
            command: { action: name.trim() },
            _expanded: true,
        };
    }




  /**
   * remove buttons which are not valid based on add condition
   * @param {ContextBundleButton} context
   * @param {Toolbar} full
   * @param {InstanceConfig} config
   * @memberof ButtonConfigurationBuilder
   */
  removeDisableButtons(context: ContextBundleButton, full: Toolbar, config: InstanceConfig): void {
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
    addDefaultBtnSettings(btn: Button,
                          group: ButtonGroup,
                          fullToolbarConfig: ToolbarWip,
                          actions: typeof Commands) {
        this.log.add(`adding default btn settings for ${() => btn.action.name}`);
        for (let d = 0; d < btnProperties.length; d++) {
            fallbackBtnSetting(btn, group, fullToolbarConfig, actions, btnProperties[d]);
        }
    }

}



function removeUnfitButtons(context: ContextBundleButton, btns: Button[], config: InstanceConfig, log: Log): void {
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

function disableButtons(context: ContextBundleButton, btns: Button[], config: InstanceConfig): void {
  for (let i = 0; i < btns.length; i++) {
    // btns[i].disabled = evalPropOrFunction(btns[i].disabled, btns[i].command, config, false);
    context.button = btns[i];
    if (btns[i].action) {
      btns[i].disabled = evalPropOrFunction(btns[i].disabled, context, config, () => false);
    } else {
      btns[i].disabled = (() => false);
    }

  }
}

function evalPropOrFunction<T>(propOrFunction: TypeTbD, context: ContextBundleButton, config: InstanceConfig, fallback: T): T {
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


/**
 * configure missing button properties with various fallback options
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 * @param propName
 */
function fallbackBtnSetting(btn: Button,
                            group: ButtonGroup,
                            fullToolbarConfig: ToolbarWip,
                            actions: typeof Commands,
                            propName: string): TypeWeDontCare {
  const untypedButton = btn as TypeUnsafe as DictionaryValue;
  if (untypedButton[propName])
    return;

  // if the group has defaults, try use that property
  if (group.defaults && group.defaults[propName])
    return untypedButton[propName] = group.defaults[propName];

  // if the toolbar has defaults, try use that property
  const conf = fullToolbarConfig;
  if (conf && conf.defaults && conf.defaults[propName])
    return untypedButton[propName] = conf.defaults[propName];

  // if there is an action, try to use that property name
  if (btn.action && btn.action.name) {
      const a = actions.get(btn.action.name);
      if (a && a.buttonConfig) {
        const c = a.buttonConfig as DictionaryValue;
        if (c[propName])
            return untypedButton[propName] = c[propName];
    }
  }
}