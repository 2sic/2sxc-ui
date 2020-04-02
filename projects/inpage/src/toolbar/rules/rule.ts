import { Operations as Operators, RuleConstants as RC } from '.';
import { HasLog, Log } from '../../logging';
import { Dictionary, DictionaryValue, TypeValue } from '../../plumbing';
import { TemplateConstants } from '../templates';
import { BuildSteps } from './build-steps';

const prefillPrefix = 'prefill:';
const prefillLen = prefillPrefix.length;

/**
 * Contains a rule how to add/modify a toolbar.
 */
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

    params?: Dictionary<string> & {
        /** Speciall prefill-list used for any kind of new-action/operation with prefill */
        prefill?: DictionaryValue,
    } = {};

    /** Speciall prefill-list used for any kind of new-action/operation with prefill */
    // prefill?: DictionaryValue = {};

    ui: {
        icon?: string,
        class?: string,
        color?: string,
        show?: boolean,
        code?: string,
        title?: string,
        [key: string]: TypeValue,
    } = {};

    /** ATM unused url-part after the hash - will probably be needed in future */
    private hash: Dictionary<string> = {};

    //#endregion

    constructor(public ruleString: string, parentLog: Log) {
        super('Tlb.BdRule', parentLog);
        if (!ruleString) {
            this.log.add('rule is empty');
            return;
        }
        this.load();
    }

    /** Tells if this rule will override the show settings  */
    overrideShow(): boolean | undefined {
        if (this.operator === Operators.remove) return false;
        if (this.operator === Operators.add) return true;
        if (this.operator === Operators.modify && this?.ui?.show !== undefined)
            return this.ui.show;
        return undefined;
    }


    private load() {
        const cl = this.log.call('load', this.ruleString);
        const parts = splitUrlSections(this.ruleString);
        if (!parts.key) return cl.done("no key, won't load");

        this.loadHeader(parts.key);
        if (parts.params)  this.loadParamsAndPrefill(parts.params);
        if (parts.button) this.loadHash(parts.button);
        return cl.done();
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

    private loadParamsAndPrefill(rule: string) {
        const cl = this.log.call('loadParams', rule);
        this.params = this.splitParamsDic(rule);
        cl.data('params', this.params);
        this.params.prefill = this.processPrefill();
        return cl.done();
    }

    private loadHash(rule: string) {
        const cl = this.log.call('loadButton', rule);
        this.hash = this.splitParamsDic(rule);
        cl.data('button', this.hash);
        return cl.done();
    }

    /** Do special processing on all prefill:Field=Value rules */
    private processPrefill(): DictionaryValue {
        const cl = this.log.call('processPrefill');

        // only load special prefills if we don't already have a prefill
        if (!this.params) return cl.return({}, 'no params');

        const keys = Object.keys(this.params).filter((k) => k.indexOf(prefillPrefix) === 0);
        if (!keys) cl.done("no speciall 'prefill:' keys");
        const prefill: DictionaryValue = {};
        keys.forEach((k) => {
            let value: any = this.params[k];
            // 2020-04-02 prefill is a bit flaky - this should fix the common issues
            // fix boolean true must be "true"
            if (value === true || value === false) value = value.toString();
            // fix arrays of GUIDs
            // else if (this.isProbabablyArray(value))
            //     try { value = JSON.parse(value); } catch { /* ignore */ }
            else {
                // try to detect list of guids
                value = this.convertGuidListToArray(value);
            }
            prefill[k.substring(prefillLen)] = value;
            delete this.params[k];
        });
        cl.data('settings prefill', prefill);
        return cl.return(prefill);
    }

    // disabled again, as we don't want to promote this use case / format
    // private isProbabablyArray(value: string) {
    //     // must be string
    //     if (!value || typeof value !== 'string') return false;
    //     // must be surrounded by quotes [...]
    //     if (value.indexOf('[') !== 0 || value.indexOf(']') !== value.length - 1) return false;
    //     // must have 0 or even amount of any quote
    //     if (value.indexOf('"') >= 0 && value.match(/\"/g)?.length % 2 !== 0) return false;
    //     if (value.indexOf("'") >= 0 && value.match(/\'/g)?.length % 2 !== 0) return false;
    //     return true;
    // }

    private convertGuidListToArray(value: string): string | string[] {
        // must be string
        if (!value || typeof value !== 'string') return value;
        // must have a comma to become an array
        if (value.indexOf(',') === -1) return value;
        // shouldn't have any quotes
        if (value.indexOf('"') >= 0 || value.indexOf("'") >= 0) return value;
        const probablyArray = value.split(',').map((g) => g.trim());
        // guid check regex from https://stackoverflow.com/questions/7905929/how-to-test-valid-uuid-guid
        const guidCount = probablyArray
            .filter((g) => g.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i) !== null);
            // .filter((m) => m === true);
        if (guidCount && guidCount.length === probablyArray.length) return probablyArray;
        return value;
    }


    //#region string manipulation helpers

    private dicToArray(original: string[][]): Dictionary<string> {
        return original.reduce((map, obj) => {
            map[obj[0]] = obj[1];
            return map;
        }, {} as Dictionary<string>);
    }

    private splitParamsDic(original: string): Dictionary<string> {
        return this.dicToArray(this.splitParamsArray(original));
    }

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
            if (val === 'True' || val === 'true') return [key, true]; // val = true;
            if (val === 'False' || val === 'false') return [key, false]; // val = false;

            // cast numbers to numbers
            val = isNaN(+val) ? val : Number(val);
            return [key, val];
        });
        return split2;
    }


    //#endregion
}




function splitUrlSections(str: string): { key: string, params: string, button: string } | undefined {
    // dev link: https://regex101.com/r/vK4rV7/519
    // inpsired by https://stackoverflow.com/questions/27745/getting-parts-of-a-url-regex

    const regex = /^([^\/?#]*)?([^?#]*)(\?([^#]*))?(#(.*))?/i;
    // const str = `+edit&something=other&els=ok?aoeuaoeu=5&aoeuaou=aoeu#but=thi&aouoaeu`;
    const m = regex.exec(str);

    if (m && m !== null)
        return { key: m[1], params: m[4], button: m[6]};
    return undefined;
}
