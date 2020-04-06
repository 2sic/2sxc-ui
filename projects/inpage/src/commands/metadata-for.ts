
/**
 * This is attached as json for various dialogs
 * which will edit/create items and assign them as metadata for something
 * @export
 * @interface MetadataFor
 */
export interface MetadataFor {
    /** The key which identifies the target of this metadata item */
    key: string;

    /** the key type, will default to 'string' */
    keyType?: string;

    /** The target type, will default to 10 = CMS-Item */
    targetType?: number;
}
