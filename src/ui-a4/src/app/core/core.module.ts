import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from "@angular/router";
import { ModuleApiService } from "app/core/module-api.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [],
  providers: [
    ModuleApiService
  ]
})
export class CoreModule { }