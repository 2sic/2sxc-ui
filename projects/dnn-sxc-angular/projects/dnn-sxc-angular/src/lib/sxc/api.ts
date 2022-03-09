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
  // fetch<T>(url: string): Observable<T>;

  /**
   * Do a POST request to the specified 2sxc api controller with the specified body
   */
  // fetch<T>(url: string, body: T): Observable<T>;

  /**
   * Do a request to the specified 2sxc api controller method with the specified body
   */
  // fetch<T>(url: string, body: T, verb: string): Observable<T>;

  /**
   * Internal implementation of fetch
   */
  // fetch<T>(method: string, body: T = null, verb: string = null, params?: HttpParams): Observable<T[]> | Observable<T> {
  //   const fullUrl = `${routeApi}/${this.controller}/${method}`;

  //   if (body && !verb || body && verb.toLocaleLowerCase() === 'post')
  //     return this.http.post<T>(fullUrl, body, { params });

  //   if (body && verb.toLocaleLowerCase() === 'put')
  //     return this.http.put<T>(fullUrl, body, { params });

  //   if (body && verb.toLocaleLowerCase() === 'delete')
  //     return this.http.delete<T>(fullUrl, { params });

  //   return this.http.get<T>(fullUrl, { params });
  // }



  /**
   * Get the request URL of the api
   */
  url(method: string): string {
    return `${routeApi}/${this.controller}/${method}`;
  }

  /**
   * Do a GET request to the specified 2sxc api controller
   */
  get<T>(method: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(this.url(method), { params });
  }

  /**
   * Do a POST request to the specified 2sxc api controller
   */
  post<T>(method: string, body: T, params?: HttpParams): Observable<T> {
    return this.http.post<T>(this.url(method), body, { params });
  }

  /**
   * Do a PUT request to the specified 2sxc api controller
   */
  put<T>(method: string, body: T, params?: HttpParams): Observable<T> {
    return this.http.put<T>(this.url(method), body, { params });
  }

  /**
   * Do a DELETE request to the specified 2sxc api controller
   */
  delete<T>(method: string, params?: HttpParams): Observable<T> {
    return this.http.put<T>(this.url(method), { params });
  }
}
