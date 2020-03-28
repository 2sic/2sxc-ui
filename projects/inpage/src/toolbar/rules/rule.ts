import { Operations } from '.';
import { HasLog, Log } from '../../logging';
import { DictionaryValue } from '../../plumbing';

export class BuildRule extends HasLog {
    //#region Rule parts
    name: string;
    operation: Operations;

    //#endregion

    constructor(public ruleString: string, parentLog: Log) {
        super('Tlb.BdRule', parentLog);
        if (!ruleString) {
            this.log.add('rule is empty');
            return;
        }
        const parts = safeSplitOriginal(ruleString);

        const rest1 = this.loadHeader(parts.key);

        if (parts.params) this.loadParams(parts.params);
        if (parts.hash) this.loadButton(parts.hash);

    }

    private loadHeader(rule: string): void {
        const cl = this.log.call('loadHeader', rule);
        // todo: also split correctly if there is no ? but only a #
        // const parts = this.splitAtChar(rule, '?');
        const firstChar = rule[0];
        cl.add(`name part '${rule}', firstChar '${firstChar}'`);

        if ((Object as any).values(Operations).includes(firstChar)) {
            this.operation = firstChar as Operations;
            this.name = rule.substring(1);
        } else {
            this.operation = Operations.modify;
            this.name = rule;
        }

        return cl.done();
    }

    private loadParams(rule: string) {
        const cl = this.log.call('loadParams', rule);
        if (rule) this.params = this.splitParams(rule);
        cl.data('params', this.params);
        return cl.done();
    }

    private loadButton(rule: string) {
        const cl = this.log.call('loadButton', rule);
        if (rule) this.button = this.splitParams(rule);
        cl.data('button', this.button);
        return cl.done();
    }

    //#region command parts
    action: string;

    params?: DictionaryValue = {};

    button?: DictionaryValue = {};

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



function safeSplitOriginal(str: string): { key: string, params: string, hash: string } | undefined {
    // dev link: https://regex101.com/r/vK4rV7/519
    // inpsired by https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex

    const regex = /^([^\/?#]*)?([^?#]*)(\?([^#]*))?(#(.*))?/i;
    // const str = `+edit&something=other&els=ok?aoeuaoeu=5&aoeuaou=aoeu#but=thi&aouoaeu`;
    const m = regex.exec(str);

    if (!m) return undefined;
    if (m !== null)
        return { key: m[1], params: m[4], hash: m[6]};
}
