import { Subject } from 'rxjs';
import { log as parentLog } from './log';

const log = parentLog.subLog('boot-controller');
/**
 * Special reboot controller, to restart the angular app
 * when critical parameters were changed
 */
export class BootController {
  private static instance: BootController;
  private _reboot: Subject<boolean> = new Subject();
  rebootRequest$ = this._reboot.asObservable();

  static getRebootController() {
    log.add('getRebootController()');
    if (!BootController.instance) {
      BootController.instance = new BootController();
    }
    return BootController.instance;
  }

  public reboot() {
    log.add('restarting...');
    this._reboot.next(true);
  }
}
