import { SxcInstance } from "..";
import { SxcWebApi } from "../web-api/sxc-web-api";
import { SxcDataQueryBase } from './sxc-data-query-base';

/**
* Instance Data accessor to get (and in future create/update) data items/entities
*/
export class SxcData<T = unknown> extends SxcDataQueryBase {
  /**
  * Creates an instance of SxcData.
  * @param {SxcInstance} sxc
  * @param {string} name the content-type name
  * @memberof SxcData
  */
  constructor(sxc: SxcInstance, readonly name: string) {
    super(sxc, name, 'ContentType');
  }
    
  /**
  * Get all items of this type.
  */
  getAll(): Promise<T[]> {
    return this.getInternal<T[]>();
  }
  
  /**
  * Get the specific item with the ID. It will return null if not found
  */
  getOne(id: number): Promise<T> | null {
    return this.getInternal<T>(id);
  };

  // Future
  private getMany(criteria: Record<string, unknown>, fields: Array<string>): Promise<T[]> {
    throw 'not implemented - probably v13.5 or something';
  }
  
  
  /**
  * Get all or one data entity from the backend
  * @param id optional id as number or string - if not provided, will get all
  * @param params optional parameters - ATM not usefuly but we plan to support more filters etc. 
  * @returns an array with 1 or n entities in the simple JSON format
  */
  private getInternal<TCall>(id?: string | number, params?: string | Record<string, unknown>): Promise<TCall> {
    let path = "app/auto/content/" + this.name;
    if (id && (typeof id === 'string' || typeof id === 'number')) path += "/" + id;
    return this.webApi.fetchJson(this.webApi.url(path, params));
  }
  
  // TODO: @SPM create
  // - Create a type for the `metadataFor` attribute
  // - implement create
  // - capture various null-cases
  // - if `metadataFor` is specified, add attribute `for` the the object before sending (that should work)

  create(values: Record<string, unknown>): Promise<Record<string, unknown>>;

  create(values: Record<string, unknown>, metadataFor?: any): Promise<Record<string, unknown>> {
    return null;
  }
  
  // TODO: @SPM update
  update(id: number, values: Record<string, unknown>): Promise<Record<string, unknown>> {
      return null;
  }
}
  