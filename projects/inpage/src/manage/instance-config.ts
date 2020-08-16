import { ContextComplete } from '../context/bundles/context-bundle-button';

/**
 * used to build instance config
 */
export class InstanceConfig {
  portalId: number;
  tabId: number;
  moduleId: number;
  version: string;
  contentGroupId: string;
  // 2020-08-16 clean-up #2148
//   cbIsEntity: boolean;
  cbId: number;
  appPath: string;
  isList: boolean;

  //constructor(editContext: DataEditContext) {
  //  const ce = editContext.Environment;
  //  const cg = editContext.ContentGroup;
  //  const cb = editContext.ContentBlock;

  //  this.portalId = ce.WebsiteId;
  //  this.tabId = ce.PageId;
  //  this.moduleId = ce.InstanceId;
  //  this.version = ce.SxcVersion;
  //  this.contentGroupId = cg.Guid;
  //  this.cbIsEntity = cb.IsEntity;
  //  this.cbId = cb.Id;
  //  this.appPath = cg.AppUrl;
  //  this.isList = cg.IsList;
  //}

  static fromContext(contextOfButton: ContextComplete): InstanceConfig {
    const config = new InstanceConfig();
    config.portalId = contextOfButton.tenant.id;
    config.tabId = contextOfButton.page.id;
    config.moduleId = contextOfButton.instance.id;
    config.version = contextOfButton.instance.sxcVersion;
    config.contentGroupId = contextOfButton.contentBlock.contentGroupId;
    // 2020-08-16 clean-up #2148
    // config.cbIsEntity = contextOfButton.contentBlock.isEntity;
    config.cbId = contextOfButton.contentBlock.id;
    config.appPath = contextOfButton.app.appPath;
    config.isList = contextOfButton.contentBlock.isList;
    return config;
  }
}
