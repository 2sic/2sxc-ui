
import { tap, switchMap, map, filter, debounceTime, catchError, take } from 'rxjs/operators';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { InstallerService } from 'app/installer/installer.service';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent, of, Subscription } from 'rxjs';
import { AppInstallSettingsService } from './getting-started.service';
import { Config } from '../config';
import { CrossWindowMessage, InstallPackage, SpecsForInstaller } from './messages';
import { DebugConfig } from 'app/debug-config';
import { IDialogFrameElement } from '../../../../connect-parts/inpage-quick-dialog';
import { InstallSettings } from './installer-models';

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.scss']
})
export class InstallerComponent implements OnInit {
  @Input() isContentApp: boolean;

  @ViewChild('installerWindow') installerWindow: ElementRef;

  showProgress: boolean;
  currentPackage: InstallPackage;
  remoteInstallerUrl = '';
  settings: InstallSettings;
  ready = false;

  private subscriptions: Subscription[] = [];

  showDebug = DebugConfig.picker.showDebugPanel;

  devSimulateInstall = false;

  constructor(
    private installer: InstallerService,
    private api: AppInstallSettingsService,
    private sanitizer: DomSanitizer,
  ) {
    this.subscriptions.push(
      this.api.settings$.subscribe(settings => {
        this.settings = settings;
        this.remoteInstallerUrl = <string>this.sanitizer.bypassSecurityTrustResourceUrl(settings.remoteUrl);
        this.ready = true;
      }));

    // get configuration from iframe-bridge and set everything
    const bridge = (<IDialogFrameElement>window.frameElement).bridge;
    const dashInfo = bridge.getAdditionalDashboardConfig();
    this.showDebug = dashInfo.debug;

    window.bootController.rebootRequest$.pipe(
      debounceTime(1000))
      .subscribe(() => this.destroy());
  }

  destroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    console.log('destroy subs', this.subscriptions);
  }

  private alreadyProcessing = false;

  // Initial Observable to monitor messages
  private messages$ = fromEvent(window, 'message').pipe(

    // Ensure only one installation is processed.
    filter(() => !this.alreadyProcessing),

    // Get data from event.
    map((evt: MessageEvent) => {
      try {
        return JSON.parse(evt.data) as CrossWindowMessage;
      } catch (e) {
        console.error('error procesing message. Message was ' + evt.data, e);
        return void 0;
      }
    }),

    // Check if data is valid and the moduleID matches
    filter(data => data && Number(data.moduleId) === Config.moduleId()),
  );

  ngOnInit() {
    this.api.loadGettingStarted(this.isContentApp);

    // Subscription to listen to 'test' messages
    this.subscriptions.push(this.messages$.pipe(
      tap((data) => {
        console.log('debug data', data);
      }),
      filter(data => data.action === 'test'),
      tap(() => { console.log('test message received'); }),
    ).subscribe());

    // Subscription to listen to 'specs' messages
    this.subscriptions.push(this.messages$.pipe(
      // Verify it's for this action
      filter(data => data.action === 'specs'),

      // Send message to iframe
      tap(() => {
        const winFrame = this.installerWindow.nativeElement as HTMLIFrameElement;
        const specsMsg: SpecsForInstaller = {
          action: 'specs',
          data: {
            installedApps: this.settings.installedApps,
            rules: this.settings.rules,
          },
        };
        const specsJson = JSON.stringify(specsMsg);
        winFrame.contentWindow.postMessage(specsJson);
        console.log('debug: just sent specs message:' + specsJson, specsMsg, winFrame);
      }),
    ).subscribe());

    // Subscription to listen to 'install' messages
    this.subscriptions.push(this.messages$.pipe(
      filter(data => data.action === 'install'),

      // Get packages from data.
      map(data => Object.values(data.packages)),

      // Show confirm dialog.
      filter(packages => {
        const packagesDisplayNames = packages
          .reduce((t, c) => `${t} - ${c.displayName}\n`, '');

        const msg = `Do you want to install these packages?

${packagesDisplayNames}
This takes about 10 seconds per package. Don't reload the page while it's installing.`;
        return confirm(msg);
      }),

      // Install the packages one at a time
      switchMap(packages => {
        this.alreadyProcessing = true;
        this.showProgress = true;
        if (this.devSimulateInstall) {
          alert('would install packages now, see list in console');
          console.log('packages', packages);
          return of(true);
        } else
          return this.installer.installPackages(packages, p => this.currentPackage = p);
      }),

      tap(() => {
        this.showProgress = false;
        alert('Installation complete 👍');
        if (this.devSimulateInstall)
          console.log(`would reload now, but won't, as we're just simulating.`);
        else
          window.top.location.reload();
      }),

      catchError(error => {
        console.error('Error: ', error);
        this.showProgress = false;
        this.alreadyProcessing = false;
        const errorMsg = `An error occurred: Package ${this.currentPackage.displayName}

${error.error?.Message ?? error.error?.message ?? ''}

${error.message}

Please try again later or check how to manually install content-templates: https://azing.org/2sxc/r/0O4OymoA`;
        alert(errorMsg);
        return of(error);
      }),
    ).subscribe());
  }

  sendMessage(message: string) {
    window.postMessage(JSON.stringify({ action: message, moduleId: Config.moduleId() } as CrossWindowMessage));
  }

  toggleSimulate() {
    this.devSimulateInstall = !this.devSimulateInstall;
  }
}
