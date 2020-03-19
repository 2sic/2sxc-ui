import { ContextBundleButton } from '../context/bundles/context-bundle-button';

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

  static fromContext(contextOfButton: ContextBundleButton): InstanceConfig {
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
