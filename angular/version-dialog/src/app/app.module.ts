import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule, MdDialogModule, MdToolbarModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { VersionDialogModule } from "app/version-dialog/version-dialog.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdDialogModule,
    MdToolbarModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    VersionDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
