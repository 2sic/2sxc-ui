import { SxcDataServiceBase } from './sxc-data-service-base';
/**
 * Instance Query Service
 */
export declare class SxcQuery extends SxcDataServiceBase {
    readonly name: string;
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
}
