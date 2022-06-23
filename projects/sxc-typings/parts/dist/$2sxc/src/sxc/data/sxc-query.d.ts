import { Sxc } from '..';
import { SxcDataServiceBase } from './sxc-data-service-base';
/**
 * Instance Query Service
 * @public
 */
export declare class SxcQuery extends SxcDataServiceBase {
    readonly name: string;
    /**
     * Creates an instance of SxcQuery.
     * @param {Sxc} sxc
     * @param {string} name
     * @memberof SxcQuery
     * @internal
     */
    constructor(sxc: Sxc, name: string);
    getAll<T = unknown>(): Promise<T>;
    getAll<T = unknown>(urlParams: string | Record<string, unknown>): Promise<T>;
    getAll<T = unknown>(urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T>;
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
    getStreams<T = unknown>(streams: string): Promise<T>;
    getStreams<T = unknown>(streams: string, urlParams: string | Record<string, unknown>): Promise<T>;
    getStreams<T = unknown>(streams: string, urlParams: string | Record<string, unknown>, data: string | Record<string, unknown>): Promise<T>;
    /**
     * Get all or one data entity from the backend
     * @param id optional id as number or string - if not provided, will get all
     * @param params optional parameters - ATM not usefuly but we plan to support more filters etc.
     * @returns an array with 1 or n entities in the simple JSON format
     * @internal
     */
    private getInternal;
}
