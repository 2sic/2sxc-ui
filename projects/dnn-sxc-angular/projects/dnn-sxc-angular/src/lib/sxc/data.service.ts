import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { routeContent } from '../contants';
import { MetadataFor } from '../../../../../../$2sxc/src/data/metadata-for'

/**
 * A helper to access data from 2sxc
 *
 * @class SxcDataService
 * @template T Type which the system will return
 */
export class SxcDataService<T> {
  constructor(
    private http: HttpClient,
    private contentType: string,
  ) { }

  /**
   * Get all items of this type
   */
  getAll(): Observable<T[]> {
    const url = `${routeContent}/${this.contentType}`;
    return this.http.get<T[]>(url);
  }

  /**
   * get the specific item with the ID
   */
  getOne(id: number): Observable<T> {
    const url = `${routeContent}/${this.contentType}/${id}`;
    return this.http.get<T>(url);
  }

  /**
   * Create new item
   */
  create(item: T): Observable<T>;

  /**
   * Create new item as metadata for something
   */
  create(item: T | any, metadataFor: MetadataFor): Observable<T>;

  /**
   * Internal implementation of create
   */
  create(item: T | any, metadataFor?: MetadataFor): Observable<T> {
    const url = `${routeContent}/${this.contentType}`;
    item = (metadataFor != null ? { ...item, For: metadataFor } : item);
    return this.http.post<T>(url, item);
  }

  /**
   * Update the specific item with the ID to the item
   */
  update(id: number, item: T): Observable<T> {
    const url = `${routeContent}/${this.contentType}/${id}`;
    return this.http.post<T>(url, item);
  }

  /**
   * Delete the specific item with ID/with GUID
   */
  delete(id: number | string): Observable<T> {
    const url = `${routeContent}/${this.contentType}/${id}`;
    return this.http.delete<T>(url);
  }
}
