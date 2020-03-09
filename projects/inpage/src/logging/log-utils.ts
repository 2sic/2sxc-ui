import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';
import { Log } from './log';

/**
 * logDump - to write whole log to console if is enabled
 */
export class LogUtils {
  /**
   * Dump log to console, when debug logging is enabled by url query string parameters
   * @param log
   */
  static logDump(log: Log): void {
    // 'jslog' is additional query string url parameter, to enable log dump (debug=true is required)
    // in the future would support more variations like jslog = toolbar etc.
    const jsLogUrlParam = $2sxc.urlParams.get('jslog');
    //if ($2sxc.debug.load) {
    //  console.log(log.dump());
    //}
    if (jsLogUrlParam) {
      console.log(log.dump());
    }
  }
}
