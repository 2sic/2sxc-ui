// import { ToolUrlObjects } from './tools/obj2url';

/* 
    This is just a type-index entry point.
    The purpose is that other 2sxc projects in this repo can access all the types
    in this project from here, without having to know the exact code files

    Note that the order of things in this file can cause trouble
    As webpack needs the order to be correct, meaning some dependencies need to be early
*/

// early things without dependencies, which may be needed by others
export * from './_/window';

// export * from './data';
export * from './data/target-types';
export * from './data/metadata-for';

// export * from './tools';
export * from './tools/url-params';
export * from './tools/total-popup';
export * from './constants';
export * from './Stats';

// export * from './environment';
export * from './environment/environment-specs';
export * from './environment/sxc-global-environment';
export * from './environment/env-loader-meta'

// export * from './cms';
export * from './cms/command-params';
export * from './cms/command-names';
export * from './cms/item-identifiers';
export * from './cms/command-params-metadata';
export * from './cms/run-params';

// export * from './sxc';
export * from './sxc/sxc';
export * from './sxc/sxc-manage';
export * from './sxc/web-api/sxc-web-api';
export * from './sxc/web-api/ajax-promise';
export * from './sxc/web-api/ajax-settings';
export * from './sxc/sxc-cms'
export * from './sxc/data/sxc-data'
export * from './sxc/data/sxc-query'
export * from './sxc/web-api/sxc-web-api-deprecated'
export * from './sxc/data/sxc-data-service-base'
export * from './sxc/sxc-part'

// export * from './sxc-global';
export * from './sxc-global/context-identifier';
export * from './sxc-global/sxc-global';
export * from './sxc-global/sxc-global-debug';
export * from './sxc-global/sxc-global-bootstrap';
export * from './sxc-global/sxc-global-manage';
export * from './sxc-global/sxc-global-http'
