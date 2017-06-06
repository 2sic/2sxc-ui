import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TemplatePickerModule } from "app/template-picker/template-picker.module";
import { TemplatePickerComponent } from "app/template-picker/template-picker.component";
import { RouterModule } from "@angular/router";

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, "../i18n/lib/angular-locale_", ".json");
}

const appRoutes = [
  {
    path: '',
    component: TemplatePickerComponent
  },
  {
    path: 'index.html',
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }