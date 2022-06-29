import { ElementRef } from '@angular/core';

/**
 * Special service to inject in the root of the app.
 * Allows you to pass configuration on the app-tag in HTML to configure the application.
 *
 */
export class AppTagService {
  constructor(
    /**
     * The app-tag on the HTML page.
     */
    private appElement: ElementRef
    ) {
  }

  /**
   * Get the value of an attribute on the main app-tag
   * @param attributeName
   * @returns
   */
  public getAttribute(attributeName: string): string {
    // todo: after upgrading to NG8, probably use el.GetAttribute
    return this.appElement.nativeElement.getAttribute(attributeName);
  }
}
