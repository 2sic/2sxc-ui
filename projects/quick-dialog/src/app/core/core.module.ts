import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { $2sxcService } from 'app/core/$2sxc.service';
import { HttpClientModule } from '@angular/common/http';
import { GettingStartedService } from 'app/installer/getting-started.service';
import { PickerService } from 'app/template-picker/picker.service';
import { CurrentDataService } from 'app/template-picker/current-data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    GettingStartedService,
    PickerService,
    CurrentDataService,
    $2sxcService,
  ]
})
export class CoreModule { }
