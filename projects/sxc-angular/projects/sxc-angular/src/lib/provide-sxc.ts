import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ElementRef,
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { ContextInfoPreconfigure } from './context/context-info-preconfigure';
import { Context } from './context/context.service';
import { sxcHttpInterceptor } from './http/sxc.interceptor';

/** Optional configuration for {@link initializeSxc}. */
export interface SxcConfig {
  /** Override values which cannot be detected from the root element. */
  context?: Partial<ContextInfoPreconfigure>;

  /** Allow Enter in an input to submit the surrounding ASP.NET form. Defaults to false. */
  enableDefaultSubmit?: boolean;
}

/** Register HttpClient and the 2sxc interceptor. */
export function provideSxc(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHttpClient(withInterceptors([sxcHttpInterceptor])),
  ]);
}

/**
 * Initialize 2sxc from the root component's host element.
 *
 * Call this once, in the root component constructor.
 */
export function initializeSxc(config: SxcConfig = {}): Context {
  const context = inject(Context);
  const element = inject(ElementRef);

  if (config.context)
    context.preConfigure(config.context);

  context.autoConfigure(element);

  if (!config.enableDefaultSubmit) {
    element.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName.toLowerCase() === 'input' && event.key === 'Enter')
        event.preventDefault();
    });
  }

  return context;
}
