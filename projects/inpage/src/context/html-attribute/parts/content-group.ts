import { ContentAppUnifiedInCtxAndAttr } from '../../parts/context-app';
import { ContentBlockUnifiedInCtxAndAttr } from '../../parts/context-content-block';

/**
 * @internal
 */
export interface AttrJsonContentGroup extends ContentBlockUnifiedInCtxAndAttr, ContentAppUnifiedInCtxAndAttr {
  // ReSharper disable InconsistentNaming
  IsCreated: boolean;
  IsList: boolean;
  TemplateId: number;
  Edition: string;
  TemplatePath: string;
  // /**
  //  * True if the template comes from the shared location - new in v13
  //  * Changed to lower case in v17
  //  */
  // templateIsShared: boolean;

  QueryId: number | null;

  /** new 17.07 */
  queryName: string;
  
  /** new 17.07 */
  queryInfo: string;

  ContentTypeName: string;
  AppUrl: string;
  AppSettingsId: number;
  AppResourcesId: number;
  IsContent: boolean;
  HasContent: boolean;
  SupportsAjax: boolean;
  ZoneId: number;
  AppId: number;
  Guid: string;
  Id: number;
  // ReSharper restore InconsistentNaming

}
