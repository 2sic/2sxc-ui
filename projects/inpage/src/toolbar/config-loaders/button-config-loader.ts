import { InPageCommandJson } from '.';
import { InPageButtonJson } from '.';
import { ToolbarConfigLoader } from '.';
import { Commands } from '../../commands';
import { ContextComplete } from '../../context/bundles';
import { HasLog } from '../../core';
import { TypeValue } from '../../plumbing';
import { ButtonConfiguration, CommandWithParams, Toolbar } from '../config';
import { ButtonDefinition } from '../config/button-definition';
import { ButtonWithContext } from '../config/button-safe';
import { CommandNames } from './../../commands/';

/**
 * This is a system to build button configurations
 * @internal
 */
export class ButtonConfigLoader extends HasLog {

  constructor(private toolbar: ToolbarConfigLoader) {
    super('Tlb.BtCfBl', toolbar.log);
  }

  /**
   * takes an object like "actionname" or { action: "actionname", ... }
   * and changes it to a { command: { action: "actionname" }, ... }
   */
  normalize(original: InPageButtonJson | InPageCommandJson | string): InPageButtonJson {
    const l = this.log.call('normalize');
    l.data('initial', original);

    // prevent multiple inits
    const asBtnConfig = original as InPageButtonJson;
    if (asBtnConfig._expanded || asBtnConfig.command)
      return l.return(asBtnConfig, "already expanded, won't modify");

    // if just a name, turn into a command
    // use the deep version with command.action, because of more clean-up later on
    if (typeof original === 'string')
      return l.return(this.btnConfigStructure(original, {}), 'found name, use that');

    // if it's a command w/action, wrap into command + trim
    if (InPageCommandJson.hasActions(original)) {
      l.add('action found, will move down to .command', original);
      if (original.action)
        original.action = original.action.trim() as CommandNames;
      return l.return({
        command: original,
        _expanded: true,
      }, 'had actions, convert to commands');
    }

    throw 'can\'t expand InPageButtonConfiguration - unexpected type signature encountered';
  }

  btnConfigStructure(name: string, params: {}): InPageButtonJson {
    const l = this.log.call('getFromName', name);
    return l.return({
      command: {
        action: name.trim() as CommandNames,
        params: params,
      },
      _expanded: true,
    }, `name "${name}" found, will re-map to .command.action`);
  }


  /**
   * remove buttons which are not valid based on add condition
   */
  removeDisableButtons(context: ContextComplete, full: Toolbar): void {
    const l = this.log.call('removeDisableButtons', `length of groups: ${full.groups.length}`);
    const btnGroups = full.groups;
    for (let g = 0; g < btnGroups.length; g++) {
      const btns = btnGroups[g].buttons;
      this.#removeUnfitButtons(context, btns);

      l.add('will disable appropriate buttons');

      // remove the group, if no buttons left, or only "more"
      if (btns.length === 0 || (btns.length === 1 && btns[0].command.name === CommandNames.more)) {
        l.add('found no more buttons except for the "more" - will remove that group');
        btnGroups.splice(g--, 1); // remove, and decrement counter
      }
    }
    l.return(null);
  }



  /**
   * enhance button-object with default icons, etc.
   */
  addDefaultBtnSettings(
    btn: ButtonConfiguration,
    groupDefaults: Record<string, TypeValue> | null,
    tlbDefaults: Record<string, TypeValue> | null | undefined,
    actions: Commands
  ) {
    const cl = this.log.call('addDefaultBtnSettings', '', `for ${() => btn.command.name}`);
    for (let d = 0; d < btnProperties.length; d++)
      fallbackBtnSetting(btn, groupDefaults, tlbDefaults, actions, btnProperties[d]);
    cl.return(null);
  }



  #removeUnfitButtons(context: ContextComplete, btns: ButtonConfiguration[]): void {
    const l = this.log.call('removeUnfitButtons');
    let removals = '';
    for (let i = 0; i < btns.length; i++) {
      const btn = btns[i];
      if (!btn.command)
        continue;
      context.button = btn; // add to context for calls
      const rule = this.toolbar.toolbarV10.rules.find(btn.id || btn.command.name);
      let show: boolean = rule?.overrideShow();
      if (show == null) {
        // make sure params on the rule are also respected when checking the show-condition
        // I think this should have happened earlier, but as of 2022-06 it's necessary
        var btnSafe = new ButtonWithContext(btn, context);
        CommandWithParams.mergeAdditionalParams(btnSafe.btnCommand(), rule?.params);
        show = btnSafe.getShowCondition();
      }
      if (show === false) {
        removals += `#${i} "${btn.command.name}"; `;
        btns.splice(i--, 1);
      }
      l.add(`btn '${btn.command.name}' show ${show}`);
    }
    if (removals)
      l.add(`removed buttons: ${removals}`);
    l.return(null);
  }

}

const btnProperties: (keyof ButtonDefinition)[] = [
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
function fallbackBtnSetting(
  btn: ButtonConfiguration,
  groupDefaults: Record<string, TypeValue> | null,
  toolbarDefaults: Record<string, TypeValue> | null | undefined,
  actions: Commands,
  propName: keyof ButtonDefinition,
) {
  const target = btn.definition as Record<string, TypeValue>;

  // skip it property is already set
  if (target[propName])
    return;

  // first try group defaults, then toolbar defaults
  const newValue = groupDefaults?.[propName] ?? toolbarDefaults?.[propName];
  if (newValue)
    return target[propName] = newValue;

  // if there is an action, try to use that property name
  if (btn.command?.name) {
    const a = actions.get(btn.command.name);
    const c = a?.buttonDefaults as Record<string, TypeValue>;
    if (c?.[propName])
      return target[propName] = c[propName];
  }
}
