import { MetadataFor } from '../../commands';
import { Log, LogEntryOptions as LEO } from '../../logging';
import { Dictionary, DictionaryValue } from '../../plumbing';

const prefillPrefix = 'prefill:';
const prefillLen = prefillPrefix.length;

// const metadataPrefix = 'for';

export type RuleParams = Dictionary<string> & {
    /** Speciall prefill-list used for any kind of new-action/operation with prefill */
    contentType?: string;
    entityId?: string | number;
    prefill?: DictionaryValue;
    // this is how the metadata-param comes in - as a 'for=someId'
    for?: string;
    metadata?: MetadataFor;
};

export class RuleParamsHelper {

    static processParams(params: RuleParams, log: Log): RuleParams {
        const cl = log.call('processParams');
        const prefill = RuleParamsHelper.processPrefill(params, log);
        if (prefill) params.prefill = prefill;

        // catch a very common mistake
        if (params.metadata) {
            delete params.metadata;
            cl.add('params had additional metadata - invalid, will remove', null, LEO.error);
        }

        // process metadata
        if (params.for) params.metadata = RuleParamsHelper.processMetadata(params, log);
        return cl.return(params);
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
    private static processPrefill(params: RuleParams, log: Log): DictionaryValue {
        const cl = log.call('processPrefill');

        // only load special prefills if we don't already have a prefill
        if (!params) return cl.return(undefined, 'no params');

        const keys = Object.keys(params).filter((k) => k.indexOf(prefillPrefix) === 0);
        if (!keys || keys.length === 0) return cl.return(undefined, "no speciall 'prefill:' keys");

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
