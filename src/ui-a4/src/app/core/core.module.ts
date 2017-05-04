import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ModuleApiService } from "app/core/module-api.service";
import { $2sxcService } from "app/core/$2sxc.service";
import { Http, XHRBackend, RequestOptions } from "@angular/http";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  providers: [
    ModuleApiService,
    $2sxcService,
    Http
  ]
})
export class CoreModule { }