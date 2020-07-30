import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ]
})
export class CoreModule { }
