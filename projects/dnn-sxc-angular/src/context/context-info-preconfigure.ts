import { ContextInfo} from './context-info'

// These are the parameters which make up the current context / state of this app.
// It's mainly needed to ensure that the Http Service is correctly set up.

/**
 * The context in which the current app is running.
 * Important to interact with the server
 * or with the DNN around it.
 */
export interface ContextInfoPreconfigure extends ContextInfo {

  /**
   * The id of the current module
   */
  moduleId: number;

  /**
   * The content block id of the current block
   */
  contentBlockId: number;
}
