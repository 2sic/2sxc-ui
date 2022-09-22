import { CommandParamsMetadata } from '.';
import { TypeValue } from '../../../inpage/src/plumbing';

// NOTE: THESE ITEM IDENTIFIERS SHOULD PROBABLY ALWAYS REMAIN INTERNAL
// As we need the flexibility to change them, without breaking public APIs

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
export interface ItemIdentifierInList extends ItemIdentifierShared {
  /** Whether to add the item - alternative is just to leave it, if it already existed */
  Add: boolean;

  /** The index position within that field/part */
  Index: number;

  Parent: string;
  Field: string;
}

