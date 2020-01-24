import { SxcInstance } from "@2sic.com/2sxc-typings";

// These are the parameters which make up the current context / state of this app.
// It's mainly needed to ensure that the Http Service is correctly set up.

/**
 * The context in which the current app is running.
 * Important to interact with the server
 * or with the DNN around it.
 */
export class ContextInfo {
  
  /**
   * the helper sxc-object to communicate with the server
   */
  sxc: SxcInstance;

  /**
   * If false, does not append any custom headers to DNN requests
   */
  addHttpHeaders: boolean;

  /**
   * Replace app name in path; replaces /app/auto/
  */
  appNameInPath: string;

  /**
   * the edition of the current app - if you are working with polymorph editions
   */
  edition: string;

  /**
   * the edition to be used in the api
   * usually it's the same as the edition, but in same cases you may want to use another edition, especially when developing
   */
  apiEdition: string;
}
