import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

declare const $2sxc: any;

@Injectable()
export class $2sxcService {
  sxc: any;
  constructor(
    private route: ActivatedRoute
  ) {
    let params = route.snapshot.queryParams;
    this.sxc = $2sxc(params['mid'], params['cbid']);
  }
}