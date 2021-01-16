import { NumberNotDefinedHuge } from '../../../../../core';
import { IDs } from '../../../constants/ids';

/**
 * This contains a pointer to a content-block. The data is always provided by the server,
 * so this class is never really instantiated.
 */
export class ContentBlockReference {
  /** How changes are published - draft required/optional */
  public publishingMode: string = IDs.publishAllowed;

  /** ID of the reference item - very rarely used */
  public id: number = NumberNotDefinedHuge;

  /** GUID of the parent item referencing this Content Block */
  public parentGuid: string = null;

  /** Field in which this content block is references */
  public parentField: string = null;

  /** Index of the reference - what position it's in in the list of that field */
  public parentIndex: number = 0;

  /** If this content is part of the page */
  public partOfPage: boolean = false;

  constructor(original: Partial<ContentBlockReference>) {
      Object.assign(this, original);
  }
}
