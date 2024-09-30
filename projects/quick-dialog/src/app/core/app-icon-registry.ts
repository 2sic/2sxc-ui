import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable()
export class AppIconsService {
  constructor(private matIconRegistry: MatIconRegistry) { }

  load() {
    // v18.01 - changing to Material Symbols
    // this.matIconRegistry.setDefaultFontSetClass('material-icons-outlined');
    this.matIconRegistry.setDefaultFontSetClass('material-symbols-outlined');

    console.log('2dm: Loading App Icons');
  }
}
