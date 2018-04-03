import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { BootController } from './app/core/boot-control';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule);
// 2dm: now with reboot capabilities

declare const window;

const init = () => {
  platformBrowserDynamic()
    .destroy();

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
      .then(() => window.appBootstrap && window.appBootstrap())
      .catch(err => console.error('NG Bootstrap Error =>', err));
}

// provide hook for outside reboot calls
const bootController = window.bootController = BootController.getbootControl();

// Init on reboot request.
const boot = bootController.watchReboot()
  .startWith(true) // Init on first load.
  .debounceTime(200)
  .do(() => init())
  .subscribe();
