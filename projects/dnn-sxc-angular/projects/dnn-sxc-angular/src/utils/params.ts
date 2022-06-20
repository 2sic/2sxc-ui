import { HttpParams } from '@angular/common/http';

export type UrlParams = HttpParams | string | Record<string, unknown | undefined>;


export function getHttpParams(params: UrlParams): HttpParams {
  return typeof(params) !== 'string'
  ? params as HttpParams
  : new HttpParams({fromString: params});

  // TODO: @2mh - also handle from-object case (Record<>)
}
