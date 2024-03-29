import { MetadataTargetTypes } from '../data/target-types';

/**
 * Parameters on `metadata` for commands which have a metadata-target. 
 * @public
 */
export interface CommandParamsMetadata {
    /** 
     * The key which identifies the target of this metadata item
     */
    key: string;

    /**
     * the key type, will default to 'string'
     */
    keyType?: string;

    /**
     * The target type, will default to 10 = CMS-Item
     */
    targetType?: MetadataTargetTypes;
}
