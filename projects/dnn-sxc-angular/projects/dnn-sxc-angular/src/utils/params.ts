import { HttpParams } from '@angular/common/http';

export type UrlParams = HttpParams | string | Record<string, string | readonly string[]>;

export function getHttpParams(params: UrlParams): HttpParams {
  return typeof (params) === 'string'
    ? new HttpParams({ fromString: params })
    : params instanceof HttpParams
      ? params
      : new HttpParams({ fromObject: params });
}
