import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { SxcContext } from './context/sxc-context.service';
import { SxcHttpInterceptorProvider } from './http/sxc.interceptor-provider';
import { SxcApp } from './sxc/sxc-app';
import { SxcInitializer } from './sxc-initializer.service';

/**
 * Register every service required by sxc-angular.
 * This includes
 * - SxcContext
 * - SxcApp
 * - SxcInitializer
 * - SxcHttpInterceptorProvider which ensures that http requests have the necessary headers
 * - HttpClient with interceptors from DI
 */
export function sxcEnvironmentProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([
    SxcContext,
    SxcApp,
    SxcInitializer,
    SxcHttpInterceptorProvider,
    provideHttpClient(withInterceptorsFromDi()),
  ]);
}
