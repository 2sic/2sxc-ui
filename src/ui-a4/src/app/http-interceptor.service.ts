import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Request,
  Response,
  Headers
} from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from "@angular/router";
import { $2sxcService } from "app/core/$2sxc.service";

declare const $2sxc: any;

@Injectable()
export class HttpInterceptorService extends Http {
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private sxc: $2sxcService
  ) {
    super(backend, defaultOptions);
    this.configure(defaultOptions);
  }

  request(url: string | Request, options: RequestOptionsArgs = new RequestOptions()): Observable<Response> {
    this.configure(options);
    if (typeof url === 'string') url = this.sxc.sxc.resolveServiceUrl(<string>url);
    else url.url = this.sxc.sxc.resolveServiceUrl(<string>url.url);
    return super.request(url, options);
  }

  private configure(options: RequestOptionsArgs): RequestOptionsArgs {
    let
      mid = $2sxc.urlParams.require('mid'),
      tid = $2sxc.urlParams.require('tid');
    if (!options.headers) options.headers = new Headers();
    options.headers.set('moduleId', mid)
    options.headers.set('tabId', tid)
    return options;
  }
}