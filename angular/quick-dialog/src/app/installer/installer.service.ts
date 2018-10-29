
import {of as observableOf,  Subject } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs/Rx";
import { Http } from "@angular/http";

declare const confirm: any;
declare const window: any;

@Injectable()
export class InstallerService {

  constructor(
    private http: Http
  ) { }

  installPackages(packages: any[], step: Function): Observable<any> {
    return packages.reduce((t: Observable<Response>, c) => t.pipe(
        switchMap(() => {
          if (!c.url) return observableOf(true);
          step(c);
          return <Observable<any>>this.http.get(`app-sys/installer/installpackage?packageUrl=${c.url}`);
        })), observableOf(true));
  }
}
