import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallerComponent } from './installer.component';
import { InstallerService } from "app/installer/installer.service";
import { MdProgressBarModule, MaterialModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MdProgressBarModule,
  ],
  exports: [
    InstallerComponent
  ],
  declarations: [
    InstallerComponent
  ],
  providers: [
    InstallerService
  ]
})
export class InstallerModule { }