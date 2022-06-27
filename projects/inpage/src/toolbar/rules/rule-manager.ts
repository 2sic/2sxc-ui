import { Operations as OP } from '.';
import { BuildRule } from '.';
import { HasLog } from '../../core';
import { ToolbarConfigLoader } from '../config-loaders';
import { BuildSteps } from './build-steps';

const throwOnError = true;

/**
 * @internal
 */
export class RuleManager extends HasLog {
    /** List of rules which were picked up and will be applied */
    rules: BuildRule[] = [];

    ruleManagerId = Math.floor(Math.random() * 99999);

    /** Basic constructor, must be called from a ToolbarConfigLoader */
    constructor(parent: ToolbarConfigLoader) {
        super('Tlb.RlMngr', parent.log, 'constructor');
        this.log.add('tempId:' + this.ruleManagerId);
    }

    /** Load/initialize the rules which were found */
    load(rawList: string[]): BuildRule[] {
        const cl = this.log.call('load', `${() => rawList.length}`);
        if (!Array.isArray(rawList))
            return cl.return([], 'raw is empty');

        rawList.forEach((raw) => {
            if (typeof raw === 'string') {
                try {
                    this.rules.push(new BuildRule(raw, this.log));
                } catch (e) {
                    if (throwOnError) throw e;
                    cl.add(`error adding string-rule '${raw}'`, e);
                }
            } else {
                console.error('tried to parse a toolbar rule and expected a string, but got something else');
            }
        });



        return cl.return(this.rules, 'final rules');
    }

    /** Find a single rule matching an ID */
    find(id: string): BuildRule | undefined { return this.rules.find((r) => r.id === id); }

    /** find all rules matching a criteria */
    filter(criteria: (x: BuildRule) => boolean): BuildRule[] { return this.rules.filter(criteria); }


    /** the settings are usually retrieved on settings, but you can also put them behind the toolbar */
    getSettings = () => this.getSystemRule(BuildSteps.settings) || this.getToolbar();

    /** the params for the command - if not found, will use the toolbar params */
    getParams = () => this.getSystemRule(BuildSteps.params) || this.getToolbar();

    getToolbar = () => this.getSystemRule(BuildSteps.toolbar);
    getAdd = () => this.filter((br) => br.operator === OP.add || br.operator == OP.addAuto);
    getRemoveGroups = () => this.filter((br) => br.operator === OP.remove && br.step === BuildSteps.group);

    /** Find a system rule (marked with '$') */
    private getSystemRule(name: BuildSteps): BuildRule | undefined {
        return this.rules.find((r) => r.operator === OP.system && r.step === name);
    }

}
