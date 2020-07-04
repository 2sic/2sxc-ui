import { Injectable } from '@angular/core';

declare const $2sxc: any;

@Injectable()
export class $2sxcService {
  sxc: any;

  constructor() {
    this.sxc = $2sxc($2sxc.urlParams.require('mid'), $2sxc.urlParams.require('cbid'));
  }
}
