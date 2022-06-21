import { SxcApiService } from './api.service';
import { SxcDataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SxcQueryService } from './query.service';

/**
 * 2sxc App Instance Object
 * <br>
 * gives you access to content and query streams using the content$ and query$ commands
 * you can also use the content and query managers, but these are currently not so useful.
 *
 * @export
 * @class SxcApp
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
  public data<T>(contentType: string): SxcDataService<T> {
    return new SxcDataService<T>(this.http, contentType);
  }

  /**
   * get a query object to then start queries
   * @param name the query name
   * @returns a SxcQueryService object with .getAll(), .getStreams(), .getStream()
   */
  public query<T>(name: string) {
    return new SxcQueryService<T>(this.http, name);
  }

  /**
   * get an api object to then start api-calls
   * @param controller the api controller
   * @returns an SxcApiService object with .url(), .get<T>(), .post<T>(), .put<T>(), .delete<T>() method
   */
  public api(controller: string): SxcApiService {
    return new SxcApiService(this.http, controller);
  }
}
