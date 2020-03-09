
/** Shared properties of all item identifiers */
export interface ItemIdentifierShared {
  Title?: string;
  Prefill?: any;
}

/** Simple identifier, which is id/type-name */
export interface ItemIdentifierSimple extends ItemIdentifierShared {
  EntityId: number;
  ContentTypeName?: string;
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

