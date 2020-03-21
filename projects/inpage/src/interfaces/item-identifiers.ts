import { MetadataFor } from '../commands';
import { DictionaryValue } from '../plumbing';

/** Shared properties of all item identifiers */
export interface ItemIdentifierShared {
  // experimental in 10.27 - also allow entity-id in group-id
  EntityId?: number;
  Title?: string;
  Prefill?: DictionaryValue;
}

/** Simple identifier, which is id/type-name */
export interface ItemIdentifierSimple extends ItemIdentifierShared {
  EntityId: number;
  ContentTypeName?: string;
  Metadata?: MetadataFor;
}

/** Group identifier */
export interface ItemInGroup {
  Guid: string;
  Index: number;
  Part?: string;
  Add: boolean;
}


  /** Experimental in 10.27 */
export interface ItemInField extends ItemIdentifierSimple {
  Field?: string;
  Parent?: string;
  Add?: boolean;
}

/** Complex identifier using a group */
export interface ItemIdentifierGroup extends ItemIdentifierShared {
  Group: ItemInGroup;
}

