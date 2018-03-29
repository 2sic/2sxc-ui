import { TranslateService } from '@ngx-translate/core';
import { Component, Inject } from '@angular/core';
import { IDialogFrameElement } from "app/core/dialog-frame-element";
import { DialogComponent } from "app/version-dialog/dialog.component";
import { MdDialog } from "@angular/material";

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
    private dialog: MdDialog,
  ) {
    console.log("init app component");
    const langs = ['en','de','es','fr','it','nl','uk'];
    translate.addLangs(langs);
    translate.setDefaultLang($2sxc.urlParams.require('langpri').split('-')[0]);
    translate.use($2sxc.urlParams.require('lang').split('-')[0]);
    this.name = $2sxc.urlParams.require('dialog');
    const frame = <IDialogFrameElement>window.frameElement;
    if (this.name === 'item-history') {
      this.dialog.open(DialogComponent).afterClosed()
        .subscribe(() => frame.toggle(false));
    }
  }
}
