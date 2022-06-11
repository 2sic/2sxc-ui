import { SxcPart } from './sxc-part';

/**
 * This is in charge of sxc.cms on the instance level.
 * ATM it just has the run command.
 * In future, it may also have dedicated command like `layout` etc.
 * @internal
 */
export class SxcCms extends SxcPart {
  /**
   * Run a command on this sxc-instance. 
   * Requires the Cms parts to be loaded. 
   * @param runParams - real type is actually RunParams
   */
  run<T>(runParams: unknown): Promise<void | T> { 
    throw 'sxc instance cms.run() requires cms features "2sxc.JsCms" to be enabled to work';
  }
}