import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { apiRouteName, routeQuery } from '../contants';

export class Query<T> {
  constructor(
    private http: HttpClient,
    private name: string
  ) { }

  readonly streamParamKey = 'stream';
  readonly defaultStreamName = 'Default';

  /**
   * will retrieve a 2sxc query
   * remember to set the permissions on the query, so it can be accessed by the group you want
   */
  get(params?: HttpParams, streams?: string | string[]): Observable<T> {
    if (streams === undefined) {
      streams = [this.defaultStreamName];
    }
    if (typeof streams === 'string') {
      streams = streams.split(',');
    }
    if (streams) {
      params = this.setStreamParam(params, streams);
    }

    const url = `${routeQuery}/${this.name}`;
    let observable = this.http.get<any>(url, { params });

    // If only one stream is requested, directly return the stream in the returned observable
    if (streams && streams.length === 1) {
      observable = observable.pipe(map(queryResult => queryResult[streams[0]]))
    }

    return observable;
  }

  /**
   * Returns either the existing or a new HttpParams object, with the stream parameter appended.
   * @param params the HttpParams which might be undefined or null
   * @param streams the array of streams which will be appended to the HttpParams object
   */
  private setStreamParam(params: HttpParams, streams: string[]): HttpParams {
    params = params || new HttpParams();
    params = params.set(this.streamParamKey, streams.join(','));
    return params;
  }

}
