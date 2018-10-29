import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule, MatTabsModule, MatProgressBarModule, /* Materialmodule */ } from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplatePickerComponent } from './template-picker.component';
import { TemplateFilterPipe } from './template-filter.pipe';
import { CoreModule } from 'app/core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstallerModule } from 'app/installer/installer.module';
import { DebugPipe } from './debug.pipe';
import { ContentTypesProcessor } from './data/content-types-processor.service';
import { MaterialModule } from 'app/xtempUpgrading/material-module';

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
    TranslateModule
  ],
  providers: [
    TemplateFilterPipe,
    ContentTypesProcessor
  ],
  declarations: [
    TemplatePickerComponent,
    TemplateFilterPipe,
    DebugPipe,
  ]
})
export class TemplatePickerModule { }
