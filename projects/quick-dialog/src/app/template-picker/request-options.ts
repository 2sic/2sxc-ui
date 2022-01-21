import { HttpHeaders } from '@angular/common/http';

export function requestOptions(blockIds: string) {
  if (!blockIds) return { };
  return {
    headers: new HttpHeaders({
      'BlockIds': blockIds,
    })
  };
}
