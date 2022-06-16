import { ToolUrlObjects } from './tools/obj2url';
/* 
    This is just a type-index entry point.
    The purpose is that other 2sxc projects in this repo can access all the types
    in this project from here, without having to know the exact code files

    Note that the order of things in this file can cause trouble
    As webpack needs the order to be correct, meaning some depedencies need to be early
*/

// early things without dependencies, which may be needed by others
export * from './_/window';
export * from './data';
export * from './tools';
export * from './constants';
export * from './Stats';

export * from './environment';

export * from './sxc';

export * from './sxc-global';

(window as any).beta = new ToolUrlObjects();