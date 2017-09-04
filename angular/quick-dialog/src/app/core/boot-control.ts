import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * Special reboot controller, to restart the angular app
 * when critical parameters were changes
 */
export class BootController {
  private static instance: BootController;
  private _reboot: Subject<boolean> = new Subject();
  private reboot$ = this._reboot.asObservable();

  static getbootControl() {
    if (!BootController.instance) {
      BootController.instance = new BootController();
    }
    return BootController.instance;
  }

  public watchReboot() {
    return this.reboot$;
  }

  public restart() {
      console.log("restarting...")
    this._reboot.next(true);
  }
}
