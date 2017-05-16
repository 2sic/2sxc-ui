import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";

declare const confirm: any;
declare const window: any;

@Injectable()
export class InstallerService {

  constructor(
    private http: Http
  ) { }
  
  installPackages(packages: any[]): Observable<any> {
    let
      subject = new Subject<any>(),
      packagesDisplayNames = packages.reduce((t, c) => `${t} - ${c.displayName}\n`, '');
    
    if (!confirm(`
          Do you want to install these packages?\n\n
          ${packagesDisplayNames}\nThis could take 10 to 60 seconds per package, 
          please don't reload the page while it's installing.
          You will see a message once it's done and progess is logged to the JS-console.`)) return;
    
    // install packages
    let res = packages.reduce((t, c) => t
      .then(() => {
        if (!c.url) {
          // spinner color in 2sxc
          console.log("fail", c);
          return Promise.resolve();
        }
        subject.next(c);
        return this.http.get(`app-sys/installer/installpackage?packageUrl=${c.url}`).toPromise();
      }), Promise.resolve())
      .then(() => subject.complete())
      .catch(e => subject.error(e));
    
    return subject.asObservable();
  }
  
  // processInstallMessage(event, modId: number): Observable<any> {
  //   let regExToCheckOrigin = /^(http|https):\/\/((gettingstarted|[a-z]*)\.)?(2sexycontent|2sxc)\.org(\/.*)?$/gi;
  //   if (!regExToCheckOrigin.test(event.origin)) throw 'Cannot execute. Wrong source domain.';
  //   let data = JSON.parse(event.data);
  //   modId = Number(modId);
  //   if (data.moduleId !== modId) return;
  //   if (data.action === 'install') {
  //     let
  //       packages = data.packages,
  //       packagesDisplayNames = '';

  //     for (var i = 0; i < packages.length; i++) {
  //       packagesDisplayNames += `- ${packages[i].displayName}\n`;
  //     }

  //     if (!confirm(`
  //         Do you want to install these packages?\n\n
  //         ${packagesDisplayNames}\nThis could take 10 to 60 seconds per package, 
  //         please don't reload the page while it's installing.
  //         You will see a message once it's done and progess is logged to the JS-console.`)) return;

  //     return this.runOneInstallJob(packages, 0);
  //   }
  //   else if (data.action === 'resize') this.resizeIFrame(data.height);
  //   return Observable.empty();
  // }

  // private resizeIFrame(height) {
  //   document.getElementById('frGettingStarted').style.height = `${height + 10}px`;
  // }

  // private runOneInstallJob(packages, i): Observable<any> {
  //   var currentPackage = packages[i];
  //   return this.http.get(`app-sys/installer/installpackage?packageUrl=${currentPackage.url}`)
  //     .map(response => {
  //       if (i + 1 < packages.length) {
  //         this.runOneInstallJob(packages, i + 1)
  //           .subscribe(res => { });
  //       } else {
  //         // alert('Installation complete. If you saw no errors, everything worked.');
  //         window.top.location.reload();
  //       }
  //       return response;
  //     })
  //   .catch((e: Response | any) => {
  //     let msg = `Something went wrong while installing "${currentPackage.displayName}" ${status}`;
  //     if (e.responseText && e.responseText !== '') {
  //       let response = JSON.parse(e.responseText);
  //       if (response.messages) msg = `${msg} - ${response.messages[0].Message}`;
  //       else if (response.Message) msg = `${msg} - ${response.Message}`;
  //     }
  //     msg += ` (you might find more information in the DNN event log).`;
  //     alert(msg);
  //     return Observable.throw(e);
  //   });
  // }
}
