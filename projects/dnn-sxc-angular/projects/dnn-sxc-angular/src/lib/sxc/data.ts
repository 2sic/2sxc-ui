import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { routeContent } from '../contants';

/**
 * A helper to access data from 2sxc
 *
 * @class Data
 * @template T Type which the system will return
 */
export class Data<T> {
  constructor(
    private http: HttpClient,
    private contentType: string,
  ) { }

  /**
   * Get all items of this type
   */
  getAll(): Observable<T[]> {
    let url = `${routeContent}/${this.contentType}`;
    return this.http.get<T[]>(url);
  }

  /**
   * get the specific item with the ID
   */
  getOne(id: number): Observable<T> {
    let url = `${routeContent}/${this.contentType}/${id}`;
    return this.http.get<T[]>(url);
  }

  /**
   * Create new item
   */
  create(item: T): Observable<T> {
    let url = `${routeContent}/${this.contentType}`;
    return this.http.post<T>(url, item);
  }

  /**
   * Update the specific item with the ID to the item
   */
  update(id: number, item: T): Observable<T> {
    let url = `${routeContent}/${this.contentType}/${id}`;
    return this.http.put<T>(url, item);
  }

  /**
   * Delete the specific item with the ID
   */
  delete(id: number): Observable<T>;

  /**
  * Delete the specific item with the GUID
  */
  delete(id: string): Observable<T>;

  /**
  * internal implementation with ID/with GUID
  */
  delete(id: number | string): Observable<T[]> | Observable<T> {
    let url = `${routeContent}/${this.contentType}/${id}`;
    if (typeof(id) == 'string') {
      throw new Error('not implemented yet');
    }

    return this.http.delete<T>(url);
  }
}
