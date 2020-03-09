/**
 * information related to the current contentBlock, incl
 */
export class ContentBlockContext {
  // ContentBlock
  id: number; // the CB ID
  isEntity: boolean;
  showTemplatePicker: boolean;
  versioningRequirements: string;
  parentFieldName: string;
  parentFieldSortOrder: number;
  partOfPage: boolean;
  // ContentGroup
  isCreated: boolean;
  isList: boolean;
  queryId: number;
  templateId: number;
  contentTypeId: string;
  contentGroupId: string;

}
