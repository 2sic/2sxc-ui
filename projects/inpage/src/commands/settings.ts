﻿import { UserOfEditContext } from '../manage/user-of-edit-context';
import { CommandParams } from './params';
import { MetadataFor } from './params-metadata-for';

export class Settings {
  code: any;
  configureCommand: any;
  items: any; // string | string[];
  metadata: MetadataFor;
  prefill: {[key: string]: any};
  //
  action: string;
  appId: number;
  attributeSetName: string;
  cbId: number;
  cbIsEntity: boolean;
  contentGroupId: number;
  contentType: string;
  contentTypeId: string;
  customCode: string;
  dialog: string;
  entityGuid: string;
  entityId: number;
  entityTitle: string;
  filters: string;
  fullScreen: boolean;
  hasContent: boolean;
  inlineWindow: boolean;
  isContent: boolean;
  isList: boolean;
  isPublished: boolean;
  newWindow: boolean;
  params: CommandParams;
  partOfPage: boolean;
  sortOrder: number;
  supportsAjax: boolean;
  templateChooserVisible: boolean;
  templateId: number;
  useModuleList: boolean;
  user: UserOfEditContext;
  //
  name: string;
}
