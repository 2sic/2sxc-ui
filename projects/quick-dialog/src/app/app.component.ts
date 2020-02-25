import { TranslateService } from '@ngx-translate/core';
import { Component, Inject } from '@angular/core';
import { DialogComponent } from 'app/version-dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { IDialogFrameElement } from './interfaces-shared/idialog-frame-element';
import { log } from './core/log';

declare const window, $2sxc;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: string;

  constructor(
    public translate: TranslateService,
    private dialog: MatDialog,
  ) {
    const langs = ['en', 'de', 'es', 'fr', 'it', 'nl', 'uk'];
    translate.addLangs(langs);
    translate.setDefaultLang($2sxc.urlParams.require('langpri').split('-')[0]);
    translate.use($2sxc.urlParams.require('lang').split('-')[0]);
    this.name = $2sxc.urlParams.require('dialog');
    log.add(`loading '${this.name}'`);
    const frame = <IDialogFrameElement>window.frameElement;
    if (this.name === 'item-history') {
      this.dialog.open(DialogComponent).afterClosed()
      // todo 2dm - probably change to cancel()
        .subscribe(() => frame.bridge.hide());
    }
  }
}
