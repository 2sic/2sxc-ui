import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SxcHttpInterceptorProvider } from '@2sic.com/sxc-angular';
import { AppComponent } from './app.component';
import { TemplatePickerModule } from 'app/template-picker/template-picker.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module';
import { log } from './core/log';
import { pathToI18n, i18nExtension } from './i18n';

export function HttpLoaderFactory(http: HttpClient) {
  const loader = new TranslateHttpLoader(http, pathToI18n, i18nExtension);
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
  ],
  providers: [SxcHttpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
