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
    const
      subject = new Subject<any>(),
      res = packages.reduce((t: Observable<Response>, c) => t
        .switchMap(() => {
          if (!c.url) return Observable.from([true]);
          subject.next(c);
          return <Observable<any>>this.http.get(`app-sys/installer/installpackage?packageUrl=${c.url}`);
        }), Observable.from([true]))
        .subscribe(() => subject.complete(), e => subject.error(e));
        
    return subject.asObservable();
  }
}
