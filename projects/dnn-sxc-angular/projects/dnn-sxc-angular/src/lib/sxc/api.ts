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
