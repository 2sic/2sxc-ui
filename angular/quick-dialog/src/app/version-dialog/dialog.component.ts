import { Component, OnInit, Input, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { trigger, style, transition, animate, state } from "@angular/animations";
import { SxcVersionsService } from "app/version-dialog/sxc-versions.service";
import { Version } from "app/version-dialog/version";

declare const $2sxc;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  versions: Version[] = [];

  constructor(
    private dialog: MdDialog,
    public sxcVersion: SxcVersionsService
  ) { }

  restoreLive(version: Version) {
    this.dialog
      .open(ConfirmRestoreDialog, {
        data: { version },
      })
      .afterClosed()
      .subscribe(res => res
        ? this.sxcVersion.restore(version.ChangeSetId)
          .subscribe(res => res ? window.parent.location.reload() : alert('restore failed miserably'))
        : undefined);
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
      <div class="title">Restoring {{data.isDraft ? 'draft' : 'live'}} to version <b>{{data.version.ChangeSetId}}</b>.</div>
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