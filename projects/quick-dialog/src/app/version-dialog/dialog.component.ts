import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { SxcVersionsService } from 'app/version-dialog/sxc-versions.service';
import { Version } from 'app/version-dialog/version';

declare const $2sxc;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  versions: Version[] = [];
  versionParam: any;

  constructor(
    private dialog: MatDialog,
    public sxcVersion: SxcVersionsService
  ) { }

  restoreLive(version: Version) {
    this.sxcVersion.restore(version.ChangeSetId)
      .subscribe(res => res ? window.parent.location.reload() : alert('restore failed miserably'));
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
        <button mat-button [mat-dialog-close]="false">abort</button>
        <span fxFlex></span>
        <button mat-raised-button [mat-dialog-close]="true">proceed</button>
      </div>
    </div>
  `,
})
export class ConfirmRestoreDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmRestoreDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
