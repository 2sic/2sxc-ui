import { Operations } from '.';
import { BuildRule } from '.';
import { RuleConstants } from '.';
import { HasLog } from '../../logging';
import { ToolbarConfigLoader } from '../config-loaders';
import { BuildSteps } from './build-steps';


export class RuleManager extends HasLog {
    rules: BuildRule[] = [];
    constructor(parent: ToolbarConfigLoader) {
        super('Tlb.RlMngr', parent.log);
        // this.log.liveDump = true;
    }

    load(rawList: string[]): BuildRule[] {
        const cl = this.log.call('load', `${() => rawList.length}`);
        if (!Array.isArray(rawList))
            return cl.return([], 'raw is empty');

        rawList.forEach((raw) => {
            if (typeof raw === 'string') {
                try {
                    this.rules.push(new BuildRule(raw, this.log));
                } catch (e) {
                    cl.add(`error adding string-rule '${raw}'`, e);
                }
            } else {
                // todo
            }
        });
        return cl.return(this.rules, 'final rules');
    }

    find(id: string): BuildRule | undefined {
        const found = this.rules.find((r) => r.id === id);
        return found;
    }

    getSettings = () => this.getSystem(BuildSteps.settings);
    getParams = () => this.getSystem(BuildSteps.params);
    getToolbar = () => this.getSystem(BuildSteps.toolbar);

    getAdd = () => this.getListByCriteria((br) => br.operator === Operations.add);

    getRemovGroups = () => this.getListByCriteria((br) => br.operator === Operations.remove && br.step === BuildSteps.group);

    private getSystem(name: BuildSteps): BuildRule | undefined {
        const found = this.rules.find((r) => r.operator === Operations.system && r.step === name);
        return found;
    }

    private getListByCriteria(criteria: (x: BuildRule) => boolean): BuildRule[] {
        return this.rules.filter(criteria);
    }
}
