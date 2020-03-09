import { ContextOfButton } from '../context/context-of-button';
import { DataEditContext } from '../data-edit-context/data-edit-context';

/**
 * used to build instance config
 */
export class InstanceConfig {
  portalId: number;
  tabId: number;
  moduleId: number;
  version: string;
  contentGroupId: string;
  cbIsEntity: boolean;
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

  static fromContext(contextOfButton: ContextOfButton): InstanceConfig {
    const config = new InstanceConfig();
    config.portalId = contextOfButton.tenant.id;
    config.tabId = contextOfButton.page.id;
    config.moduleId = contextOfButton.instance.id;
    config.version = contextOfButton.instance.sxcVersion;
    config.contentGroupId = contextOfButton.contentBlock.contentGroupId;
    config.cbIsEntity = contextOfButton.contentBlock.isEntity;
    config.cbId = contextOfButton.contentBlock.id;
    config.appPath = contextOfButton.app.appPath;
    config.isList = contextOfButton.contentBlock.isList;
    return config;
  }
}
