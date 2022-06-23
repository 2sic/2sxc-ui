import { Sxc } from '..';
import { MetadataFor } from '../../data/metadata-for';
import { SxcDataServiceBase } from './sxc-data-service-base';
/**
* Data Service for an App / Sxc-Instance to get/create data of a specific Content-Type
* @public
*/
export declare class SxcData<T = unknown> extends SxcDataServiceBase {
    readonly name: string;
    /**
    * Creates an instance of SxcData.
    * @param {Sxc} sxc
    * @param {string} name the content-type name
    * @memberof SxcData
    * @internal
    */
    constructor(sxc: Sxc, name: string);
    /**
     * Get all items of this type.
     */
    getAll(): Promise<T[]>;
    /**
     * Get the specific item with the ID. It will return null if not found
     */
    getOne(id: number): Promise<T> | null;
    /** Future
     *  @internal
     */
    private getMany;
    /**
     * Get all or one data entity from the backend
     * @param id optional id as number or string - if not provided, will get all
     * @param params optional parameters - ATM not usefuly but we plan to support more filters etc.
     * @returns an array with 1 or n entities in the simple JSON format
     * @internal
     */
    private getInternal;
    /**
     * Create a new entity with the values supplied
     * @param values a simple object containing the values to create
     */
    create(values: Record<string, unknown>): Promise<Record<string, unknown>>;
    /**
     * Create a new entity with the values supplied and also a metadata-for reference
     * @param values a simple object containing the values to create
     */
    create(values: Record<string, unknown>, metadataFor: MetadataFor | string): Promise<Record<string, unknown>>;
    /**
     * Update an existing entity with the values supplied
     */
    update(id: number, values: Record<string, unknown>): Promise<Record<string, unknown>>;
    /**
     * Delete an entity
     * @param id id of the item to delete
     */
    delete(id: number): Promise<null>;
    /**
     * Delete an entity
     * @param guid GUID of the item to delete
     */
    delete(guid: string): Promise<null>;
}
