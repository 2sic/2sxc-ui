
import { tap, switchMap, map, filter, debounceTime, catchError } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { InstallerService } from 'app/installer/installer.service';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent, of, Subscription } from 'rxjs';
import { GettingStartedService } from './getting-started.service';
import { Config } from '../config';

declare const $2sxc: any;

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

  private subscriptions: Subscription[] = [];

  constructor(
    private installer: InstallerService,
    private api: GettingStartedService,
    private sanitizer: DomSanitizer,
  ) {
    this.subscriptions.push(
      this.api.gettingStarted$.subscribe(url => {
        this.remoteInstallerUrl = <string>this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.ready = true;
      }));

    window.bootController.rebootRequest$.pipe(
      debounceTime(1000))
      .subscribe(() => this.destroy());
  }

  destroy(): void {
    this.subscriptions
      .forEach(sub => sub.unsubscribe());
    console.log('destroy subs', this.subscriptions);
  }

  ngOnInit() {
    let alreadyProcessing = false;
    this.api.loadGettingStarted(this.isContentApp);

    this.subscriptions.push(fromEvent(window, 'message').pipe(

      // Ensure only one installation is processed.
      filter(() => !alreadyProcessing),

      // Get data from event.
      map((evt: MessageEvent) => {
        try {
          return JSON.parse(evt.data);
        } catch (e) {
          return void 0;
        }
      }),

      // Check if data is correct.
      filter(data => data
        && Number(data.moduleId) === Config.moduleId()
        && data.action === 'install'),

      // Get packages from data.
      map(data => Object.values(data.packages)),

      // Show confirm dialog.
      filter(packages => {
        const packagesDisplayNames = packages
          .reduce((t, c) => `${t} - ${(c as any).displayName}\n`, '');

        const msg = `Do you want to install these packages?

${packagesDisplayNames}
This takes about 10 seconds per package. Don't reload the page while it's installing.`;
        return confirm(msg);
      }),

      switchMap(packages => {
        alreadyProcessing = true;
        this.showProgress = true;
        return this.installer.installPackages(packages, p => this.currentPackage = p);
      }),

      tap(() => {
        this.showProgress = false;
        alert('Installation complete 👍');
        window.top.location.reload();
      }),

      catchError(error => {
        console.error('Error: ', error);
        this.showProgress = false;
        alreadyProcessing = false;
        var errorMsg = `An error occurred: ${error.error?.Message ?? error.error?.message ?? ''}

${error.message}

Please try again later or check how to manually install content-templates: https://azing.org/2sxc/r/0O4OymoA`;
        alert(errorMsg);
        return of(error);
      }),
    ).subscribe());
  }
}
