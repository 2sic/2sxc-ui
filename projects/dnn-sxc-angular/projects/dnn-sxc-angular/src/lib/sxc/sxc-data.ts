import { Api } from './api';
import { Data } from './data';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from './query';
import { QueryConstruction } from './query-construction';

/**
 * 2sxc data provider
 * gives you access to content and query streams using the content$ and query$ commands
 * you can also use the content and query managers, but these are currently not so useful.
 *
 * @export
 * @class SxcData
 */
@Injectable({
  providedIn: 'root',
})
export class SxcData {
  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Cet a content manager object for a specific ContentType
   * usually you will prefer the the observable stream content$
   * this manager is currently included for consistency, and will later also offer write commands
   * @param contentType name of the content-type
   */
  public data<T>(contentType: string): Data<T> {
    return new Data<T>(this.http, contentType);
  }

  /**
   * get a stream of content items or (if ID is provided) a stream containing one item
   * @param contentType name of the content-type
   * @param id optional id of a single item
   * @returns an observable containing a single item (if ID is provided) or an array of these items
   */
   data$<T>(contentType: string, id?: number): Observable<T> {
    // When id is undefined, we would get back an Observable<T[]> instead of Observable<T>.
    // Typescript does not take care of this; however we ignore it because we want the data
    // service to always return an Observable of T.
    return new Data<T>(this.http, contentType).getOne(id);
  }

  /**
   * get a query object to then start queries
   * usually you'll be better off using the observable stream query$, this is included primarily for consistency in the api
   * @param name the query name
   * @returns a query object with a .get()
   */
  public query<T>(name: string) {
    return new Query<T>(this.http, name);
  }

  /**
   * retrieve a query stream from the server
   * @param name the query name
   * @param params optional parameters-object
   * @returns a typed observable which will give you the query
   */
  public query$<T>(name: string, params?: HttpParams): Observable<T>;
  public query$<T>({ name, params, streams }: QueryConstruction): Observable<T>;
  public query$<T>(param1: any, param2?: HttpParams) {
    if (typeof param1 === 'object') {
      const { name, params, streams } = <QueryConstruction>param1;
      const query = new Query<T>(this.http, name);
      return (Array.isArray(streams) ? query.getStreams(streams, params) : query.getStream(streams, params));
    } else return new Query<T>(this.http, param1).getAll();
  }


  /**
   * get an api object to then start api-calls
   * usually you'll be better off using the quick observable stream api$, this is included primarily for consistency in the api
   * @param controller the api controller
   * @returns an API object with a .get<T>() method
   */
  public api(controller: string): Api {
    return new Api(this.http, controller);
  }

  /**
   * retrieve a api stream from the server
   * @param apiName controller/method
   * @param params optional parameters-object
   * @returns a typed observable which will give you the query
   */
  public api$<T>(apiName: string, params?: HttpParams): Observable<T> {
    const separator = apiName.indexOf('/');
    if (separator === -1) {
      throw new Error(`Trying to get api$ but only got '${apiName}' - expected something in the format of 'controller/method'`);
    }

    const method = apiName.substr(separator + 1);
    apiName = apiName.substr(0, separator);

    return new Api(this.http, apiName).fetch<T>(method);
  }
}
