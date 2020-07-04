import {TranslateModule} from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SxcVersionsService } from 'app/version-dialog/sxc-versions.service';
import { DialogComponent, ConfirmRestoreDialog } from 'app/version-dialog/dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'app/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    TranslateModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    SxcVersionsService,
  ],
  declarations: [
    DialogComponent,
    ConfirmRestoreDialog,
  ],
  entryComponents: [
    DialogComponent,
    ConfirmRestoreDialog,
  ],
})
export class VersionDialogModule { }
