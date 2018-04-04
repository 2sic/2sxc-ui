import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs/Rx";
import { Http } from "@angular/http";
import { Subject } from "rxjs/Subject";

declare const confirm: any;
declare const window: any;

@Injectable()
export class InstallerService {

  constructor(
    private http: Http
  ) { }

  installPackages(packages: any[], step: Function): Observable<any> {
    return packages.reduce((t: Observable<Response>, c) => t
        .switchMap(() => {
          if (!c.url) return Observable.of(true);
          step(c);
          return <Observable<any>>this.http.get(`app-sys/installer/installpackage?packageUrl=${c.url}`);
        }), Observable.of(true));
  }
}
