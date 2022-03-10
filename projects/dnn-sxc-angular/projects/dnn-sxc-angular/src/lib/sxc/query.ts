import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  getAll(params: HttpParams | string): Observable<T>;

  /**
   * Get an object with all the streams, each containing an array of all the data in that stream
   * with url-parameters as HttpParams or string using post data
   */
  getAll(params: HttpParams | string, data: T): Observable<T>;

  /**
   * Internal implementation of getAll
   */
  getAll(params?: HttpParams | string, data?: T): Observable<T> {
    const url = `${routeQuery}/${this.name}`;
    let streamParams: HttpParams = null;

    if (params) streamParams = new HttpParams({fromString: params.toString() });
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
  getStream(stream: string, params: HttpParams | string): Observable<T>;

  /**
   * Get an object with the specified stream, containing an array of all the data in that stream
   * with url-parameters as HttpParams or string using post data
   */
  getStream(stream: string, params: HttpParams | string, data: T): Observable<T>;

  /**
   * Internal implementation of getStream
   */
  getStream(stream: string, params?: HttpParams | string, data?: T): Observable<T> {
    const url = `${routeQuery}/${this.name}?${this.streamParamKey}=${stream}`;
    let streamParams: HttpParams = null;

    if (params) streamParams = new HttpParams({fromString: params.toString() });
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
  getStreams(streams: string[], params: HttpParams | string): Observable<T>;

  /**
   * Get an object with the specified streams, each containing an array of all the data in that stream
   * with url-parameters as HttpParams or string using post data
   */
  getStreams(streams: string[], params: HttpParams | string, data: T): Observable<T>;

  /**
   * Internal implementation of getStreams
   */
  getStreams(streams: string[], params?: HttpParams | string, data?: T): Observable<T> {
    const url = `${routeQuery}/${this.name}?${this.streamParamKey}=${streams.join(',')}`;
    let streamParams: HttpParams = null;

    if (params) streamParams = new HttpParams({fromString: params.toString() });
    if (data) return this.http.post<T>(url, data, { params: streamParams });

    return this.http.get<T>(url, { params: streamParams });
  }
}
