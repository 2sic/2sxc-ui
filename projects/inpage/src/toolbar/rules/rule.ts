import { Operations as Operators, RuleConstants as RC } from '.';
import { HasLog, Log } from '../../logging';
import { Dictionary, DictionaryValue, TypeValue } from '../../plumbing';
import { TemplateConstants } from '../templates';
import { BuildSteps } from './build-steps';

export class BuildRule extends HasLog {
    //#region Rule parts
    /** The ID for this rule - often the same as the name */
    id: string;

    /** Name of the thing being added - often a command name or can be the group name */
    name: string;


    /** The build command to run */
    step: BuildSteps | string;

    /** what this rule should do */
    operator: Operators;


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

    params?: Dictionary<string> = {};

    ui: {
        icon?: string,
        class?: string,
        color?: string,
        show?: boolean,
        [key: string]: TypeValue,
    } = {};

    hash: Dictionary<string> = {};

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
        if (parts.button) this.loadHash(parts.button);
        return cl.done();
    }

    showOverride() {
        if (this.operator === Operators.remove) return false;
        if (this.operator === Operators.add) return true;
        if (this.operator === Operators.modify && this?.ui?.show !== undefined)
            return this.ui.show;
        return undefined;
    }


    private loadHeader(rule: string): void {
        const cl = this.log.call('loadHeader', rule);
        const parts = this.splitParamsArray(rule);
        let key = parts?.[0]?.[0] || RC.Keys.None;

        // Pick up the operation from header, but if it's not a known operator, auto-detect
        let operator = key[0];
        const knownOperatorFound = Object.values(Operators).includes(operator as Operators);
        if (!knownOperatorFound)
            operator = (key === BuildSteps.params || key === BuildSteps.settings || key === BuildSteps.toolbar)
                ? Operators.system
                : Operators.add;
        this.operator = operator as Operators;
        cl.add(`name part '${key}', firstChar '${operator}'`);
        // remember the primary keyword because this determines what we're doing
        // but truncate the first char if it had an operator
        key = knownOperatorFound ? key.substring(1) : key;

        const knowStepFound = Object.values(BuildSteps).includes(key as BuildSteps);
        this.step = knowStepFound ? key : BuildSteps.button;

        // for system and %-change operations the id should be the name of the standard button
        // ...but if it's an add-operation, we must keep the IDs appart because various
        // properties are set at a much later time
        this.id = (this.operator === Operators.add)
            ? 'rndId' + Math.floor(Math.random() * 99999)
            : key;

        // command name defaults to name, can be reset by load-headers
        // assumes key is something like "group=myGroup" or just "edit"
        this.name = parts?.[0]?.[1] || key;
        if (parts.length > 1) this.loadHeaderParts(parts.slice(1));

        return cl.done();
    }

    private loadHeaderParts(rest: string[][]) {
        const cl = this.log.call('loadHeaderParts');
        if (!rest.length) return cl.done('nothing to load');
        const parts = this.dicToArray(rest);
        // #1 pick up id & name
        if (parts.id) this.id = parts.id as string;
        if (parts.name) this.name = parts.name as string;
        // #2 pick up group
        if (typeof parts.group === 'string') {
            this.group = parts.group;
            delete parts.group;
        }
        // #3 position can be number or -number to indicate from other side
        if (typeof parts.pos === 'string' && parts.pos.length > 0) {
            let pos = parts.pos;
            if (pos[0] === '-') {
                this.fromStart = false;
                pos = pos.substring(1);
            }
            if (pos.length) this.pos = parseInt(pos, 10);
            delete parts.pos;
        }
        // #4 icon is automatically kept
        // #5 show override
        if (typeof parts.show === 'string')
            (parts as DictionaryValue).show = parts.show === 'true';
        this.ui = parts;
        return cl.return(this.ui, 'button rules');
    }

    private loadParams(rule: string) {
        const cl = this.log.call('loadParams', rule);
        this.params = this.splitParamsDic(rule);
        cl.data('params', this.params);
        return cl.done();
    }

    private loadHash(rule: string) {
        const cl = this.log.call('loadButton', rule);
        this.hash = this.splitParamsDic(rule);
        cl.data('button', this.hash);
        return cl.done();
    }



    //#region string manipulation helpers

    private splitParamsArray(original: string): string[][] {
        if (!original) return [];
        const split1 = original.split('&');
        const split2 = split1.map((p) => {
            const keyValues = p.split('=');
            const key = keyValues[0];
            let val: any = keyValues[1];
            // check if the value had '=' - then re-join
            if (keyValues.length > 1)
                val = keyValues.slice(1).join('=');

            // fix url encoding
            if (val?.indexOf('%') > -1) val = decodeURIComponent(val);
            // cast C# typed true/false
            if (val === 'True' || val === 'true') val = true;
            if (val === 'False' || val === 'false') val = false;

            // cast numbers to numbers
            val = isNaN(val) ? val : Number(val);
            return [key, val];
        });
        return split2;
    }

    private dicToArray(original: string[][]): Dictionary<string> {
        return original.reduce((map, obj) => {
            map[obj[0]] = obj[1];
            return map;
        }, {} as Dictionary<string>);
    }

    private splitParamsDic(original: string): Dictionary<string> {
        return this.dicToArray(this.splitParamsArray(original));
    }
    //#endregion
}



function safeSplitOriginal(str: string): { key: string, params: string, button: string } | undefined {
    // dev link: https://regex101.com/r/vK4rV7/519
    // inpsired by https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex

    const regex = /^([^\/?#]*)?([^?#]*)(\?([^#]*))?(#(.*))?/i;
    // const str = `+edit&something=other&els=ok?aoeuaoeu=5&aoeuaou=aoeu#but=thi&aouoaeu`;
    const m = regex.exec(str);

    if (m && m !== null)
        return { key: m[1], params: m[4], button: m[6]};
    return undefined;
}
