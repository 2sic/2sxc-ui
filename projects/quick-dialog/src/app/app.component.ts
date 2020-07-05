import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef } from '@angular/core';
import { DialogComponent } from 'app/version-dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IDialogFrameElement } from './interfaces-shared/idialog-frame-element';
import { log } from './core/log';
import { DnnAppComponent, Context } from '@2sic.com/dnn-sxc-angular';
import { SxcRoot } from '../../../sxc-typings';
import { Config } from './config';
import { SupportedLanguages } from './i18n';

declare const window: any, $2sxc: SxcRoot;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends DnnAppComponent {
  name: string;

  constructor(
    public translate: TranslateService,
    private dialog: MatDialog,
    el: ElementRef,
    context: Context
  ) {
    super(el, context.preConfigure({ sxc: Config.getSxcInstance() }), false);
    translate.addLangs(SupportedLanguages);
    translate.setDefaultLang(Config.langPri());
    translate.use(Config.lang());
    this.name = Config.dialog();
    log.add(`loading '${this.name}'`);
    const frame = <IDialogFrameElement>window.frameElement;
    if (this.name === 'item-history') {
      this.dialog.open(DialogComponent).afterClosed()
        .subscribe(() => frame.bridge.hide());
    }
  }
}
