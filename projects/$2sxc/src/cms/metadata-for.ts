
/**
 * This is attached as json for various dialogs
 * which will edit/create items and assign them as metadata for something
 * @export
 * @internal
 * TODO: NAMING NOT CLEAR, AND IT CAN ONLY HOLD ONE key, so we must consider deprecating this / moving away
 */
export interface MetadataForBasic {
    /** The key which identifies the target of this metadata item */
    key: string;

    /** the key type, will default to 'string' */
    keyType?: string;

    /** The target type, will default to 10 = CMS-Item */
    targetType?: number;
}
