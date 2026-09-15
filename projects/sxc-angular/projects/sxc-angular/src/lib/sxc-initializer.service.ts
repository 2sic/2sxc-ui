import { ElementRef, Injectable } from '@angular/core';
import { ContextInfoPreconfigure } from './context/context-info-preconfigure';
import { Context } from './context/context.service';

export interface SxcConfig {
  context?: Partial<ContextInfoPreconfigure>;
  enableDefaultSubmit?: boolean;
}

@Injectable()
export class SxcInitializer {
  constructor(
    private context: Context
  ) { }

  initialize(element: ElementRef, config: SxcConfig = {}): Context {
    if (config.context)
      this.context.preConfigure(config.context);

    this.context.autoConfigure(element);

    if (!config.enableDefaultSubmit)
      this.preventDefaultSubmit(element);

    return this.context;
  }

  private preventDefaultSubmit(element: ElementRef) {
    element.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (target?.tagName.toLowerCase() === 'input' && event.key === 'Enter')
        event.preventDefault();
    });
  }
}
