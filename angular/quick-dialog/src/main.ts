import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { BootController } from './app/core/boot-control';

if (environment.production) {
  enableProdMode();
}

console.log('quick-edit loading');

declare const window;
const platform = platformBrowserDynamic();

const init = () => {
  console.log('quick-edit init()');

  try {
    // kill listeners
    if (!platform.destroyed)
      platform.destroy();
  } catch (e) {
    console.log('platform destroy error', e);
  }

  platform.bootstrapModule(AppModule)
    .then(() => window.appBootstrap && window.appBootstrap())
    .catch(err => console.error('NG Bootstrap Error =>', err));
};


// provide hook for outside reboot calls
const bootController = window.bootController = BootController.getRebootController();

// Init on reboot request.
bootController.rebootRequest$
  .startWith(true) // Init on first load.
  .subscribe(() => init());
