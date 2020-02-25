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
import { $2sxcService } from "app/core/$2sxc.service";

declare const $2sxc: any;
declare const window: any;

@Injectable()
export class Http2sxc extends Http {
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private sxc: $2sxcService
  ) {
    super(backend, defaultOptions);
    this.configure(defaultOptions);
  }

  request(url: string | Request, options: RequestOptionsArgs = new RequestOptions()): Observable<Response> {
    const isDevMode = window.location.hostname === 'localhost';
    this.configure(options);
    if (typeof url === 'string') url = this.sxc.sxc.resolveServiceUrl(<string>url);
    else url.url = this.sxc.sxc.resolveServiceUrl(<string>url.url);
    return super.request(url, options);
  }

  private configure(options: RequestOptionsArgs): RequestOptionsArgs {
    const
      mid = $2sxc.urlParams.require('mid'),
      tid = $2sxc.urlParams.require('tid'),
      cbid = $2sxc.urlParams.require('cbid');
    if (!options.headers) options.headers = new Headers();
    options.headers.set('ModuleId', mid);
    options.headers.set('TabId', tid);
    options.headers.set('ContentBlockId', cbid);
    options.headers.set('RequestVerificationToken', window.$.ServicesFramework(mid).getAntiForgeryValue());
    options.headers.set('X-Debugging-Hint', 'bootstrapped by 2sxc4ng');
    return options;
  }
}