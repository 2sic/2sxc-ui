import { UserOfEditContext } from '../manage/user-of-edit-context';
import { CommandParams } from './params';

export class RunParams {
//   code: a.ny;
//   configureCommand: a.ny;
//   items: a.ny; // string | string[];
//   metadata: MetadataFor;
//   prefill: {[key: string]: a.ny};
  //
  action: string;
//   appId: number;
//   attributeSetName: string;
//   cbId: number;
//   cbIsEntity: boolean;
//   contentGroupId: number;
  contentType: string;
//   contentTypeId: string;
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
