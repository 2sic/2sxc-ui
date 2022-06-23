import { CommandParamsMetadata } from '.';
import { TypeValue } from '../../../inpage/src/plumbing';
/**
 * Shared properties of all item identifiers
 * @internal
 */
interface ItemIdentifierShared {
    EntityId?: number;
    Prefill?: Record<string, TypeValue>;
}
/**
 * Simple identifier, which is id/type-name
 * @internal
 */
export interface ItemIdentifierSimple {
    EntityId: number;
    ContentTypeName?: string;
    Metadata?: CommandParamsMetadata;
    Prefill?: Record<string, TypeValue>;
}
/**
 * Simple identifier, which is id/type-name
 * @internal
 * WAIT with publishing, we'll probably change the duplicate-entity to a bool instead of an id
 */
export interface ItemIdentifierCopy extends ItemIdentifierShared {
    DuplicateEntity: number;
    ContentTypeName?: string;
}
/**
 * Group identifier
 * @internal
 * TODO: KEEP INTERNAL, PROBABLY RENAME "Part" to "Field" or something in the whole chain
 * TODO: MAY BE replaced completely with ItemIdentifierInField, as it has the same purpose
 */
export interface ItemIdentifierParent {
    /** The parent entity GUID - in these cases usually the ContentBlock */
    Guid: string;
    /** The part of the parent it's in, kind of the "Field" - should be renamed to Field ASAP */
    Part?: string;
    /** The index position within that field/part */
    Index: number;
    /** Whether to add the item - alternative is just to leave it, if it already existed */
    Add: boolean;
}
/**
 * Experimental in 10.27
 * @internal
 */
export interface ItemIdentifierInField extends ItemIdentifierSimple {
    Parent?: string;
    Field?: string;
    Add?: boolean;
}
/**
 * Template Identifier for telling the code-editor about this template
 * @internal
 */
export interface TemplateIdentifier {
    /** The entity Id of the View-configuration which points to the template file */
    EntityId: number;
    /** The template edition (kind of a path) - to ensure code-editor can find the right one */
    Edition?: string;
    /** The template path */
    Path?: string;
}
/**
 * Complex identifier using a group
 * @internal
 */
export interface ItemIdentifierGroup extends ItemIdentifierShared {
    Group: ItemIdentifierParent;
}
export {};
