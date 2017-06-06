import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdMenuModule, MdTabsModule, MdProgressBarModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplatePickerComponent } from './template-picker.component';
import { TemplateFilterPipe } from './template-filter.pipe';
import { CoreModule } from "app/core/core.module";
import { ContentTypeFilterPipe } from './content-type-filter.pipe';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ActivatedRoute, Router } from "@angular/router/src";
import { $2sxcService } from "app/core/$2sxc.service";
import { InstallerModule } from "app/installer/installer.module";

declare const $2sxc: any;
const appId = $2sxc.urlParams.require('appId');

@NgModule({
  exports: [
    TemplatePickerComponent
  ],
  imports: [
    CommonModule,
    MdMenuModule,
    MdTabsModule,
    BrowserAnimationsModule,
    MdProgressBarModule,
    CoreModule,
    FormsModule,
    FlexLayoutModule,
    InstallerModule
  ],
  providers: [
    TemplateFilterPipe
  ],
  declarations: [TemplatePickerComponent, TemplateFilterPipe, ContentTypeFilterPipe]
})
export class TemplatePickerModule { }