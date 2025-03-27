import { TranslateService } from "@ngx-translate/core";
import { Component, ElementRef } from "@angular/core";
import { SxcAppComponent, Context } from "@2sic.com/sxc-angular";
import { Config } from "./config";
import { SupportedLanguages, langCode2, PrimaryUiLanguage } from "./i18n";
import { BackendSettings } from "./core/backend-settings";
import { AppIconsService } from "./core/app-icon-registry";
import { TemplatePickerComponent } from "./template-picker/template-picker.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [AppIconsService],
  imports: [TemplatePickerComponent]
})
export class AppComponent extends SxcAppComponent {
  constructor(
    public translate: TranslateService,
    el: ElementRef,
    context: Context,
    backendSettings: BackendSettings,
    iconService: AppIconsService
  ) {
    super(el, context.preConfigure({ sxc: Config.getSxcInstance() }), false);
    translate.addLangs(SupportedLanguages);

    backendSettings.setApp(Config.appId());

    backendSettings.data.subscribe((ctxDto) => {
      const lang = ctxDto.Language;
      translate.setDefaultLang(PrimaryUiLanguage);
      translate.use(langCode2(lang.Current));
    });

    iconService.load();
  }
}
