
import {of as observableOf } from 'rxjs';

import {switchMap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'app/core/constants';

@Injectable()
export class InstallerService {

  constructor(
    private http: HttpClient
  ) { }

  installPackages(packages: any[], step: Function): Observable<any> {
    return packages.reduce((t: Observable<Response>, c) => t.pipe(
        switchMap(() => {
          if (!c.url) return observableOf(true);
          step(c);
          return <Observable<any>>this.http.get(`${Constants.webApiInstallPackage}?packageUrl=${c.url}`);
        })), observableOf(true));
  }
}
