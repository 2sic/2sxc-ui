/**
 * Options for fetch requests.
 * Typically to customize encryption behavior (new v18.05)
 */
export interface FetchOptions {
  method?: string;

  /**
   * Encrypt the request.
   * As of v18.05 it will only cover the body, but in future
   * it could also cover url parameters and maybe headers.
   */
  encrypt?: boolean | 'auto' | 'force'; // true / false / 'auto' (default) / 'force'

  /**
   * Encrypt the body of the request.
   */
  encryptBody?: boolean | 'auto' | 'force'; // true / false / 'auto' (default) / 'force'

  /**
   * Note: make this an undocumented feature.
   * Naming is not final, but we won't do anything ATM.
   * Developer should use error handling
   * @internal
   */
  encryptShowErrorToUser?: boolean;
}
