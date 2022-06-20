import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiRouteName, routeApi, routeRoot } from '../contants';
import { Context } from '../context/context.service';

// TODO: @2mh RENAME TO SxcHttpInterceptor
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private context: Context) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // skip interceptor for CORS requests
    if (!this.isSameOrigin(req)) return next.handle(req);

    let url = req.url;
    let ctx = this.context;
    if (ctx.$2sxc) {
      url = ctx.$2sxc.http.apiUrl(req.url);
    }

    // change to use api of an edition, if an edition was specified
    // but only do this on api-routes, the others don't support editions
    if (ctx.apiEdition) {
      url = url.replace(routeApi, routeRoot + ctx.apiEdition + '/' + apiRouteName);
    }

    if (ctx.appNameInPath) {
      url = url.replace(routeRoot, `app/${ctx.appNameInPath}/`);
    }

    let headers = {};
    if(ctx.addHttpHeaders && ctx.sxc) {
      headers = ctx.sxc.webApi.headers();
      headers = this.convertAllPropertiesToString(headers);
    }

    // Clone the request and update the url with 2sxc params.
    const newReq = req.clone({
      url: url,
      setHeaders: headers,
    });

    return next.handle(newReq);
  }

  private isSameOrigin(req: HttpRequest<any>) {
    let url = req.url.toLowerCase();
    let isRelativeUrl = true;

    if (url.startsWith('https://') || url.startsWith('http://')) {
      isRelativeUrl = false;
    } else if (url.startsWith('//')) {
      // protocol relative url
      isRelativeUrl = false;
      url = window.location.protocol + url;
    }

    if (isRelativeUrl) return true;
    if (url.startsWith(`${window.location.protocol}//${window.location.host}`))
      return true;

    return false;
  }


  private convertAllPropertiesToString(obj: any): any {
    return Object.keys(obj).reduce((a,k) => ({...a, [k]:obj[k].toString()}), {})
  }
}
