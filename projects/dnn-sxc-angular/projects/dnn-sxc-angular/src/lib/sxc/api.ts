import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getHttpParams } from '../../utils/params';
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
  get<T>(method: string, params: HttpParams | string): Observable<T> {
    const requestParams: HttpParams = getHttpParams(params);
    return this.http.get<T>(this.url(method), { params: requestParams });
  }

  /**
   * Do a POST request to the specified 2sxc api controller
   */
  post<T>(method: string, params: HttpParams | string, body: T): Observable<T> {
    const requestParams: HttpParams = getHttpParams(params);
    return this.http.post<T>(this.url(method), body, { params: requestParams });
  }

  /**
   * Do a PUT request to the specified 2sxc api controller
   */
  put<T>(methodAndParams: string, params: HttpParams | string, body: T): Observable<T> {
    const requestParams: HttpParams = getHttpParams(params);
    return this.http.put<T>(this.url(methodAndParams), body, { params: requestParams });
  }

  /**
   * Do a DELETE request to the specified 2sxc api controller
   */
  delete<T>(method: string, params: HttpParams | string): Observable<T> {
    const requestParams: HttpParams = getHttpParams(params);
    return this.http.put<T>(this.url(method), { params: requestParams });
  }
}
