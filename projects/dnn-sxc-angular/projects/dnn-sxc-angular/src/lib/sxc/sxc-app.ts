import { Api } from './api';
import { Data } from './data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Query } from './query';

/**
 * 2sxc App Instance Object
 * <br>
 * gives you access to content and query streams using the content$ and query$ commands
 * you can also use the content and query managers, but these are currently not so useful.
 *
 * @export
 * @class SxcData
 */
@Injectable({
  providedIn: 'root',
})
export class SxcApp {
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Cet a content manager object for a specific ContentType
   * @param contentType name of the content-type
   * @returns a query object with .getAll(), .getOne(), .create(), .update(), .delete()
   */
  public data<T>(contentType: string): Data<T> {
    return new Data<T>(this.http, contentType);
  }

  /**
   * get a query object to then start queries
   * @param name the query name
   * @returns a query object with .getAll(), .getStreams(), .getStream()
   */
  public query<T>(name: string) {
    return new Query<T>(this.http, name);
  }

  /**
   * get an api object to then start api-calls
   * @param controller the api controller
   * @returns an API object with .url(), .get<T>(), .post<T>(), .put<T>(), .delete<T>() method
   */
  public api(controller: string): Api {
    return new Api(this.http, controller);
  }
}
