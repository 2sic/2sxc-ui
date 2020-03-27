import { isArray } from 'util';
import { HasLog } from '../../logging';
import { ToolbarConfigLoader } from '../config-loaders';
import { Operations } from './operations';
import { BuildRule } from './rule';


export class RuleManager extends HasLog {
    rules: BuildRule[] = [];
    constructor(parent: ToolbarConfigLoader) {
        super('Tlb.RlMngr', parent.log);
        this.log.liveDump = true;
    }

    load(rawList: string[]): BuildRule[] {
        const cl = this.log.call('load', `${() => rawList.length}`);
        if (!isArray(rawList))
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

    find(name: string): BuildRule | undefined {
        const found = this.rules.find((r) => r.ruleName === name);
        return found;
    }

    getSettings = () => this.getSystem('settings');
    getParams = () => this.getSystem('params');

    private getSystem(name: string): BuildRule | undefined {
        const found = this.rules.find((r) => r.ruleOperation === Operations.system && r.ruleName === name);
        return found;
    }
}
