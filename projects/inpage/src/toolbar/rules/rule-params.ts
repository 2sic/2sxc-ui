import { MetadataFor } from '../../commands';
import { Dictionary, DictionaryValue } from '../../plumbing';


// const metadataPrefix = 'for';

export type RuleParams = Dictionary<string> & {
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
