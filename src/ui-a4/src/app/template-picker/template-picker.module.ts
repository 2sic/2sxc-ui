import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplatePickerComponent } from './template-picker.component';
import { TemplateFilterPipe } from './template-filter.pipe';
import { CoreModule } from "app/core/core.module";
import { ContentTypeFilterPipe } from './content-type-filter.pipe';
import { FlexLayoutModule } from "@angular/flex-layout";
import { Http, XHRBackend, RequestOptions } from "@angular/http";
import { HttpInterceptorService } from "app/http-interceptor.service";
import { ActivatedRoute, Router } from "@angular/router/src";
import { $2sxcService } from "app/core/$2sxc.service";

@NgModule({
  exports: [
    TemplatePickerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [
    TemplateFilterPipe,
    {
      provide: Http,
      useFactory(backend: XHRBackend, options: RequestOptions, sxc: $2sxcService) {
        return new HttpInterceptorService(backend, options, sxc);
      },
      deps: [XHRBackend, RequestOptions, $2sxcService]
    }],
  declarations: [TemplatePickerComponent, TemplateFilterPipe, ContentTypeFilterPipe]
})
export class TemplatePickerModule { }