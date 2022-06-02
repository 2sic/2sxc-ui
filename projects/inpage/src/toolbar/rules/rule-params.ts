import { MetadataFor } from '../../commands';
import { DictionaryValue } from '../../plumbing';

/**
 * @internal
 */
export type RuleParams = Record<string, string> & {
    /** Speciall prefill-list used for any kind of new-action/operation with prefill */
    contentType?: string;
    entityId?: string | number;

    prefill?: DictionaryValue;

    filters?: DictionaryValue;

    /** this is how the metadata-param comes in - as a 'for=someId' - this node will be removed afterwards */
    for?: string;

    /** This is the metadata node as it will be used as a real parameter */
    metadata?: MetadataFor;
};
