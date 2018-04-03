import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InstallerService } from "app/installer/installer.service";
import { ModuleApiService } from "app/core/module-api.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs';

declare const $2sxc: any;
declare const window: any;

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.scss']
})
export class InstallerComponent implements OnInit, OnDestroy {
  @Input() isContentApp: boolean;

  showProgress: boolean;
  currentPackage: any;
  remoteInstallerUrl = '';
  ready = false;

  private subscription: Subscription;

  constructor(
    private installer: InstallerService,
    private api: ModuleApiService,
    private sanitizer: DomSanitizer
  ) {
    this.api.gettingStarted
      .subscribe(url => {
        this.remoteInstallerUrl = <string>this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.ready = true;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    const id = Math.random();
    let alreadyProcessing = false;
    this.api.loadGettingStarted(this.isContentApp);

    this.subscription = fromEvent(window, 'message')

      // Ensure only one installation is processed.
      .filter(() => !alreadyProcessing)

      // Get data from event.
      .map((evt: MessageEvent) => {
        try {
          return JSON.parse(evt.data);
        } catch (e) {
          return void 0;
        }
      })

      // Check if data is correct.
      .filter(data => data
        && ~~data.moduleId === ~~$2sxc.urlParams.require('mid')
        && data.action === 'install')

      // Get packages from data.
      .map(data => Object.values(data.packages))

      // Show confirm dialog.
      .filter(packages => {
        const packagesDisplayNames = packages
          .reduce((t, c) => `${t} - ${c.displayName}\n`, '');

        if (!confirm(`
          Do you want to install these packages?\n\n
          ${packagesDisplayNames}\nThis could take 10 to 60 seconds per package,
          please don't reload the page while it's installing.`)) return false;
        return true;
      })

      .switchMap(packages => {
        alreadyProcessing = true;
        this.showProgress = true;
        return this.installer.installPackages(packages);
      })

      .subscribe(p => {
        this.currentPackage = p;

      // An error occured while installing.
      }, e => {
        this.showProgress = false;
        alert('An error occurred.');
        alreadyProcessing = false;

      // Installation complete.
      }, () => {
        this.showProgress = false;
        alert('Installation complete. If you saw no errors, everything worked.');
        window.top.location.reload();
      });
  }
}
