import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiRouteName, routeApi, routeRoot } from '../contants';
import { Context } from '../context/context.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private context: Context
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url;
    let ctx = this.context.contextInfo;
    if (this.context.$2sxc) {
      url = this.context.$2sxc.http.apiUrl(req.url);
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
    if(ctx.addHttpHeaders && this.context.contextInfo.sxc) {
      headers = this.context.contextInfo.sxc.webApi.headers();
      headers = this.convertAllPropertiesToString(headers);
    }
    
    // Clone the request and update the url with 2sxc params.
    const newReq = req.clone({
      url: url,
      setHeaders: headers,
    });

    return next.handle(newReq);
  }

  private convertAllPropertiesToString(obj: any): any {
    return Object.keys(obj).reduce((a,k) => ({...a, [k]:obj[k].toString()}), {})
  }
}
