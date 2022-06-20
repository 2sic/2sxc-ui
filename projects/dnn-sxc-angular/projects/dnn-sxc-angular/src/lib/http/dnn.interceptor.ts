import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor';

// TODO: @2mh RENAME TO SxcHttpInterceptorProvider

/**
 * Register the `SxcInterceptor` in a Module.
 * Happens automatically when you import the SxcRootModule.
 */
export const DnnInterceptor: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: Interceptor,
  multi: true
};
