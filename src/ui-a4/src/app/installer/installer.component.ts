import { Component, OnInit } from '@angular/core';
import { InstallerService } from "app/installer/installer.service";
import { ModuleApiService } from "app/core/module-api.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

declare const $2sxc: any;
declare const window: any;
declare const console: any;

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

  currentPackage: any;
  remoteInstallerUrl: string = '';
  ready: Boolean = false;

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
    this.api.loadGettingStarted();

    window.addEventListener('message', evt => {
      var data;

      try {
        data = JSON.parse(evt.data);
      } catch (e) {
        return false;
      }
      
      console.log("data", data);
      
      if (~~data.moduleId !== ~~$2sxc.urlParams.require('mid')) return;
      if (data.action !== 'install') return;
      
      this.showProgress = true;
      this.installer.installPackages(Object.values(data.packages))
        .subscribe(
        p => this.currentPackage = p,
        e => {
          this.showProgress = false;
          alert('An error occurred.');
        },
        () => {
          this.showProgress = false;
          alert('Installation complete. If you saw no errors, everything worked.');
          window.top.location.reload();
        });
    }, false);
  }
}
