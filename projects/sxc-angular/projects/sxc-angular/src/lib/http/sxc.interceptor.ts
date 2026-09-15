import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiRouteName, routeApi, routeRoot } from '../contants';
import { SxcContext } from '../context/sxc-context.service';

@Injectable()
export class SxcHttpInterceptor implements HttpInterceptor {
  constructor(private context: SxcContext) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isSameOrigin(req))
      return next.handle(req);

    let url = req.url;
    if (this.context.$2sxc)
      url = this.context.$2sxc.http.apiUrl(req.url);

    if (this.context.apiEdition)
      url = url.replace(routeApi, routeRoot + this.context.apiEdition + '/' + apiRouteName);

    if (this.context.appNameInPath)
      url = url.replace(routeRoot, `app/${this.context.appNameInPath}/`);

    let headers = {};
    if (this.context.addHttpHeaders && this.context.sxc) {
      headers = this.context.sxc.webApi.headers();
      headers = this.convertAllPropertiesToString(headers);
    }

    return next.handle(req.clone({
      url,
      setHeaders: headers,
    }));
  }

  private isSameOrigin(req: HttpRequest<any>) {
    let url = req.url.toLowerCase();
    let isRelativeUrl = true;

    if (url.startsWith('https://') || url.startsWith('http://')) {
      isRelativeUrl = false;
    } else if (url.startsWith('//')) {
      isRelativeUrl = false;
      url = window.location.protocol + url;
    }

    if (isRelativeUrl)
      return true;

    return url.startsWith(`${window.location.protocol}//${window.location.host}`);
  }

  private convertAllPropertiesToString(obj: any): any {
    return Object.keys(obj).reduce((result, key) => ({ ...result, [key]: obj[key].toString() }), {});
  }
}
