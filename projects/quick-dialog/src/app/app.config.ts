import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { SxcHttpInterceptorProvider } from "@2sic.com/sxc-angular";
import { HttpClient, withInterceptorsFromDi, provideHttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { i18nExtension, pathToI18n, PrimaryUiLanguage } from "./i18n";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";

// 2pp: Implemented a custom loader to handle missing translation files gracefully
// Otherwise, the app would show: HttpErrorResponse {headers: HttpHeaders, status: 404, statusText: 'Not Found',
// Docs don't mention this: https://ngx-translate.org/recipes/handle-missing-translations/
// But it seems to be a common issue with the library. See: https://github.com/ngx-translate/core/issues/1002
export class CustomTranslateLoader extends TranslateHttpLoader {
  override getTranslation(lang: string) {
    return super.getTranslation(lang).pipe(
      catchError(() => {
        console.warn(`Translation file for '${lang}' not found. Using fallback '${PrimaryUiLanguage}'.`);
        return of({});
      })
    );
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  const loader = new CustomTranslateLoader(http, pathToI18n, i18nExtension);
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
