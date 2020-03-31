import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallerComponent } from './installer.component';
import { InstallerService } from 'app/installer/installer.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
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