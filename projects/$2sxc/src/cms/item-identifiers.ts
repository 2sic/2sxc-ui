import { TypeValue } from '../../../inpage/src/plumbing';
import { CommandParamsMetadata } from './command-params-metadata';

// NOTE: THESE ITEM IDENTIFIERS SHOULD PROBABLY ALWAYS REMAIN INTERNAL
// As we need the flexibility to change them, without breaking public APIs

/**
 * Shared properties of all item identifiers
 * @internal
 */
interface ItemIdentifierShared {
  EntityId?: number;
  Prefill?: Record<string, TypeValue>;

  /** New 16.01 - fields to show/hide in the edit-dialog */
  UiFields?: string;

  /** New 16.02 - parameters should be independent from prefill */
  Parameters?: Record<string, TypeValue>;

}

/**
 * Simple identifier, which is id/type-name
 * @internal
 */
export interface ItemIdentifierSimple extends Omit<ItemIdentifierShared, "EntityId"> {
  EntityId: number;
  ContentTypeName?: string;
  Metadata?: CommandParamsMetadata;
  // Prefill?: Record<string, TypeValue>;
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

  /** The parent/group we're referencing */
  Parent: string;

  /** The field which contains the item we're referencing */
  Field: string;
}

/**
 * Any identifier, which can be any of the above
 * @internal
 */
export type AnyIdentifier = (
  | ItemIdentifierSimple
  | ItemIdentifierCopy
  | ItemIdentifierInList
  | TemplateIdentifier
);

/**
 * The parameters for the item-url
 * @internal
 */
export interface ItemUrlParameters {
  prefill?: Record<string, TypeValue>;
  items?: string;
  contentTypeName?: string;
  filters?: string;
}