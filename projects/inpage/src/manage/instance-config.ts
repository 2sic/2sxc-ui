// #CodeChange#2020-03-22#InstanceConfig - believe this is completely unused
// import { ContextBundleButton } from '../context/bundles/context-bundle-button';

// /**
//  * used to build instance config
//  */
// // TODO: 2dm I don't think this is every in use any more - it was used to
// // call showConfig and disabled, but I believe those signatures don't even expect this!
// export class InstanceConfig {
//   portalId: number;
//   tabId: number;
//   moduleId: number;
//   version: string;
//   contentGroupId: string;
//   cbIsEntity: boolean;
//   cbId: number;
//   appPath: string;
//   isList: boolean;

//   static fromContext(contextOfButton: ContextBundleButton): InstanceConfig {
//     const config = new InstanceConfig();
//     config.portalId = contextOfButton.tenant.id;
//     config.tabId = contextOfButton.page.id;
//     config.moduleId = contextOfButton.instance.id;
//     config.version = contextOfButton.instance.sxcVersion;
//     config.contentGroupId = contextOfButton.contentBlock.contentGroupId;
//     config.cbIsEntity = contextOfButton.contentBlock.isEntity;
//     config.cbId = contextOfButton.contentBlock.id;
//     config.appPath = contextOfButton.app.appPath;
//     config.isList = contextOfButton.contentBlock.isList;
//     return config;
//   }
// }
