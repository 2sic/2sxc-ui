import { MetadataFor } from '.';
import { TypeValue } from '../../../inpage/src/plumbing';

/**
 * Shared properties of all item identifiers
 * @internal
 */
export interface ItemIdentifierShared {
  EntityId?: number;
  Prefill?: Record<string, TypeValue>;
}

/**
 * Simple identifier, which is id/type-name
 * @internal
 */
export interface ItemIdentifierSimple extends ItemIdentifierShared {
  EntityId: number;
  ContentTypeName?: string;
  Metadata?: MetadataFor;
}

/**
 * Simple identifier, which is id/type-name
 * @internal
 */
export interface ItemIdentifierCopy extends ItemIdentifierShared {
  DuplicateEntity: number;
  ContentTypeName?: string;
}

/**
 * Group identifier
 * @internal
 */
export interface ItemInGroup {
  Guid: string;
  Index: number;
  Part?: string;
  Add: boolean;
}

/**
 * Experimental in 10.27
 * @internal
 */
export interface ItemInField extends ItemIdentifierSimple {
  Field?: string;
  Parent?: string;
  Add?: boolean;
}

/**
 * Template Identifier for telling the code-editor about this template
 * @internal
 */
export interface TemplateIdentifier extends ItemIdentifierShared {
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
  Group: ItemInGroup;
}
