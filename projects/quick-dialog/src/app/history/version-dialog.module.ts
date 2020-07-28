import {TranslateModule} from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SxcVersionsService } from './sxc-versions.service';
import { HistoryComponent } from './history.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'app/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [
    HistoryComponent
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
    HistoryComponent,
  ],
  entryComponents: [
    HistoryComponent,
  ],
})
export class VersionDialogModule { }
