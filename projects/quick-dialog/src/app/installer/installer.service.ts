
import {of as observableOf } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http } from "@angular/http";


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