import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TemplatePickerModule } from "app/template-picker/template-picker.module";
import { TemplatePickerComponent } from "app/template-picker/template-picker.component";
import { RouterModule } from "@angular/router";

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
  providers: [{ provide: "windowObject", useValue: window }],
  bootstrap: [AppComponent]
})
export class AppModule { }