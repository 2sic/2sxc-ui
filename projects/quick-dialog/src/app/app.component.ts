import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef } from '@angular/core';
import { DnnAppComponent, Context } from '@2sic.com/dnn-sxc-angular';
import { Config } from './config';
import { SupportedLanguages, langCode2, PrimaryUiLanguage } from './i18n';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'app/core/constants';
import { ContextDto } from './dto/index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends DnnAppComponent {
  constructor(
    public translate: TranslateService,
    el: ElementRef,
    context: Context,
    http: HttpClient
  ) {
    super(el, context.preConfigure({ sxc: Config.getSxcInstance() }), false);
    translate.addLangs(SupportedLanguages);

    http.get<{ Context: ContextDto }>(`${Constants.webApiDialogContext}?appId=${Config.appId()}`)
      .subscribe(ctxDto => {
        const lang = ctxDto.Context.Language;
        translate.setDefaultLang(PrimaryUiLanguage);
        translate.use(langCode2(lang.Current));
      });
  }
}
