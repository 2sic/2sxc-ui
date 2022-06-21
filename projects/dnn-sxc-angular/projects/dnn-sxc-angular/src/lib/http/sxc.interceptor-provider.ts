import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SxcHttpInterceptor } from './sxc.interceptor';

/**
 * Register the `SxcInterceptor` in a Module.
 * Happens automatically when you import the SxcRootModule.
 */
export const SxcHttpInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: SxcHttpInterceptor,
  multi: true
};
