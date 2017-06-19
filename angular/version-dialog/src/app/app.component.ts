import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DialogComponent } from "app/dialog.component";

@Component({
  selector: 'app-root',
  template: '',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private dialog: MdDialog
  ) {
    this.dialog.open(DialogComponent);
  }
}
