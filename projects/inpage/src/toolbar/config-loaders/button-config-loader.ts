import { InPageCommandJson } from '.';
import { InPageButtonJson } from '.';
import { ToolbarConfigLoader } from '.';
import { CmdMore } from '../../commands/command/more';
import { Commands } from '../../commands/commands';
import { ContextComplete } from '../../context/bundles';
import { HasLog } from '../../logging';
import { DictionaryValue } from '../../plumbing';
import { Button, Toolbar } from '../config';
import { ButtonSafe } from '../config/button-safe';
import { Operations } from '../rules';

/**
 * This is a system to build button configurations
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
        const cl = this.log.call('normalize');
        cl.data('initial', original);

        // prevent multiple inits
        const asBtnConfig = original as InPageButtonJson;
        if (asBtnConfig._expanded || asBtnConfig.command)
            return cl.return(asBtnConfig, "already expanded, won't modify");

        // if just a name, turn into a command
        // use the deep version with command.action, because of more clean-up later on
        if (typeof original === 'string')
            return cl.return(this.getFromName(original), 'found name, use that');

        // if it's a command w/action, wrap into command + trim
        if (InPageCommandJson.hasActions(original)) {
            cl.add('action found, will move down to .command', original);
            if (original.action) original.action = original.action.trim();
            return cl.return({
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
            // disableButtons(context, btns/*, config */);

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
                          groupDefaults: DictionaryValue | null,
                          tlbDefaults: DictionaryValue | null | undefined,
                          actions: typeof Commands) {
        const cl = this.log.call('addDefaultBtnSettings', '', `for ${() => btn.action.name}`);
        for (let d = 0; d < btnProperties.length; d++)
            fallbackBtnSetting(btn, groupDefaults, tlbDefaults, actions, btnProperties[d]);
        cl.return(null);
    }



    private removeUnfitButtons(context: ContextComplete, toolbar: Toolbar, btns: Button[]): void {
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        // config: InstanceConfig,
        const cl = this.log.call('removeUnfitButtons');
        let removals = '';
        for (let i = 0; i < btns.length; i++) {
            const btn = btns[i];
            if (btn.action) {
                const modifier = this.toolbar.rules.find(btn.action.name);
                btn.modifier = modifier;
                context.button = btn; // add to context for calls
                const remove = modifier?.ruleOperation === Operations.remove
                    || !(new ButtonSafe(btn, context).showCondition());
                if (!(modifier?.ruleOperation === Operations.add) && remove) {
                    removals += `#${i} "${btn.action.name}"; `;
                    btns.splice(i--, 1);
                }
                cl.add(`btn '${btn.action.name}' remove ${remove}`);
            }
        }
        if (removals)
            cl.add(`removed buttons: ${removals}`);
        cl.return(null);
    }

}


// 2020-03-27 2dm removed this - it's resolved at render level anyhow!
// function disableButtons(context: ContextComplete, btns: Button[],
//     ): void {
//     for (let i = 0; i < btns.length; i++) {
//         context.button = btns[i];
//         if (btns[i].action)
//             btns[i].disabled = Button.genToValue(btns[i].disabled, context,  false);
//         else
//             btns[i].disabled = ((_) => false);
//     }
// }


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
                            groupDefaults: DictionaryValue | null,
                            toolbarDefaults: DictionaryValue | null | undefined,
                            actions: typeof Commands,
                            propName: string) {
    const target = btn as unknown as DictionaryValue;

    // skip it property is already set
    if (target[propName])
        return;

    if (groupDefaults && groupDefaults[propName])
        return target[propName] = groupDefaults[propName];

    // if the toolbar has defaults, try use that property
    if (toolbarDefaults && toolbarDefaults[propName])
        return target[propName] = toolbarDefaults[propName];

    // if there is an action, try to use that property name
    if (btn.action && btn.action.name) {
        const a = actions.get(btn.action.name);
        if (a && a.buttonDefaults) {
            const c = a.buttonDefaults as DictionaryValue;
            if (c[propName])
                return target[propName] = c[propName];
        }
    }
}
