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
    translate.addLangs(["en", "fr"]);
    translate.setDefaultLang('en');
    
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.name = $2sxc.urlParams.require('dialog');

    let frame = <IDialogFrameElement>window.frameElement;
    if (this.name === 'item-history') {
      this.dialog.open(DialogComponent).afterClosed()
        .subscribe(() => frame.toggle(false));
    }
  }
}