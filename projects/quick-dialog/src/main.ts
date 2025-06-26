import { startWith } from "rxjs/operators";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { environment } from "./environments/environment";
import { BootController } from "./app/core/boot-control";
import { log } from "app/core/log";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "app/app.component";
import { appConfig } from "app/app.config";

if (environment.production) {
  enableProdMode();
}

log.add("loading main.ts");

declare const window;
const platform = platformBrowserDynamic();

function init() {
  log.add("init()");

  try {
    // kill listeners
    if (!platform.destroyed) platform.destroy();
  } catch (e) {
    console.log("platform destroy error", e);
  }

  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
}

// provide hook for outside reboot calls
const bootController = (window.bootController =
  BootController.getRebootController());

// Init on reboot request.
bootController.rebootRequest$
  .pipe(startWith(true)) // Init on first load.
  .subscribe(() => init());
