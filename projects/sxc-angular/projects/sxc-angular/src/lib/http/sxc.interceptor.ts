import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { apiRouteName, routeApi, routeRoot } from '../contants';
import { Context } from '../context/context.service';

/** Add the current 2sxc context to same-origin HTTP requests. */
export const sxcHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const context = inject(Context);

  // Skip the interceptor for cross-origin requests.
  if (!isSameOrigin(req))
    return next(req);

  let url = req.url;
  if (context.$2sxc)
    url = context.$2sxc.http.apiUrl(req.url);

  // Use the configured API edition on routes which support editions.
  if (context.apiEdition)
    url = url.replace(routeApi, routeRoot + context.apiEdition + '/' + apiRouteName);

  if (context.appNameInPath)
    url = url.replace(routeRoot, `app/${context.appNameInPath}/`);

  let headers = {};
  if (context.addHttpHeaders && context.sxc) {
    headers = context.sxc.webApi.headers();
    headers = convertAllPropertiesToString(headers);
  }

  return next(req.clone({
    url,
    setHeaders: headers,
  }));
};

function isSameOrigin(req: HttpRequest<unknown>) {
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

function convertAllPropertiesToString(obj: any): any {
  return Object.keys(obj).reduce((result, key) => ({ ...result, [key]: obj[key].toString() }), {});
}
