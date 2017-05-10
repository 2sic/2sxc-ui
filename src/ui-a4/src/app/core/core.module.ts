import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ModuleApiService } from "app/core/module-api.service";
import { $2sxcService } from "app/core/$2sxc.service";
import { HttpModule, XHRBackend, RequestOptions } from "@angular/http";
import { Http2sxc } from "app/core/http-interceptor.service";
import { Http2SxcHttpProvider } from "app/core/http-interceptor.service.provider";

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
    Http2SxcHttpProvider,
  ]
})
export class CoreModule { }