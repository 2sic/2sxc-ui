import { HttpParams } from '@angular/common/http';

export function getHttpParams(params: HttpParams | string) {
  return typeof(params) !== 'string' ? params : new HttpParams({fromString: params});
}
