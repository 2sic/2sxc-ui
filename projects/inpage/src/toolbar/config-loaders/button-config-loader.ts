import { InPageCommandJson } from '.';
import { InPageButtonJson } from '.';
import { ToolbarConfigLoader } from '.';
import { CmdMore, Commands } from '../../commands';
import { ContextComplete } from '../../context/bundles';
import { HasLog } from '../../logging';
import { TypeValue } from '../../plumbing';
import { Button, Toolbar } from '../config';
import { ButtonSafe } from '../config/button-safe';

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
        const cl = this.log.call('normalize');
        cl.data('initial', original);

        // prevent multiple inits
        const asBtnConfig = original as InPageButtonJson;
        if (asBtnConfig._expanded || asBtnConfig.command)
            return cl.return(asBtnConfig, "already expanded, won't modify");

        // if just a name, turn into a command
        // use the deep version with command.action, because of more clean-up later on
        if (typeof original === 'string')
            return cl.return(this.btnConfigStructure(original, {}), 'found name, use that');

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

    btnConfigStructure(name: string, params: {}): InPageButtonJson {
        const wrapLog = this.log.call('getFromName', name);
        return wrapLog.return({
            command: {
                action: name.trim(),
                params: params,
            },
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
        const wrapLog = this.log.call('removeDisableButtons', `length of groups: ${full.groups.length}`);
        const btnGroups = full.groups;
        for (let g = 0; g < btnGroups.length; g++) {
            const btns = btnGroups[g].buttons;
            // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
            // const config = InstanceConfig.fromContext(context);
            this.removeUnfitButtons(context, /* full,*/ btns /* config, */);

            wrapLog.add('will disable appropriate buttons');
            // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
            // disableButtons(context, btns/*, config */);

            // remove the group, if no buttons left, or only "more"
            if (btns.length === 0 || (btns.length === 1 && btns[0].command.name === CmdMore)) {
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
                          groupDefaults: Record<string, TypeValue> | null,
                          tlbDefaults: Record<string, TypeValue> | null | undefined,
                          actions: Commands) {
        const cl = this.log.call('addDefaultBtnSettings', '', `for ${() => btn.command.name}`);
        for (let d = 0; d < btnProperties.length; d++)
            fallbackBtnSetting(btn, groupDefaults, tlbDefaults, actions, btnProperties[d]);
        cl.return(null);
    }



    private removeUnfitButtons(context: ContextComplete, btns: Button[]): void {
        // #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused; remove in June
        // config: InstanceConfig,
        const cl = this.log.call('removeUnfitButtons');
        let removals = '';
        for (let i = 0; i < btns.length; i++) {
            const btn = btns[i];
            if (btn.command) {
                context.button = btn; // add to context for calls
                const rule = this.toolbar.toolbarV10.rules.find(btn.id || btn.command.name);
                let show: boolean = rule?.overrideShow();
                if (show === undefined) {
                    show = new ButtonSafe(btn, context).showCondition();
                }
                if (show === false) {
                    removals += `#${i} "${btn.command.name}"; `;
                    btns.splice(i--, 1);
                }
                cl.add(`btn '${btn.command.name}' show ${show}`);
            }
        }
        if (removals)
            cl.add(`removed buttons: ${removals}`);
        cl.return(null);
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
                            groupDefaults: Record<string, TypeValue> | null,
                            toolbarDefaults: Record<string, TypeValue> | null | undefined,
                            actions: Commands,
                            propName: string) {
    const target = btn as unknown as Record<string, TypeValue>;

    // skip it property is already set
    if (target[propName])
        return;

    if (groupDefaults && groupDefaults[propName])
        return target[propName] = groupDefaults[propName];

    // if the toolbar has defaults, try use that property
    if (toolbarDefaults && toolbarDefaults[propName])
        return target[propName] = toolbarDefaults[propName];

    // if there is an action, try to use that property name
    if (btn.command && btn.command.name) {
        const a = actions.get(btn.command.name);
        if (a && a.buttonDefaults) {
            const c = a.buttonDefaults as Record<string, TypeValue>;
            if (c[propName])
                return target[propName] = c[propName];
        }
    }
}
