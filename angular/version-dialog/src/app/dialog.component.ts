import { Component, OnInit, Input, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { trigger, style, transition, animate, state } from "@angular/animations";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('detailAnim', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '49px' })),
      transition('1 => 0', animate('.2s ease')),
      transition('0 => 1', animate('.2s ease'))
    ])
  ]
})
export class DialogComponent {
  versions: Version[] = [
    {
      version: 19,
      timestamp: '2017-04-02 12:42',
      user: 'Daniel01',
      data: [{
        label: 'Title',
        value: 'Blogging about 2017'
      }, {
        label: 'Released',
        value: '2017-06-03'
      }, {
        label: 'Content',
        value: 'lorem ipsum dolor sit..'
      }]
    }, {
      version: 18,
      timestamp: '2017-03-28 17:04',
      user: 'Daniel01',
      data: [{
        label: 'Title',
        value: 'Blogging about 2017'
      }, {
        label: 'Released',
        value: '2017-06-03'
      }, {
        label: 'Content',
        value: 'lorem ipsum dolor sit..'
      }]
    }, {
      version: 17,
      timestamp: '2017-03-26 08:09',
      user: 'Daniel01',
      data: [{
        label: 'Title',
        value: 'Blogging about 2017'
      }, {
        label: 'Released',
        value: '2017-06-03'
      }, {
        label: 'Content',
        value: 'lorem ipsum dolor sit..'
      }]
    }, {
      version: 16,
      timestamp: '2017-03-25 10:25',
      user: 'Daniel01',
      data: [{
        label: 'Title',
        value: 'Blogging about 2017'
      }, {
        label: 'Released',
        value: '2017-06-03'
      }, {
        label: 'Content',
        value: 'lorem ipsum dolor sit..'
      }]
    }
  ];

  selected: Version;
  focused: Version;

  constructor(
    private dialog: MdDialog
  ) {
  }

  selectOrDeselect($event, version) {
    this.selected = $event.checked ? version : undefined;
  }

  focusOrBlur(version) {
    this.focused = this.focused === version ? undefined : version;
  }

  restoreLive(version) {
    this.dialog
      .open(ConfirmRestoreDialog, {
        data: { version },
      }).afterClosed()
      .subscribe(res => res ? alert('restoring live') : undefined);
  }

  restoreDraft(version) {
    this.dialog.open(ConfirmRestoreDialog, {
      data: { version, isDraft: true },
    }).afterClosed()
    .subscribe(res => res ? alert('restoring draft') : undefined);
  }
}

@Component({
  selector: 'confirm-restore-dialog',
  template: `
    <div class="content">
      <div class="title">Restoring {{data.isDraft ? 'draft' : 'live'}} to version <b>{{data.version.version}}</b>.</div>
      <div fxLayout="row">
        <button md-button [md-dialog-close]="false">abort</button>
        <span fxFlex></span>
        <button md-raised-button [md-dialog-close]="true">proceed</button>
      </div>
    </div>
  `,
})
export class ConfirmRestoreDialog {
  constructor(
    public dialogRef: MdDialogRef<ConfirmRestoreDialog>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }
}

class Version {
  version: number;
  timestamp: string;
  user: string;
  data: [{
    label: string;
    value: string;
  }];
}