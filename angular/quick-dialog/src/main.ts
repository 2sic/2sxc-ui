
import {startWith} from 'rxjs/operators';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { BootController } from './app/core/boot-control';
import { log } from 'app/core/log';

if (environment.production) {
  enableProdMode();
}

log.add('loading main.ts');

declare const window;
const platform = platformBrowserDynamic();

function init() {
  log.add('init()');

  try {
    // kill listeners
    if (!platform.destroyed)
      platform.destroy();
  } catch (e) {
    console.log('platform destroy error', e);
  }

  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => window.appBootstrap && window.appBootstrap())
    .catch(err => console.error('NG Bootstrap Error =>', err));
};


// provide hook for outside reboot calls
const bootController = window.bootController = BootController.getRebootController();

// Init on reboot request.
bootController.rebootRequest$.pipe(
  startWith(true)) // Init on first load.
  .subscribe(() => init());
