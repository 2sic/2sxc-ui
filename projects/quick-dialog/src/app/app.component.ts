import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef } from '@angular/core';
import { HistoryComponent } from 'app/history/history.component';
import { MatDialog } from '@angular/material/dialog';
import { IDialogFrameElement } from './interfaces-shared/idialog-frame-element';
import { log } from './core/log';
import { DnnAppComponent, Context } from '@2sic.com/dnn-sxc-angular';
import { SxcRoot } from '../../../sxc-typings';
import { Config } from './config';
import { SupportedLanguages, langCode2, PrimaryUiLanguage } from './i18n';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'app/core/constants';
import { ContextDto } from './dto/index';

declare const window: any, $2sxc: SxcRoot;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends DnnAppComponent {
  // name is used in template
  public name: string;

  constructor(
    public translate: TranslateService,
    private dialog: MatDialog,
    el: ElementRef,
    context: Context,
    http: HttpClient
  ) {
    super(el, context.preConfigure({ sxc: Config.getSxcInstance() }), false);
    translate.addLangs(SupportedLanguages);

    http.get<{ Context: ContextDto }>(`${Constants.apiDialogCtx}?appId=${Config.appId()}`)
      .subscribe(ctxDto => {
        const lang = ctxDto.Context.Language;
        translate.setDefaultLang(PrimaryUiLanguage);
        translate.use(langCode2(lang.Current));
        this.showDialog();
      });
  }

  private showDialog() {
    this.name = Config.dialog();
    log.add(`loading '${this.name}'`);
    const frame = <IDialogFrameElement>window.frameElement;
    if (this.name === 'item-history') {
      this.dialog.open(HistoryComponent).afterClosed()
        .subscribe(() => frame.bridge.hide());
    }
  }
}
