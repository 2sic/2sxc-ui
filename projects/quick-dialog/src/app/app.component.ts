import { TranslateService } from '@ngx-translate/core';
import { Component, ElementRef } from '@angular/core';
import { DialogComponent } from 'app/version-dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IDialogFrameElement } from './interfaces-shared/idialog-frame-element';
import { log } from './core/log';
import { DnnAppComponent, Context } from '@2sic.com/dnn-sxc-angular';

declare const window, $2sxc;

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
    super(el, context.preConfigure(
      {
        sxc: $2sxc($2sxc.urlParams.require('mid'), $2sxc.urlParams.require('cbid'))
      }), false);
    const langs = ['en', 'de', 'es', 'fr', 'it', 'nl', 'uk'];
    translate.addLangs(langs);
    translate.setDefaultLang($2sxc.urlParams.require('langpri').split('-')[0]);
    translate.use($2sxc.urlParams.require('lang').split('-')[0]);
    this.name = $2sxc.urlParams.require('dialog');
    log.add(`loading '${this.name}'`);
    const frame = <IDialogFrameElement>window.frameElement;
    if (this.name === 'item-history') {
      this.dialog.open(DialogComponent).afterClosed()
        .subscribe(() => frame.bridge.hide());
    }
  }
}
