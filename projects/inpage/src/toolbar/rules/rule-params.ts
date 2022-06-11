import { MetadataFor } from '../../../../$2sxc/src/cms';
import { TypeValue } from '../../plumbing';

/**
 * @internal
 */
export type RuleParams = Record<string, string> & {
    /** Speciall prefill-list used for any kind of new-action/operation with prefill */
    contentType?: string;
    entityId?: string | number;

    prefill?: Record<string, TypeValue>;

    filters?: Record<string, TypeValue | Array<unknown>>;

    /** this is how the metadata-param comes in - as a 'for=someId' - this node will be removed afterwards */
    for?: string;

    /** This is the metadata node as it will be used as a real parameter */
    metadata?: MetadataFor;
};
