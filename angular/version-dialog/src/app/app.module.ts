import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdDialogModule, MdToolbarModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { DialogComponent, ConfirmRestoreDialog, ConfirmRestoreDraftDialog } from './dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ConfirmRestoreDialog,
    ConfirmRestoreDraftDialog
  ],
  entryComponents: [
    DialogComponent,
    ConfirmRestoreDialog,
    ConfirmRestoreDraftDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdDialogModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
