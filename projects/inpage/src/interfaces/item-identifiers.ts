import { MetadataFor } from '../commands/params-metadata-for';
import { DictionaryValue } from '../plumbing';

/** Shared properties of all item identifiers */
export interface ItemIdentifierShared {
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
  Part: string;
  Add: boolean;
}

/** Complex identifier using a group */
export interface ItemIdentifierGroup extends ItemIdentifierShared {
  Group: ItemInGroup;
}

