import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ModuleApiService } from "app/core/module-api.service";
import { $2sxcService } from "app/core/$2sxc.service";
import { HttpModule, XHRBackend, RequestOptions } from "@angular/http";
import { Http2sxc } from "app/core/http-interceptor.service";

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, sxc: $2sxcService) {
  return  new Http2sxc(backend, defaultOptions, sxc);
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    ModuleApiService,
    $2sxcService,
    {
      provide: Http2sxc,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, $2sxcService],
    }
  ]
})
export class CoreModule { }