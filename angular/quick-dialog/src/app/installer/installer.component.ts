import { Component, OnInit, Input } from '@angular/core';
import { InstallerService } from "app/installer/installer.service";
import { ModuleApiService } from "app/core/module-api.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { fromEvent } from 'rxjs/observable/fromEvent';

declare const $2sxc: any;
declare const window: any;

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.scss']
})
export class InstallerComponent implements OnInit {
  @Input() isContentApp: boolean;

  showProgress: boolean;
  currentPackage: any;
  remoteInstallerUrl = '';
  ready = false;

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

  ngOnInit() {
    console.log('DEBUG INSTALLER INIT -> if this happens more than one, we\'ve found the issue..');

    let alreadyProcessing = false;
    this.api.loadGettingStarted(this.isContentApp);

    fromEvent(window, 'message')
      .do(() => console.log('DEBUG INSTALLER A'))

      // Ensure only one installation is processed.
      .filter(() => !alreadyProcessing)

      // Get data from event.
      .map((evt: MessageEvent) => {
        console.log('DEBUG INSTALLER B');
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
        console.log('DEBUG INSTALLER C');

        const packagesDisplayNames = packages
          .reduce((t, c) => `${t} - ${c.displayName}\n`, '');

        if (!confirm(`
          Do you want to install these packages?\n\n
          ${packagesDisplayNames}\nThis could take 10 to 60 seconds per package,
          please don't reload the page while it's installing.`)) return false;
        return true;
      })

      .switchMap(packages => {
        console.log('DEBUG INSTALLER D');

        alreadyProcessing = true;
        this.showProgress = true;
        return this.installer.installPackages(packages);
      })

      .subscribe(p => {
        console.log(this.currentPackage);
        this.currentPackage = p;

      // An error occured while installing.
      }, e => {
        console.log('DEBUG INSTALLER ERROR');

        this.showProgress = false;
        alert('An error occurred.');
        alreadyProcessing = false;

      // Installation complete.
      }, () => {
        console.log('DEBUG INSTALLER E');

        this.showProgress = false;
        alert('Installation complete. If you saw no errors, everything worked.');
        window.top.location.reload();
      });
  }
}
