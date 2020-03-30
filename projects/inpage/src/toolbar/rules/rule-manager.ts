import { Operations } from '.';
import { BuildRule } from '.';
import { RuleConstants } from '.';
import { HasLog } from '../../logging';
import { ToolbarConfigLoader } from '../config-loaders';


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

    find(name: string): BuildRule | undefined {
        const found = this.rules.find((r) => r.id === name);
        return found;
    }

    getSettings = () => this.getSystem(RuleConstants.Settings);
    getParams = () => this.getSystem(RuleConstants.Params);

    getAdd = () => this.getListByCriteria((br) => br.operation === Operations.add);

    private getSystem(name: string): BuildRule | undefined {
        const found = this.rules.find((r) => r.operation === Operations.system && r.id === name);
        return found;
    }

    private getListByCriteria(criteria: (x: BuildRule) => boolean): BuildRule[] {
        return this.rules.filter(criteria);
    }
}
