import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { TemplatePickerModule } from "app/template-picker/template-picker.module";
import { TemplatePickerComponent } from "app/template-picker/template-picker.component";
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF, Location } from '@angular/common';
import { HttpInterceptorService } from "app/http-interceptor.service";

const appRoutes = [
  {
    path: '',
    component: TemplatePickerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TemplatePickerModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    { provide: "windowObject", useValue: window },
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }