import { Operations } from '.';
import { HasLog, Log } from '../../logging';
import { DictionaryValue } from '../../plumbing';

export class BuildRule extends HasLog {
    //#region Rule parts
    ruleName: string;
    ruleOperation: Operations;

    //#endregion

    constructor(public ruleString: string, parentLog: Log) {
        super('Tlb.BdRule', parentLog);
        if (!ruleString) {
            this.log.add('rule is empty');
            return;
        }

        const rest1 = this.loadHeader(ruleString);

        if (!rest1) return;
        const rest2 = this.loadParams(rest1);

    }

    private loadHeader(rule: string): string {
        const cl = this.log.call('loadHeader', rule);
        // todo: also split correctly if there is no ? but only a #
        const parts = this.splitAtChar(rule, '?');
        const firstChar = parts.first[0];
        cl.add(`name part '${parts.first}', firstChar '${firstChar}', rest '${parts.rest}'`);

        if ((Object as any).values(Operations).includes(firstChar)) {
            this.ruleOperation = firstChar as Operations;
            this.ruleName = parts.first.substring(1);
        } else {
            this.ruleOperation = Operations.modify;
            this.ruleName = parts.first;
        }

        return cl.return(parts.rest);
    }

    private loadParams(rule: string): string {
        const cl = this.log.call('loadParams', rule);
        const parts = this.splitAtChar(rule, '#');
        if (parts.first)
            this.params = this.splitParams(parts.first);
        cl.data('params', this.params);
        return cl.return(parts.rest);
    }

    //#region command parts
    action: string;

    params: DictionaryValue = {};

    //#endregion

    //#region display / button parts


    //#endregion


    //#region string manipulation helpers
    private splitAtChar(original: string, char: string): { first: string, rest: string} {
        const index = original.indexOf(char);
        const first = index > 0 ? original.substring(0, index) : original;
        // todo: catch trailing ?, would error
        const rest = index > 0 && original.length > index + 1 ? original.substring(index + 1) : '';
        return { first, rest };
    }

    private splitParams(original: string): DictionaryValue {
        if (!original) return {};
        const split1 = original.split('&');
        const split2 = split1.map((p) => p.split('='));
        const result = split2.reduce((map, obj) => {
            map[obj[0]] = obj[1];
            return map;
        }, {} as DictionaryValue);
        return result;
    }
    //#endregion
}


