import {TranslateModule} from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SxcVersionsService } from "app/version-dialog/sxc-versions.service";
import { DialogComponent, ConfirmRestoreDialog } from "app/version-dialog/dialog.component";
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  exports: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    TranslateModule
  ],
  providers: [
    SxcVersionsService
  ],
  declarations: [
    DialogComponent,
    ConfirmRestoreDialog
  ],
  entryComponents: [
    DialogComponent,
    ConfirmRestoreDialog,
  ],
})
export class VersionDialogModule { }
