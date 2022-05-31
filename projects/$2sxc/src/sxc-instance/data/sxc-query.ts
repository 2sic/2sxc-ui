import { SxcInstance } from '..';
import { SxcDataQueryBase } from './sxc-data-query-base';

/**
 * Instance Query Service
 */
export class SxcQuery extends SxcDataQueryBase {

  /**
   * Creates an instance of SxcQuery.
   * @param {SxcInstance} sxc
   * @param {string} name
   * @memberof SxcQuery
   * @internal
   */
  constructor(sxc: SxcInstance, readonly name: string) {
    super(sxc, name, 'Query');
  }

  getAll<T = unknown>(): Promise<T>;
  getAll<T = unknown>(urlParams: string | Record<string, unknown>): Promise<T>;
  getAll<T = unknown>(urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T>;
  /**
   * Retrieve the entire query with all streams
   *
   * @template T
   * @returns {Promise<T>} containing a object with stream-names and items in the streams.
   * @memberof SxcQuery
   */
  getAll<T = unknown>(urlParams?: string | Record<string, unknown>, data?: string | Record<string, unknown>): Promise<T> {
    return this.getInternal<T>(undefined, urlParams, data);
  }

  /**
   * Get just one stream, returning an array of items in that stream
   *
   * @template T
   * @param {string} stream
   * @returns {Promise<T[]>} containing an array of items - or empty if stream not found or nothing returned
   * @memberof SxcQuery
   */
  getStream<T = unknown>(stream: string): Promise<T[]>;
  getStream<T = unknown>(stream: string, urlParams: string | Record<string, unknown>): Promise<T[]>;
  getStream<T = unknown>(stream: string, urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T[]>;
  
  getStream<T = unknown>(stream: string, urlParams?: string | Record<string, unknown>, data?: string | Record<string, unknown>): Promise<T[]> {
    if (stream.indexOf(',') !== -1) throw "parameter 'stream' can only contain one stream name for 'getStream'";
    return this.getInternal<unknown>(stream, urlParams, data).then((data) => {
      if (data == null || !data.hasOwnProperty(stream)) return [];
      return (data as any)[stream] as T[];
    })
  }

  getStreams<T = unknown>(streams: string): Promise<T>;
  getStreams<T = unknown>(streams: string, urlParams: string | Record<string, unknown>): Promise<T>;
  getStreams<T = unknown>(streams: string, urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T>;
  /**
   * Get a query but only the selected streams.
   *
   * @template T
   * @param {string} streams
   * @returns {Promise<T>} containing a object with stream-names and items in the streams.
   * @memberof SxcQuery
   */
  getStreams<T = unknown>(streams: string, urlParams?: string | Record<string, unknown>, data?: string | Record<string, unknown>): Promise<T> {
    return this.getInternal<T>(streams, urlParams, data);
  }

  /**
   * Get all or one data entity from the backend
   * @param id optional id as number or string - if not provided, will get all
   * @param params optional parameters - ATM not usefuly but we plan to support more filters etc. 
   * @returns an array with 1 or n entities in the simple JSON format
   * @internal
   */
  private getInternal<T = unknown>(streams?: string, params?: string | Record<string, any>, data?: string | Record<string, unknown>): Promise<T> {
    let path = "app/auto/query/" + this.name;
    if (streams && (typeof streams === 'string')) path += "?stream=" + streams;
    return this.webApi.fetchJson(this.webApi.url(path, params), data);
  }
}
