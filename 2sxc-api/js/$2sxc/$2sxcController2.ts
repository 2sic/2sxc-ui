import { Environment } from '../environment/Environment';
import { SxcHttp } from '../http/SxcHttp';
import { Log } from '../tools/Log';

// /**
//  * New interface for API V2 Root Controller
//  */
// export interface SxcController2 {
//     /**
//      * Environment information
//      * @type {Environment}
//      */
//     env: Environment;

//     /**
//      * Http helper for API calls and such
//      */
//     http: SxcHttp;

//     /**
//      * Internal logger to better see what's happening
//      */
//     log: Log;
// }

// export function getApi2Root() : SxcController2 {
//     var env = new Environment();
//     return {
//         env: env,
//         http: new SxcHttp(env),
//         log: new Log('$2sxc', 'building'),
//     };
// }