import { Component, OnInit } from '@angular/core';
import { InstallerService } from "app/installer/installer.service";
import { ModuleApiService } from "app/core/module-api.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

declare const $2sxc: any;
var win = window;

@Component({
  selector: 'app-installer',
  templateUrl: './installer.component.html',
  styleUrls: ['./installer.component.scss']
})
export class InstallerComponent implements OnInit {
  private isContentApp: boolean;
  private showProgress: boolean;
  private templates: any[];
  private apps: any[];

  remoteInstallerUrl: string = '';
  private ready: Boolean = false;

  constructor(
    private installer: InstallerService,
    private api: ModuleApiService,
    private sanitizer: DomSanitizer
  ) {
    this.api.gettingStarted
      .subscribe(url => {
        this.remoteInstallerUrl = <string>this.sanitizer.bypassSecurityTrustResourceUrl(url);
        console.log('remoteInstallerUrl', url, this.remoteInstallerUrl);
        this.ready = true;
      });
  }

  ngOnInit() {
    this.api.loadGettingStarted();

    window.addEventListener("message", evt => {
      this.showProgress = true;
      this.installer.processInstallMessage(evt, $2sxc.urlParams.require('mid'))
        .subscribe(() => this.showProgress = false);
    }, false);
  }
}
