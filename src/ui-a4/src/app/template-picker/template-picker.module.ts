import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplatePickerComponent } from './template-picker.component';
import { TemplateFilterPipe } from './template-filter.pipe';
import { CoreModule } from "app/core/core.module";
import { ContentTypeFilterPipe } from './content-type-filter.pipe';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  exports: [
    TemplatePickerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [TemplateFilterPipe],
  declarations: [TemplatePickerComponent, TemplateFilterPipe, ContentTypeFilterPipe]
})
export class TemplatePickerModule { }
