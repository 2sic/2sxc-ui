/*
  Special custom d.ts file
  this has the definition of the augmented window object, because the api exporter doesn't support this.
*/

import { SxcGlobal } from './docs-public';

export * from "./docs-public";

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