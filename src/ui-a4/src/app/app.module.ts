import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TemplatePickerModule } from "app/template-picker/template-picker.module";
import { TemplatePickerComponent } from "app/template-picker/template-picker.component";
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF, Location } from '@angular/common';
import { GettingStartedService } from "app/getting-started.service";

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
    TemplatePickerModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    GettingStartedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }