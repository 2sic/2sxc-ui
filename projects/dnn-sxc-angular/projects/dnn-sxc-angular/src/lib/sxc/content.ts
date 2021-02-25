import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { routeContent } from '../contants';

/**
 * A helper to access content from 2sxc
 *
 * @class Content
 * @template T Type which the system will return
 */
export class Content<T> {
  constructor(
    private http: HttpClient,
    private contentType: string,
  ) { }

  /**
   * Get all items of this type
   */
  get(): Observable<T[]>;

  /**
   * get the specific item with the ID
   */
  get(id: number): Observable<T>;

  /**
   * internal implementation with/without ID
   */
  get(id: number = null): Observable<T[]> | Observable<T> {
    let url = `${routeContent}/${this.contentType}`;
    if (id) {
      url += `/${id}`;
      return this.http.get<T>(url);
    }

    return this.http.get<T[]>(url);
  }

  /**
   * This method doesn't exist yet - maybe one day we'll enhance for creating data-items
   */
  post(): Observable<T> {
    throw new Error('not implemented yet');
  }
}
