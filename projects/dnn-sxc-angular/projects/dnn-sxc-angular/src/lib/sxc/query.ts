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
   * Get an object with all the streams, each containing an array of all the data in that stream with url-parameters as HttpParams
   */
  getAll(params: HttpParams): Observable<T>;

  /**
   * Get an object with all the streams, each containing an array of all the data in that stream with url-parameters as string
   */
  getAll(params: string): Observable<T>;

  /**
   * Get an object with all the streams, each containing an array of all the data in that stream with url-parameters as string
   */
  getAll(params: HttpParams | string, data: T): Observable<T>;

  /**
   * Internal implementation of getAll
   */
  getAll(params: HttpParams | string = null, data: T = null): Observable<T> {
    const url = `${routeQuery}/${this.name}`;

    if (data)
      return (typeof(params) === 'string'
        ? this.http.post<T>(`${url}${params !== null ? `?${params}` : ''}`, data)
        : this.http.post<T>(url, data, { params }));
    if (params)
      return (typeof(params) === 'string'
        ? this.http.get<T>(`${url}${params !== null ? `?${params}` : ''}`)
        : this.http.get<T>(url, { params }));

    return this.http.get<T>(url);
  }

  /**
   * Get an object with the specified stream, containing an array of all the data in that stream
   */
  getStream(stream: string): Observable<T>;

  /**
   * Get an object with the specified stream, containing an array of all the data in that stream with url-parameters as HttpParams
   */
  getStream(stream: string, params: HttpParams): Observable<T>;

  /**
   * Get an object with the specified stream, containing an array of all the data in that stream with url-parameters as string
   */
  getStream(stream: string, params: string): Observable<T>;

  /**
   * Get an object with the specified stream, containing an array of all the data in that stream with url-parameters as string
   */
  getStream(stream: string, params: HttpParams | string, data: T): Observable<T>;

  /**
   * Internal implementation of getStream
   */
  getStream(stream: string, params: HttpParams | string = null, data: T = null): Observable<T> {
    const url = `${routeQuery}/${this.name}?${this.streamParamKey}=${stream}`;

    if (data)
      return (typeof(params) === 'string'
      ? this.http.post<T>(`${url}${params !== null ? `?${params}` : ''}`, data)
      : this.http.post<T>(url, data, { params }));
    if (params)
      return (typeof(params) === 'string'
      ? this.http.get<T>(`${url}${params !== null ? `?${params}` : ''}`)
      : this.http.get<T>(url, { params }));

    return this.http.get<T>(url);
  }

  /**
   * Get an object with the specified streams seperated by comma, each containing an array of all the data in that stream
   */
  getStreams(streams: string): Observable<T>;

  /**
   * Get an object with the specified streams seperated by comma,
   * each containing an array of all the data in that stream with url-parameters as HttpParams
   */
  getStreams(streams: string, params: HttpParams): Observable<T>;

  /**
   * Get an object with the specified streams seperated by comma,
   * each containing an array of all the data in that stream with url-parameters as string
   */
  getStreams(streams: string, params: string): Observable<T>;

  /**
   * Get an object with the specified streams seperated by comma,
   * each containing an array of all the data in that stream with url-parameters as string
   */
  getStreams(streams: string, params: HttpParams | string, data: T): Observable<T>;

  /**
   * Internal implementation of getStreams
   */
  getStreams(streams: string, params: HttpParams | string = null, data: T = null): Observable<T> {
    const url = `${routeQuery}/${this.name}?${this.streamParamKey}=${streams}`;

    if (data)
      return (typeof(params) === 'string'
      ? this.http.post<T>(`${url}${params !== null ? `?${params}` : ''}`, data)
      : this.http.post<T>(url, data, { params }));
    if (params)
      return (typeof(params) === 'string'
      ? this.http.get<T>(`${url}${params !== null ? `?${params}` : ''}`)
      : this.http.get<T>(url, { params }));

    return this.http.get<T>(url);
  }
}
