import { MetadataFor } from '../../commands';
import { Log } from '../../logging';
import { Dictionary, DictionaryValue } from '../../plumbing';

const prefillPrefix = 'prefill:';
const prefillLen = prefillPrefix.length;

const metadataPrefix = 'metadata';

export type RuleParams = Dictionary<string> & {
    /** Speciall prefill-list used for any kind of new-action/operation with prefill */
    prefill?: DictionaryValue;
    metadata?: MetadataFor | string;
};

export class RuleParamsHelper {

    static processParams(params: RuleParams, log: Log): RuleParams {
        const prefill = RuleParamsHelper.processPrefill(params, log);
        if (prefill) params.prefill = prefill;
        if (params.metadata) params.metadata = RuleParamsHelper.processMetadata(params.metadata as string, log);
        return params;
    }

    static processMetadata(original: string, log: Log): MetadataFor {
        if (!original) return undefined;
        // just one part, use it as key
        if (original.indexOf(',') === -1) return { key: original };
        const parts = original.split(',').map((p) => p.trim());
        if (parts.length !== 3) {
            console.error(`tried to process metadata and expect 1 or 3 params, but got ${parts.length} - invalid, will ignore`);
            return undefined;
        }
        // part 1 must be a number
        const targetType = +parts[0];
        if (isNaN(targetType)) {
            console.error(`first part should be a number, but got ${targetType} - invalid, will ignore`);
            return undefined;
        }

        // part 2 must be a string with 'string', 'guid' or 'number'
        const keyType = parts[1];
        if (keyType !== 'string' && keyType !== 'guid' && keyType !== 'number') {
            console.error(`the key type should be string, guid or number, but got ${keyType} - invalid, will ignore`);
            return undefined;
        }

        // part 3 is the key
        const key = parts[2];
        if (key === null || key === undefined || key === '') {
            console.error(`expected a key, but got ${key} - invalid, will ignore`);
            return undefined;
        }

        return {
            key: key,
            targetType: targetType,
            keyType: keyType,
        };
    }


    /** Do special processing on all prefill:Field=Value rules */
    static processPrefill(params: RuleParams, log: Log): DictionaryValue {
        const cl = log.call('processPrefill');

        // only load special prefills if we don't already have a prefill
        if (!params) return cl.return(undefined, 'no params');

        const keys = Object.keys(params).filter((k) => k.indexOf(prefillPrefix) === 0);
        if (!keys) return cl.return(undefined, "no speciall 'prefill:' keys");

        const prefill: DictionaryValue = {};
        keys.forEach((k) => {
            let value: any = params[k];
            // 2020-04-02 prefill is a bit flaky - this should fix the common issues
            // fix boolean true must be "true"
            if (value === true || value === false) value = value.toString();
            else {
                // try to detect list of guids
                value = RuleParamsHelper.convertGuidListToArrayOrKeepOriginal(value);
            }
            prefill[k.substring(prefillLen)] = value;
            delete params[k];
        });
        cl.data('settings prefill', prefill);
        return cl.return(prefill);
    }

    // static processMetadata

    private static convertGuidListToArrayOrKeepOriginal(value: string): string | string[] {
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
}
