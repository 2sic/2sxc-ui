/* 
    This is just a type-index entry point.
    The purpose is that other 2sxc projects in this repo can access all the types
    in this project from here, without having to know the exact code files

    Note that the order of things in this file can cause trouble
    As webpack needs the order to be correct, meaning some depedencies need to be early
*/

// core library stuff
export * from '../../core';


// early things without dependencies, which may be needed by others
export * from './_/window';
export * from './tools/total-popup';
export * from './tools/url-param-manager';

// must be pretty early, because most objects rely on this
// and ATM having this on top changes the load order
// this is a side-effect-problem from not clearly using modules
// export * from './logging';


export * from './environment/root-environment';
export * from './environment/js-info';

export * from './http/sxc-http';
export * from './sxc-instance';


export * from './sxc-root/debug';
export * from './sxc-root/sxc-root';
export * from './sxc-root/sxc-root-builder';
export * from './sxc-root/sxc-root-internals';

export * from './sxc-instance/sxc-instance-manage';