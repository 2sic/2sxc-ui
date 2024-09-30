import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplatePickerComponent } from './template-picker.component';
import { TemplateFilterPipe } from './template-filter.pipe';
import { CoreModule } from 'app/core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstallerModule } from 'app/installer/installer.module';
import { DebugPipe } from './debug.pipe';
import { ContentTypesProcessor } from './data/content-types-processor.service';
import { MaterialModule } from 'app/material-module';
import { FilterByPropertyValuePipe, FilterByBoolPropertyPipe } from './filter-by-property-value.pipe';

@NgModule({
  exports: [
    TemplatePickerComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTabsModule,
    MaterialModule,
    MatProgressBarModule,
    CoreModule,
    FormsModule,
    FlexLayoutModule,
    InstallerModule,
    TranslateModule,
  ],
  providers: [
    TemplateFilterPipe,
    ContentTypesProcessor
  ],
  declarations: [
    TemplatePickerComponent,
    TemplateFilterPipe,
    DebugPipe,
    FilterByPropertyValuePipe,
    FilterByBoolPropertyPipe,
  ]
})
export class TemplatePickerModule { }
