import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http2sxc } from "app/core/http-interceptor.service";

@Injectable()
export class GettingStartedService {

  constructor(
    private http: Http2sxc
  ) { }
  
  processInstallMessage(event, modId): Observable<any> {
    var regExToCheckOrigin = /^(http|https):\/\/((gettingstarted|[a-z]*)\.)?(2sexycontent|2sxc)\.org(\/.*)?$/gi;
    if (!regExToCheckOrigin.test(event.origin)) throw 'Cannot execute. Wrong source domain.';
    var data = JSON.parse(event.data);
    modId = Number(modId);
    if (data.moduleId !== modId) return;
    if (data.action === "install") {
      var packages = data.packages;
      var packagesDisplayNames = "";
      for (var i = 0; i < packages.length; i++) {
        packagesDisplayNames += "- " + packages[i].displayName + "\n";
      }
      if (confirm(`
          Do you want to install these packages?\n\n
          ${packagesDisplayNames}\nThis could take 10 to 60 seconds per package, 
          please don't reload the page while it's installing.
          You will see a message once it's done and progess is logged to the JS-console.`)) {
        
        return this.runOneInstallJob(packages, 0);
      }
    }
    else if (data.action === "resize") this.resizeIFrame(modId, data.height);
    return Observable.empty();
  }

  private resizeIFrame(modId, height) {
    document.getElementById("frGettingStarted").style.height = (height + 10) + "px";
  }

  private runOneInstallJob(packages, i): Observable<any> {
    var currentPackage = packages[i];
    console.log(`${currentPackage.displayName} (${i}) started`);
    return this.http.get(`app-sys/installer/installpackage?packageUrl=${currentPackage.url}`)
      .map(response => {
        console.log(`${currentPackage.displayName} (${i}) completed`);
        if (i + 1 < packages.length) {
          this.runOneInstallJob(packages, i + 1)
            .subscribe(res => { });
        } else {
          alert("Done installing. If you saw no errors, everything worked.");
          window.top.location.reload();
        }
        return response;
      })
      .catch((e: Response | any) => {
        console.error(e);
        var errorMessage = "Something went wrong while installing '" + currentPackage.displayName + "': " + status;
        if (e.responseText && e.responseText !== "") {
          var response = JSON.parse(e.responseText);
          if (response.messages)
            errorMessage = errorMessage + " - " + response.messages[0].Message;
          else if (response.Message)
            errorMessage = errorMessage + " - " + response.Message;
        }
        errorMessage += ` (you might find more informations about the error in the DNN event log).`;
        alert(errorMessage);
        return Observable.throw(e);
      });
  }
}
