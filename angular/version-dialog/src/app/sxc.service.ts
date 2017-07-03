import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class SxcService {
  params: Observable<SxcParams>;
  
  private paramsSubject: ReplaySubject<SxcParams>;
  private appIdSubject: Subject<number>;
  private tabIdSubject: Subject<number>;
  private cbIdSubject: Subject<number>;
  private modIdSubject: Subject<number>;
  
  constructor() {
    this.paramsSubject = new ReplaySubject<SxcParams>();
    this.params = this.paramsSubject.asObservable();

    Observable.forkJoin([
      this.appIdSubject = new Subject<number>(),
      this.tabIdSubject = new Subject<number>(),
      this.cbIdSubject = new Subject<number>(),
      this.modIdSubject = new Subject<number>(),
    ])
      .map(res => <SxcParams>{
        appId: res[0],
        tabId: res[1],
        cbId: res[2],
        modId: res[3],
      })
      .subscribe(params => this.paramsSubject.next(params));
  }
}

class SxcParams {
  appId: number;
  tabId: number;
  cbId: number;
  modId: number;
}