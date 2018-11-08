import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { $2sxcService } from 'app/core/$2sxc.service';
import { HttpModule } from '@angular/http';
import { Http2SxcHttpProvider } from 'app/core/http-interceptor.service.provider';
import { GettingStartedService } from 'app/installer/getting-started.service';
import { PickerService } from 'app/template-picker/picker.service';
import { CurrentDataService } from 'app/template-picker/current-data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    GettingStartedService,
    PickerService,
    CurrentDataService,
    $2sxcService,
    Http2SxcHttpProvider,
  ]
})
export class CoreModule { }
