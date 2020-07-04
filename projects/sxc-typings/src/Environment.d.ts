import { HasLog } from './Log';

declare const _jsApi: JsInfo;

/**
 * Provides environment information to $2sxc - usually page-id, api-root and stuff like that
 */
export interface Environment extends HasLog {
  ready:boolean;
  source: string;


  /**
   * Load a new jsInfo - must be public, as it's used in iframes where jquery is missing
   * @param newJsInfo new info to load
   */
  load(newJsInfo: JsInfo, source?: string): void;

  /**
   *The API endpoint url from the environment
   *
   * @returns {string}
   * @memberof Environment
   */
  api(): string;
 

  /**
   * The current page ID
   *
   * @returns {number}
   * @memberof Environment
   */
  page(): number;

  /**
   * The Request Verification Token
   *
   * @returns {string}
   * @memberof Environment
   */
  rvt(): string ;


}

export interface JsInfo {
  /** Page ID */
  page: number;
  /** Optional API key - optional if set from external, because it's auto derived from root */
  api: string;
  /** Portal root path - used for various things incl. the API root */
  root: string;
  /** Request verification token */
  rvt: string;
}