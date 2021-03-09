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
   * Do a GET request a 2sxc api controller method
   */
  get<T>(method: string, params?: HttpParams): Observable<T> {
    const url = `${routeApi}/${this.controller}/${method}`;
    return this.http.get<T>(url, { params });
  }

  /**
   * Do a POST request to a 2sxc api controller method
   */
  post<T>(method: string, body: any, params?: HttpParams): Observable<T> {
    const url = `${routeApi}/${this.controller}/${method}`;
    return this.http.post<T>(url, body, { params });
  }
}
