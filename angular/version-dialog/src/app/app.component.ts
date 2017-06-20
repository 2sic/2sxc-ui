import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DialogComponent } from "app/dialog.component";

declare const window;

@Component({
  selector: 'app-root',
  template: '',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private dialog: MdDialog
  ) {
    this.dialog.open(DialogComponent).afterClosed()
      .subscribe(() => window.parent.postMessage('closeFrame', window.origin));
  }
}
