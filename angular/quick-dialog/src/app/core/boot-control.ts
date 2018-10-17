import { Subject } from 'rxjs/Subject';

/**
 * Special reboot controller, to restart the angular app
 * when critical parameters were changed
 */
export class BootController {
  private static instance: BootController;
  private _reboot: Subject<boolean> = new Subject();
  rebootRequest$ = this._reboot.asObservable();

  static getRebootController() {
    if (!BootController.instance) {
      BootController.instance = new BootController();
    }
    return BootController.instance;
  }

  public reboot() {
    console.log('restarting...');
    this._reboot.next(true);
  }
}
