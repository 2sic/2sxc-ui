import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TemplatePickerModule } from 'app/template-picker/template-picker.module';
import { VersionDialogModule } from 'app/version-dialog/version-dialog.module';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, '../i18n/sxc-admin-', '.js');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [],
  imports: [
    BrowserModule,
    FormsModule,
    TemplatePickerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    VersionDialogModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }