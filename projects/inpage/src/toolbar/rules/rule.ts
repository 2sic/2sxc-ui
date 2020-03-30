import { Operations } from '.';
import { HasLog, Log } from '../../logging';
import { DictionaryValue } from '../../plumbing';
import { TemplateConstants } from '../templates';

export class BuildRule extends HasLog {
    //#region Rule parts
    /** The ID for this rule - often the same as the name */
    id: string;
    /** what this rule should do */
    operation: Operations;

    /** Name of the thing being added - often a command name or can be the group name */
    name: string;

    /** Group name - when adding more buttons */
    group: string = TemplateConstants.NameDefault;

    /** position where something is added - the group or the button */
    pos: number = 0;

    /**
     * if the position is from start or end.
     * Is calculated from pos +/-, but can also be -0 = end
     */
    fromStart = true;

    //#endregion

    //#region command parts

    params?: DictionaryValue = {};

    button?: DictionaryValue = {};

    //#endregion

    constructor(public ruleString: string, parentLog: Log) {
        super('Tlb.BdRule', parentLog);
        if (!ruleString) {
            this.log.add('rule is empty');
            return;
        }
        this.load();
    }

    private load() {
        const cl = this.log.call('load', this.ruleString);
        const parts = safeSplitOriginal(this.ruleString);
        if (!parts.key) return cl.done("no key, won't load");

        this.loadHeader(parts.key);
        if (parts.params) this.loadParams(parts.params);
        if (parts.button) this.loadButton(parts.button);
        return cl.done();
    }

    private loadHeader(rule: string): void {
        const cl = this.log.call('loadHeader', rule);
        const keyAndRest = this.splitAtChar(rule, '&');
        const keyPart = keyAndRest.first;
        const firstChar = keyPart[0];
        cl.add(`name part '${keyPart}', firstChar '${firstChar}'`);

        if ((Object as any).values(Operations).includes(firstChar)) {
            this.operation = firstChar as Operations;
            this.id = keyPart.substring(1);
        } else {
            this.operation = Operations.add;
            this.id = keyPart;
        }
        // command name defaults to name, can be reset by load-headers
        this.name = this.id;

        this.loadHeaderParts(keyAndRest.rest);

        return cl.done();
    }

    private loadHeaderParts(rest: string) {
        const cl = this.log.call('loadHeaderParts');
        if (!rest || !rest.trim().length) return cl.done('nothing to load');
        const parts = this.splitParams(rest);
        if (parts.name) this.name = parts.name as string;
        if (typeof parts.group === 'string') this.group = parts.group;
        if (typeof parts.pos === 'string' && parts.pos.length > 0) {
            let pos = parts.pos;
            if (pos[0] === '-') {
                this.fromStart = false;
                pos = pos.substring(1);
            }
            if (pos.length) this.pos = parseInt(pos, 10);
        }
    }

    private loadParams(rule: string) {
        const cl = this.log.call('loadParams', rule);
        this.params = this.splitParams(rule);
        cl.data('params', this.params);
        return cl.done();
    }

    private loadButton(rule: string) {
        const cl = this.log.call('loadButton', rule);
        this.button = this.splitParams(rule);
        cl.data('button', this.button);
        return cl.done();
    }



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



function safeSplitOriginal(str: string): { key: string, params: string, button: string } | undefined {
    // dev link: https://regex101.com/r/vK4rV7/519
    // inpsired by https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex

    const regex = /^([^\/?#]*)?([^?#]*)(\?([^#]*))?(#(.*))?/i;
    // const str = `+edit&something=other&els=ok?aoeuaoeu=5&aoeuaou=aoeu#but=thi&aouoaeu`;
    const m = regex.exec(str);

    if (!m) return undefined;
    if (m !== null)
        return { key: m[1], params: m[4], button: m[6]};
}
