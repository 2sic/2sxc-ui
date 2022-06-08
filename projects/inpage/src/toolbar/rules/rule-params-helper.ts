import { RuleParams } from '.';
import { MetadataFor } from '../../commands';
import { Log, LogEntryOptions as LEO } from '../../logging';
import { DictionaryValue, TypeValue } from '../../plumbing';

const prefillPrefix = 'prefill:';
const filterPrefix = 'filter:';
const contextPrefix = 'context:';

/**
 * @internal
 */
export interface ProcessedParams { params: RuleParams; context: Record<string, TypeValue>; }

/**
 * @internal
 */
export class RuleParamsHelper {

    static processParams(params: RuleParams, log: Log): ProcessedParams {
        const cl = log.call('processParams');
        const prefill = RuleParamsHelper.extractSubKeys(params, prefillPrefix, log);
        if (prefill) params.prefill = prefill;

        const filters = RuleParamsHelper.extractSubKeys(params, filterPrefix, log);
        if (filters) params.filters = filters;

        const context = RuleParamsHelper.extractSubKeys(params, contextPrefix, log);

        // catch a very common mistake in metadata
        if (params.metadata) {
            delete params.metadata;
            cl.add("params had additional metadata - invalid, will remove. Use 'for' instead", null, LEO.error);
        }

        // process metadata
        if (params.for) params.metadata = RuleParamsHelper.processMetadata(params, log);
        return cl.return({ params, context });
    }

    private static processMetadata(params: RuleParams, log: Log): MetadataFor {
        const cl = log.call('processMetadata');

        // get the for-target and if exists, delete from params
        const mdFor = params.for;
        if (!mdFor) return cl.return(undefined, 'no metadata');
        delete params.for;

        // just one part, use it as key
        if (mdFor.indexOf(',') === -1) return cl.return({ key: mdFor }, 'only has key');
        const parts = mdFor.split(',').map((p) => p.trim());
        if (parts.length !== 3)
            return cl.return(undefined, `error: metadata-for parts count expected 3: ${parts.length}`, LEO.error);

        // part 1 must be a number
        const targetType = +parts[0];
        if (isNaN(targetType))
            return cl.return(undefined, `error: first key part is not number - got ${targetType}`, LEO.error);

        // part 2 must be a string with 'string', 'guid' or 'number'
        const keyType = parts[1];
        if (keyType !== 'string' && keyType !== 'guid' && keyType !== 'number')
            return cl.return(undefined, `error: key is not known type, should be string, guid or number, but got ${keyType}`, LEO.error);

        // part 3 is the key
        const key = parts[2];
        if (key === null || key === undefined || key === '')
            return cl.return(undefined, `error: key strange value: '${key}'`, LEO.error);

        // todo: warn if no metadata or id!
        if (!params.contentType || params.entityId == null)
            return cl.return(undefined, 'error: contentType and entityId missing', LEO.error);

        return cl.return({
            key: key,
            targetType: targetType,
            keyType: keyType,
        });
    }


    /** Do special processing on all prefill:Field=Value rules */
    private static extractSubKeys(params: RuleParams, prefix: string, log: Log): Record<string, TypeValue> {
        const cl = log.call('processSubMultiKeys');

        // only load special prefills if we don't already have a prefill
        if (!params) return cl.return(undefined, 'no params');

        const keys = Object.keys(params).filter((k) => k.indexOf(prefix) === 0);
        if (!keys || keys.length === 0) return cl.return(undefined, `no speciall '${prefix}' keys`);

        const prefixLen = prefix.length;
        const list: DictionaryValue = {};
        keys.forEach((k) => {
            let value: unknown = params[k];
            // 2020-04-02 prefill is a bit flaky - this should fix the common issues
            // fix boolean true must be "true"
            if (value === true || value === false) value = value.toString();
            // filter:[] is a special case - it's an array of IDs
            else if (prefix === filterPrefix) value = RuleParamsHelper.filterValues(value as string);
            // prefill: try to detect list of guids
            else if (prefix === prefillPrefix) value = RuleParamsHelper.prefillValues(value as string);

            list[k.substring(prefixLen)] = value as TypeValue;
            delete params[k];
        });
        return cl.return(list, 'got list of multi-keys');
    }

    private static filterValues(value: string): string | Array<unknown> {
        if (typeof value === 'string' && value.length > 0 && value[0] === '[' && value[value.length - 1] === ']') {
            try {
                const array = JSON.parse(value) as Array<unknown>;
                return array;
            } catch {
                console.warn(`filter:[] value is not a valid JSON array: ${value}`);
            }
        }
        return value;
    }

    /**
     * Process Prefill values - basically check if it's an array of GUIDs and convert to that
     * @param value 
     * @returns 
     */
    private static prefillValues(value: string): string | string[] {
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
