import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TemplatePickerComponent } from './template-picker.component';
import { TemplatesPipe } from './templates.pipe';
import { CoreModule } from "app/core/core.module";

@NgModule({
  exports: [
    TemplatePickerComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  declarations: [TemplatePickerComponent, TemplatesPipe]
})
export class TemplatePickerModule { }
