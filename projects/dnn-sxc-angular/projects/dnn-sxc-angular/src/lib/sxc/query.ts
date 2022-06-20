import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getHttpParams, UrlParams } from '../../utils/params';
import { routeQuery } from '../contants';

/**
 * Query object for getting typed data.
 * @export
 * @class Query
 * @template T type (usually an interface) of the data coming back
 */
export class Query<T> {
  constructor(
    private http: HttpClient,
    private name: string
  ) { }

  readonly streamParamKey = 'stream';

  /**
   * Get an object with all the streams, each containing an array of all the data in that stream
   */
  getAll(): Observable<T>;

  /**
   * Get an object with all the streams, each containing an array of all the data in that stream
   * with url-parameters as HttpParams or string
   */
  getAll(params: UrlParams): Observable<T>;

  /**
   * Get an object with all the streams, each containing an array of all the data in that stream
   * with url-parameters as HttpParams or string using post data
   */
  getAll(params: UrlParams, data: T): Observable<T>;

  /**
   * Internal implementation of getAll
   */
  getAll(params?: UrlParams, data?: T): Observable<T> {
    const url = `${routeQuery}/${this.name}`;
    const streamParams: HttpParams = getHttpParams(params);

    if (data) return this.http.post<T>(url, data, { params: streamParams });
    return this.http.get<T>(url, { params: streamParams });
  }

  /**
   * Get an object with the specified stream, containing an array of all the data in that stream
   */
  getStream(stream: string): Observable<T>;

  /**
   * Get an object with the specified stream, containing an array of all the data in that stream
   * with url-parameters as HttpParams or string
   */
  getStream(stream: string, urlParams: UrlParams): Observable<T>;

  /**
   * Get an object with the specified stream, containing an array of all the data in that stream
   * with url-parameters as HttpParams or string using post data
   */
  getStream(stream: string, urlParams: UrlParams, data: T): Observable<T>;

  /**
   * Internal implementation of getStream
   */
  getStream(stream: string, urlParams?: UrlParams, data?: T): Observable<T> {
    const url = `${routeQuery}/${this.name}?${this.streamParamKey}=${stream}`;
    const streamParams: HttpParams = getHttpParams(urlParams);

    if (data) return this.http.post<T>(url, data, { params: streamParams }).pipe(map(res => res[stream]));
    return this.http.get<T>(url, { params: streamParams }).pipe(map(res => res[stream]));
  }

  /**
   * Get an object with the specified streams, each containing an array of all the data in that stream
   */
  getStreams(streams: string[]): Observable<T>;

  /**
   * Get an object with the specified streams, each containing an array of all the data in that stream
   * with url-parameters as HttpParams or string
   */
  getStreams(streams: string[], urlParams: UrlParams): Observable<T>;

  /**
   * Get an object with the specified streams, each containing an array of all the data in that stream
   * with url-parameters as HttpParams or string using post data
   */
  getStreams(streams: string[], urlParams: UrlParams, data: T): Observable<T>;

  /**
   * Internal implementation of getStreams
   */
  getStreams(streams: string[], urlParams?: UrlParams, data?: T): Observable<T> {
    const url = `${routeQuery}/${this.name}?${this.streamParamKey}=${streams.join(',')}`;
    const streamParams: HttpParams = getHttpParams(urlParams);

    if (data) return this.http.post<T>(url, data, { params: streamParams });
    return this.http.get<T>(url, { params: streamParams });
  }
}
