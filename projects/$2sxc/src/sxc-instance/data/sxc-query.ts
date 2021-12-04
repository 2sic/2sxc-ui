import { SxcInstance } from "..";
import { SxcDataQueryBase } from './sxc-data-query-base';

/**
 * Instance Query accessor
 */
export class SxcQuery extends SxcDataQueryBase {
  
  constructor(sxc: SxcInstance, readonly name: string) {
    super(sxc, name, 'Query');
  }

  /**
   * Retrieve the entire query with all streams
   *
   * @template T
   * @returns {Promise<T>} containing a object with stream-names and items in the streams.
   * @memberof SxcQuery
   */
  getAll<T = unknown>(): Promise<T> {
    return this.getInternal<T>();
  }

  /**
   * Get just one stream, returning an array of items in that stream
   *
   * @template T
   * @param {string} stream
   * @returns {Promise<T[]>} containing an array of items - or empty if stream not found or nothing returned
   * @memberof SxcQuery
   */
  getStream<T = unknown>(stream: string): Promise<T[]> {
    if (stream.indexOf(',') !== -1) throw "parameter 'stream' can only contain one stream name for 'getStream'";
    return this.getInternal<unknown>(stream).then((data) => {
      if (data == null || !data.hasOwnProperty(stream)) return [];
      return (data as any)[stream] as T[];
    })
  }

  /**
   * Get a query but only the selected streams.
   *
   * @template T
   * @param {string} streams
   * @returns {Promise<T>} containing a object with stream-names and items in the streams.
   * @memberof SxcQuery
   */
  getStreams<T = unknown>(streams: string): Promise<T> {
    return this.getInternal<T>(streams);
  }

  /**
   * Get all or one data entity from the backend
   * @param id optional id as number or string - if not provided, will get all
   * @param params optional parameters - ATM not usefuly but we plan to support more filters etc. 
   * @returns an array with 1 or n entities in the simple JSON format
   */
  private getInternal<T = unknown>(streams?: string, params?: string | Record<string, any>): Promise<T> {
    let path = "app/auto/query/" + this.name;
    if (streams && (typeof streams === 'string')) path += "?stream=" + streams;
    return this.webApi.fetchJson(this.webApi.url(path, params));
  }
}
