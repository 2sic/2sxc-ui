import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { SxcHttpInterceptor } from './sxc.interceptor';

export const SxcHttpInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SxcHttpInterceptor,
  multi: true,
};
