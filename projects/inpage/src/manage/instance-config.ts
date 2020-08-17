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
  cbId: number;
  appPath: string;
  isList: boolean;

  static fromContext(contextOfButton: ContextComplete): InstanceConfig {
    const config = new InstanceConfig();
    config.portalId = contextOfButton.tenant.id;
    config.tabId = contextOfButton.page.id;
    config.moduleId = contextOfButton.instance.id;
    config.version = contextOfButton.instance.sxcVersion;
    config.contentGroupId = contextOfButton.contentBlock.contentGroupId;
    config.cbId = contextOfButton.contentBlock.id;
    config.appPath = contextOfButton.app.appPath;
    config.isList = contextOfButton.contentBlock.isList;
    return config;
  }
}
