import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

declare const $2sxc: any;

@Injectable()
export class $2sxcService {
  sxc: any;
  constructor(
    private route: ActivatedRoute
  ) {
    this.sxc = $2sxc(route.snapshot.queryParams['appId']);
  }
}