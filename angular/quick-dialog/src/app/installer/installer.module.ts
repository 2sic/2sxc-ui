import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallerComponent } from './installer.component';
import { InstallerService } from "app/installer/installer.service";
import { MdProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdProgressSpinnerModule,
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