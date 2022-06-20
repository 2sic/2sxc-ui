import { Context } from './context/context.service';
import { ElementRef } from '@angular/core';

// TODO: @2mh RENAME TO SxcAppComponent

/**
 * A root app component which initializes the context-providers once the app is loaded
 * This is the earliest moment we can access the ElementRef, because before that
 * it's not attached to the DOM, so auto-detect wouldn't work.
 * @export
 * @class DnnAppComponent
 */
export class DnnAppComponent {
  /**
   *
   * @param element the angular ElementRef - required to auto-detect moduleId and more
   * @param context the context service, which handles and shares auto-detection
   * @param enableDefaultSubmit causes enter-hits to submit the asp.net forms (defaults to false)
   */
  constructor(
    element: ElementRef,
    context: Context,
    enableDefaultSubmit?: boolean
  ) {
    // auto-config to pick up tab-id, module id, etc.
    context.autoConfigure(element);
    // prevent asp.net submit action caused by enter-keys inside our app
    if (!enableDefaultSubmit)
      element.nativeElement.addEventListener('keydown', (e: any) => {
          if (e.target.tagName.toLowerCase() === 'input' && e.keyCode === 13)
            e.preventDefault();
        }
      );
  }
}
