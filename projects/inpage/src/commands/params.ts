import { ItemIdentifierGroup, ItemIdentifierSimple } from '../interfaces/item-identifiers';
import { DictionaryValue } from '../plumbing/TypeTbD';
import { MetadataFor } from './params-metadata-for';
export class CommandParams {
  items?: Array<ItemIdentifierSimple | ItemIdentifierGroup>; // string | string[];
  mode?: string;

  // both contentType and contentTypeName were used historically, so both variations may exist in Razor templaets
  contentType: string;
  contentTypeName?: string;

  pipelineId?: number;
  filters?: string;
  dialog?: string;
  sortOrder: number;
  entityId: number;
  entityGuid: string;
  entityTitle?: string;
  useModuleList: boolean;
  metadata: MetadataFor;

  isPublished: boolean;
  prefill: DictionaryValue;

  // 2020-03-11 2dm in this case it seems that it's a string according to the code
  // but I'm simply not sure if this is true...
  customCode?: string;
}
