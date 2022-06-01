import { ContextComplete } from '../context/bundles/context-bundle-button';

/**
 * used to build instance config
 * @internal
 */
export class InstanceConfig {
  // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
  // portalId: number;
  tabId: number;
  moduleId: number;
  version: string;
  contentGroupId: string;
  cbId: number;
  appPath: string;
  isList: boolean;

  static fromContext(contextOfButton: ContextComplete): InstanceConfig {
    const config = new InstanceConfig();
    // 2020-11-28 #cleanup11.11 2dm - not used, disabled - keep till Jan 2021, then remove from backend-json and drop these comments
    // config.portalId = contextOfButton.tenant.id;
    config.tabId = contextOfButton.page.id;
    config.moduleId = contextOfButton.instance.id;
    config.version = contextOfButton.instance.sxcVersion;
    config.contentGroupId = contextOfButton.contentBlock.contentGroupId;
    config.cbId = contextOfButton.contentBlockReference.id;
    config.appPath = contextOfButton.app.appPath;
    config.isList = contextOfButton.contentBlock.isList;
    return config;
  }
}
