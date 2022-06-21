import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Context } from '../context';

/**
 * The toolbar attribute to be used on any HTML tag.
 * Will bring the floating edit-toolbar to the UI if the user is logged in
 *
 * @export
 * @class SxcTagToolbarDirective
 * @implements {OnInit}
 */
@Directive({
  selector: '[sxc-toolbar]',
})
export class SxcTagToolbarDirective implements OnInit {

  /**
   * The configuration of this toolbar
   * @type {*} see 2sxc docs, can be a string, string[], or an object
   */
  @Input('sxc-toolbar') sxcToolbar: any; // old name for compatibility

  /**
   * A refresh callback when an action on the toolbar requires data to be refreshed.
   * If not specified, the page will simply reload, if specified, this action will run and page-reload won't happen.
   * New in v.11.12
   */
  @Output('refresh') refresh = new EventEmitter<any>();

  constructor(private element: ElementRef, private context: Context) {
  }

  ngOnInit() {
    if (!(this.context?.sxc as any).isEditMode()) return;
    const node = this.element.nativeElement;
    this.preventRefreshIfListenerConfigured();
    node.setAttribute("sxc-toolbar", JSON.stringify(this.sxcToolbar || {}));
    return (this.context.$2sxc as any)?._manage?._toolbarManager.build(node);
  }

  /**
   * Check if the event emiter has a listener, and if yes, stop automatic page reload
   */
  private preventRefreshIfListenerConfigured() {
    //
    if (this.refresh.observers.length > 0) {
      this.element.nativeElement.addEventListener('toolbar-init', (event) => {
        event?.detail?.workflow?.add({
          command: 'refresh',           // only capture refresh requests
          code: (wfArgs) => {
            this.refresh.emit(wfArgs);  // emit event
            return false;               // prevent default refresh of the 2sxc API
          }
        });
      });
    }
  }

}
