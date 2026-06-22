import { NumberNotDefinedHuge } from '../../../../../core';
import { IDs } from '../../../constants/ids';

/**
 * This contains a pointer to a content-block. The data is always provided by the server,
 * so this class is never really instantiated.
 * @internal
 */
export interface ContentBlockReference {
  /** How changes are published - draft required/optional */
  publishingMode: string;

  /** ID of the reference item - very rarely used */
  id: number;

  /** GUID of the parent item referencing this Content Block */
  parentGuid: string | null;

  /** Field in which this content block is references */
  parentField: string | null;

  /** Index of the reference - what position it's in in the list of that field */
  parentIndex: number;

  /** If this content is part of the page */
  partOfPage: boolean;

  // constructor(original: Partial<ContentBlockReference>) {
  //     Object.assign(this, original);
  // }
}

// 2026-06-20 2dm: minor warning: since we don't spread the original object
// there is a small risk that some properties will be missing
export function createContentBlockReference(original: Partial<ContentBlockReference>): ContentBlockReference {
  return {
    publishingMode: original?.publishingMode ?? IDs.publishAllowed,
    id: original?.id ?? NumberNotDefinedHuge,
    parentGuid: original?.parentGuid ?? null,
    parentField: original?.parentField ?? null,
    parentIndex: original?.parentIndex ?? 0,
    partOfPage: original?.partOfPage ?? false
  } satisfies ContentBlockReference;
}