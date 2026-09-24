import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getHttpParams, UrlParams } from '../../utils/params';
import { routeApi } from '../contants';

/**
 * Quickly call WebApis on the current App
 *
 * @export
 * @class SxcApiService
 */
export class SxcApiService {
  constructor(
    private http: HttpClient,
    private controller: string
  ) {}
  
  /**
   * Get the request URL of the api
   */
  url(method: string): string {
    return `${routeApi}/${this.controller}/${method}`;
  }

  /**
   * Do a GET request to the specified 2sxc api controller
   */
  get<T>(method: string, urlParams: UrlParams): Observable<T> {
    const requestParams: HttpParams = getHttpParams(urlParams);
    return this.http.get<T>(this.url(method), { params: requestParams });
  }

  /**
   * Do a POST request to the specified 2sxc api controller
   */
  post<TBody, TResult = TBody>(method: string, urlParams: UrlParams, body: TBody): Observable<TResult> {
    const requestParams: HttpParams = getHttpParams(urlParams);
    return this.http.post<TResult>(this.url(method), body, { params: requestParams });
  }

  /**
   * Do a PUT request to the specified 2sxc api controller
   */
  put<TBody, TResult = TBody>(method: string, urlParams: UrlParams, body: TBody): Observable<TResult> {
    const requestParams: HttpParams = getHttpParams(urlParams);
    return this.http.put<TResult>(this.url(method), body, { params: requestParams });
  }

  /**
   * Do a DELETE request to the specified 2sxc api controller
   */
  delete<T>(method: string, urlParams: UrlParams): Observable<T> {
    const requestParams: HttpParams = getHttpParams(urlParams);
    return this.http.delete<T>(this.url(method), { params: requestParams });
  }
}
