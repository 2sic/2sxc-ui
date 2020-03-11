import { CommandCode } from './command-code';
import { MetadataFor } from './params-metadata-for';
import { ItemIdentifierSimple, ItemIdentifierGroup } from '../interfaces/item-identifiers';
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
  prefill: {[key: string]: any};

  // 2020-03-11 2dm in this case it seems that it's a string according to the code
  // but I'm simply not sure if this is true...
  customCode?: string;
}
