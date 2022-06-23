/*
  Special custom d.ts file
  this has the definition of the augmented window object, because the api exporter doesn't support this.
*/

import { SxcGlobal } from './index-public-part.d';

export * from "./index-public-part.d";

/**
 * Make sure the code knows that $2sxc exists on window
 */
declare global {
  interface Window {
    /**
     * The global $2sxc object / function to generate Sxc instances
     */
    $2sxc: SxcGlobal;
  }
}