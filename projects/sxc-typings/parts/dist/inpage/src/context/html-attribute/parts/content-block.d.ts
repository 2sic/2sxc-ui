/**
 * This contains a pointer to a content-block. The data is always provided by the server,
 * so this class is never really instantiated.
 * @internal
 */
export declare class ContentBlockReference {
    /** How changes are published - draft required/optional */
    publishingMode: string;
    /** ID of the reference item - very rarely used */
    id: number;
    /** GUID of the parent item referencing this Content Block */
    parentGuid: string;
    /** Field in which this content block is references */
    parentField: string;
    /** Index of the reference - what position it's in in the list of that field */
    parentIndex: number;
    /** If this content is part of the page */
    partOfPage: boolean;
    constructor(original: Partial<ContentBlockReference>);
}
