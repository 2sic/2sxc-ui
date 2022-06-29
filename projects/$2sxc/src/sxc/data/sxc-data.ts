import { Sxc } from '..';
import { MetadataTargetTypes } from '../../data';
import { MetadataFor } from '../../data/metadata-for';
import { SxcDataServiceBase } from './sxc-data-service-base';

const ContentApiRoot = 'app/auto/data';

/**
* Data Service for an App / Sxc-Instance to get/create data of a specific Content-Type
* @public
*/
export class SxcData<T = unknown> extends SxcDataServiceBase {
  /**
  * Creates an instance of SxcData.
  * @param sxc:
  * @param name: the content-type name
  * @internal
  */
  constructor(sxc: Sxc, readonly name: string) {
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

  /** Future
   *  @internal 
   */
  private getMany(criteria: Record<string, unknown>, fields: Array<string>): Promise<T[]> {
    throw 'not implemented - probably v13.5 or something';
  }


  /**
   * Get all or one data entity from the backend
   * @param id optional id as number or string - if not provided, will get all
   * @param params optional parameters - ATM not usefuly but we plan to support more filters etc. 
   * @returns an array with 1 or n entities in the simple JSON format
   * @internal
   */
  private getInternal<TCall>(id?: string | number, params?: string | Record<string, unknown>): Promise<TCall> {
    let path = `${ContentApiRoot}/${this.name}`;
    if (id && (typeof id === 'string' || typeof id === 'number')) path += "/" + id;
    return this.webApi.fetchJson(this.webApi.url(path, params));
  }

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

  /** @internal */
  create(values: Record<string, unknown>, metadataFor?: MetadataFor | string): Promise<Record<string, unknown>> {
    const path = `${ContentApiRoot}/${this.name}`;
    if (metadataFor != null) {
      if (typeof(metadataFor) === 'string')
        metadataFor = { Target: MetadataTargetTypes.Entity, Guid: metadataFor } as MetadataFor;
      try {
        values.For = metadataFor;
      } catch { }
    }
    return this.webApi.fetchJson(this.webApi.url(path), values, 'POST');
  }

  /**
   * Update an existing entity with the values supplied
   */
  update(id: number, values: Record<string, unknown>): Promise<Record<string, unknown>> {
    const path = `${ContentApiRoot}/${this.name}/${id}`;
    return this.webApi.fetchJson(this.webApi.url(path), values, 'POST');
  }

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

  /** @internal */
  delete(idOrGuid: number | string): Promise<null> {
    const path = `${ContentApiRoot}/${this.name}/${idOrGuid}`;
    return this.webApi.fetchRaw(this.webApi.url(path), undefined, 'DELETE').then(response => null);
  }
}

