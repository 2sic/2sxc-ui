import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { routeApi } from '../contants';

export class Api {
  constructor(
    private http: HttpClient,
    private controller: string
  ) {  }

  /**
   * GET a 2sxc api controller method
   */
  get<T>(method: string, params?: HttpParams): Observable<T> {
    const url = `${routeApi}/${this.controller}/${method}`;
    return this.http.get<T>(url, { params });
  }

  /**
   * POST to a 2sxc api controller method
   */
  post<T>(method: string, body: any, params?: HttpParams): Observable<T> {
    const url = `${routeApi}/${this.controller}/${method}`;
    return this.http.post<T>(url, body, { params });
  }
}
