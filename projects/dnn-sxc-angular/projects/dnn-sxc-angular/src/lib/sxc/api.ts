import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { routeApi } from '../contants';

/**
 * Quickly call WebApis on the current App
 *
 * @export
 * @class Api
 */
export class Api {
  constructor(
    private http: HttpClient,
    private controller: string
  ) {  }

  /**
   * Do a GET request to the specified 2sxc api controller
   */
  fetch<T>(url: string): Observable<T>;

  /**
   * Do a POST request to the specified 2sxc api controller with the specified body
   */
  fetch<T>(url: string, body: T): Observable<T>;

  /**
   * Do a request to the specified 2sxc api controller method with the specified body
   */
  fetch<T>(url: string, body: T, method: string): Observable<T>;

  /**
   * Internal implementation of fetch
   */
  fetch<T>(url: string, body: T = null, method: string = null, params?: HttpParams): Observable<T[]> | Observable<T> {
    const fullUrl = `${routeApi}/${this.controller}/${url}`;

    if (body && !method || body && method.toLocaleLowerCase() === 'post') {
      return this.http.post<T>(fullUrl, body, { params });
    }

    if (body && method.toLocaleLowerCase() === 'put') {
      return this.http.put<T>(fullUrl, body, { params });
    }

    if (body && method.toLocaleLowerCase() === 'delete') {
      return this.http.delete<T>(fullUrl, { params });
    }

    return this.http.get<T>(fullUrl, { params });
  }

  url(url: string): string {
    return `${routeApi}/${this.controller}/${url}`;
  }

}
