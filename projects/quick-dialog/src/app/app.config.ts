import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { SxcHttpInterceptorProvider } from "@2sic.com/sxc-angular";
import { HttpClient, withInterceptorsFromDi, provideHttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { i18nExtension, pathToI18n } from "./i18n";

export function HttpLoaderFactory(http: HttpClient) {
  const loader = new TranslateHttpLoader(http, pathToI18n, i18nExtension);
  // log.add('created translate-loader', loader);
  return loader;
}

export const appConfig: ApplicationConfig = {
  providers: [
    SxcHttpInterceptorProvider,
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
