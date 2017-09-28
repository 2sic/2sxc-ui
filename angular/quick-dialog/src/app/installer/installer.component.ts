import { Component, OnInit, Input } from '@angular/core';
import { InstallerService } from "app/installer/installer.service";
import { ModuleApiService } from "app/core/module-api.service";
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
    this.api.loadGettingStarted(this.isContentApp);

    window.addEventListener('message', evt => {
      var data;

      try {
        data = JSON.parse(evt.data);
      } catch (e) {
        return false;
      }

      if (~~data.moduleId !== ~~$2sxc.urlParams.require('mid')) return;
      if (data.action !== 'install') return;

      let
        packages = Object.values(data.packages),
        packagesDisplayNames = packages.reduce((t, c) => `${t} - ${c.displayName}\n`, '');

      if (!confirm(`
          Do you want to install these packages?\n\n
          ${packagesDisplayNames}\nThis could take 10 to 60 seconds per package,
          please don't reload the page while it's installing.`)) return;

      this.showProgress = true;
      this.installer.installPackages(packages)
        .subscribe(p => this.currentPackage = p, e => {
          this.showProgress = false;
          alert('An error occurred.');
        }, () => {
          this.showProgress = false;
          alert('Installation complete. If you saw no errors, everything worked.');
          window.top.location.reload();
        });
    }, false);
  }
}
