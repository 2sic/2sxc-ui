﻿import { InPageCommandJson, ToolbarWip } from '.';
import { InPageButtonJson } from '.';
import { ToolbarConfigLoader } from '.';
import { CmdMore } from '../../commands/command/more';
import { Commands } from '../../commands/commands';
import { ContextComplete } from '../../context/bundles';
import { HasLog, Log } from '../../logging';
import { DictionaryValue, TypeTbD, TypeUnsafe, TypeWeDontCare } from '../../plumbing';
import { Button, ButtonCommand, ButtonGroup, Toolbar } from '../config';
import { ButtonModifier } from '../config/button-modifier';

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

        if (jsonBtn.code) btn.code = (c: ContextComplete) => jsonBtn.code(c.button.action.params);
        if (jsonBtn.icon) btn.icon = () => `icon-sxc-${jsonBtn.icon}`;
        if (jsonBtn.classes) btn.classes = jsonBtn.classes;
        if (jsonBtn.dialog) btn.dialog = () => jsonBtn.dialog;
        if (jsonBtn.disabled) btn.disabled = () => jsonBtn.disabled;
        if (jsonBtn.dynamicClasses) btn.dynamicClasses = (c: ContextComplete) => jsonBtn.dynamicClasses(c.button.action.params);
        if (jsonBtn.fullScreen) btn.fullScreen = () => jsonBtn.fullScreen;
        if (jsonBtn.inlineWindow) btn.inlineWindow = () => jsonBtn.inlineWindow;
        if (jsonBtn.name) btn.name = jsonBtn.name;
        if (jsonBtn.newWindow) btn.newWindow = () => jsonBtn.newWindow;

        // todo: stv, this do not looking good, because old simple parameters become methods with context as parameter,
        // we need parameter adapter to do this...
        if (jsonBtn.params) btn.params = () => jsonBtn.params;
        if (jsonBtn.partOfPage) btn.partOfPage = () => jsonBtn.partOfPage;
        if (jsonBtn.showCondition) btn.showCondition = (c: ContextComplete) => jsonBtn.showCondition(c.button.action.params);
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
        const wrapLog = this.log.call('normalize'); // new Log('Tlb.ExpBtn', this.log, 'start');
        wrapLog.data('initial', original);

        // prevent multiple inits
        const asBtnConfig = original as InPageButtonJson;
        if (asBtnConfig._expanded || asBtnConfig.command)
            return wrapLog.return(asBtnConfig, "already expanded, won't modify");

        // if just a name, turn into a command
        // use the deep version with command.action, because of more clean-up later on
        if (typeof original === 'string')
            return wrapLog.return(this.getFromName(original), 'found name, use that');

        // if it's a command w/action, wrap into command + trim
        if (InPageCommandJson.hasActions(original)) {
            wrapLog.add('action found, will move down to .command', original);
            if (original.action) original.action = original.action.trim();
            return wrapLog.return({
                command: original,
                _expanded: true,
            }, 'had actions, convert to commands');
        }

        throw 'can\'t expand InPageButtonConfiguration - unexpected type signature encountered';
    }

    getFromName(name: string): InPageButtonJson {
        const wrapLog = this.log.call('getFromName');
        return wrapLog.return({
            command: { action: name.trim() },
            _expanded: true,
        }, `name "${name}" found, will re-map to .command.action`);
    }




/**
 * remove buttons which are not valid based on add condition
 * @param {ContextComplete} context
 * @param {Toolbar} full
 * @param {InstanceConfig} config
 * @memberof ButtonConfigurationBuilder
 */
    removeDisableButtons(context: ContextComplete, full: Toolbar,
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        // config: InstanceConfig
        ): void {
        const wrapLog = this.log.call('removeDisableButtons', `length of groups: ${full.groups.length}`); // new Log('Tlb.RmvDsb', this.log,  `start remove disabled buttons for ${full.groups.length} groups`);
        const btnGroups = full.groups;
        for (let g = 0; g < btnGroups.length; g++) {
            const btns = btnGroups[g].buttons;
            // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
            this.removeUnfitButtons(context, full, btns /* config, */);

            wrapLog.add('will disable appropriate buttons');
            // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
            disableButtons(context, btns/*, config */);

            // remove the group, if no buttons left, or only "more"
            if (btns.length === 0 || (btns.length === 1 && btns[0].action.name === CmdMore)) {
                wrapLog.add('found no more buttons except for the "more" - will remove that group');
                btnGroups.splice(g--, 1); // remove, and decrement counter
            }
        }
        wrapLog.return(null);
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
        const cl = this.log.call('addDefaultBtnSettings', '', `adding default btn settings for ${() => btn.action.name}`);
        for (let d = 0; d < btnProperties.length; d++) {
            fallbackBtnSetting(btn, group, fullToolbarConfig, actions, btnProperties[d]);
        }
        cl.return(null);
    }



    private removeUnfitButtons(context: ContextComplete, toolbar: Toolbar, btns: Button[]): void {
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        // config: InstanceConfig,
        const cl = this.log.call('removeUnfitButtons');
        let removals = '';
        const modifiers = toolbar.settings && toolbar.settings._btnModifiers || [];
        for (let i = 0; i < btns.length; i++) {
            const btn = btns[i];
            // add to context for calls to verify if it should be shown
            context.button = btn;
            if (btn.action) {
                const modifier = ButtonModifier.check(modifiers, btn.action.name);
                const remove = modifier.remove
                    || !evalPropOrFunction(btn.showCondition, context, /* config, */ true);
                if (remove) {
                    removals += `#${i} "${btn.action.name}"; `;
                    btns.splice(i--, 1);
                }
                cl.add(`btn '${btn.action.name}' remove ${remove} - modifierMessage ${modifier.reason}`);
            }
        }
        if (removals)
            cl.add(`removed buttons: ${removals}`);
        cl.return(null);
    }

}





// #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused
function disableButtons(context: ContextComplete, btns: Button[],
    // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused
    // config: InstanceConfig
    ): void {
    for (let i = 0; i < btns.length; i++) {
        // btns[i].disabled = evalPropOrFunction(btns[i].disabled, btns[i].command, config, false);
        context.button = btns[i];
        if (btns[i].action)
            btns[i].disabled = evalPropOrFunction(btns[i].disabled, context, /* config, */ () => false);
        else
            btns[i].disabled = (() => false);
    }
}

function evalPropOrFunction<T>(
    propOrFunction: TypeTbD,
    context: ContextComplete,
    // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
    // config: InstanceConfig,
    fallback: T): T {
    if (propOrFunction === undefined || propOrFunction === null) {
        return fallback;
    }
    if (typeof (propOrFunction) === 'function') {
        return propOrFunction(context/*, config */);
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
