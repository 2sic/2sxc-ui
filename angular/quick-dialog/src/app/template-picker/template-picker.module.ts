import { TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdMenuModule, MdTabsModule, MdProgressBarModule, MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplatePickerComponent } from './template-picker.component';
import { TemplateFilterPipe } from './template-filter.pipe';
import { CoreModule } from 'app/core/core.module';
import { ContentTypeFilterPipe } from './content-type-filter.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstallerModule } from 'app/installer/installer.module';
import { DebugPipe } from './debug.pipe';
import { ContentTypeSortPipe } from './data/content-type-sort.pipe';

@NgModule({
  exports: [
    TemplatePickerComponent
  ],
  imports: [
    CommonModule,
    MdMenuModule,
    MdTabsModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdProgressBarModule,
    CoreModule,
    FormsModule,
    FlexLayoutModule,
    InstallerModule,
    TranslateModule
  ],
  providers: [
    TemplateFilterPipe,
  ],
  declarations: [
    TemplatePickerComponent,
    TemplateFilterPipe,
    ContentTypeFilterPipe,
    DebugPipe,
    // ContentTypeSortPipe
  ]
})
export class TemplatePickerModule { }