// Temporary workaround - must be changed as it's really just to get it to compile again
// afterwards I must reduce the imports to the things I'm actually using

import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
const MATERIAL_MODULES = [
// MatAutocompleteModule,
MatButtonModule,
// MatButtonToggleModule,
// MatCardModule,
// MatChipsModule,
// MatCheckboxModule,
// MatDatepickerModule,
// MatTableModule,
MatDialogModule,
MatExpansionModule,
// MatFormFieldModule,
// MatGridListModule,
MatIconModule,
// MatInputModule,
// MatListModule,
// MatMenuModule,
// MatPaginatorModule,
MatProgressBarModule,
MatProgressSpinnerModule,
// MatRippleModule,
// MatSelectModule,
// MatSidenavModule,
// MatSliderModule,
// MatSlideToggleModule,
// MatSnackBarModule,
// MatSortModule,
// MatStepperModule,
MatTabsModule,
MatToolbarModule,
// MatTooltipModule,
// OverlayModule,
// PortalModule,
// BidiModule,
// A11yModule,
// MatCommonModule,
// ObserversModule
];
@NgModule({
imports: MATERIAL_MODULES,
// declarations: [MatExpansionPanel, MatRadioButton],
exports: MATERIAL_MODULES,
})
export class MaterialModule { }
