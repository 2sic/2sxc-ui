import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TemplatePickerModule } from 'app/template-picker/template-picker.module';
import { VersionDialogModule } from 'app/version-dialog/version-dialog.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './xtempUpgrading/material-module';
import { log } from './core/log';

export function HttpLoaderFactory(http: HttpClient) {
  const loader = new TranslateHttpLoader(http, '../i18n/sxc-admin-', '.js');
  log.add('created translate-loader', loader);
  return loader;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [ ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TemplatePickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MaterialModule, // must be after BrowserModule
    VersionDialogModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }