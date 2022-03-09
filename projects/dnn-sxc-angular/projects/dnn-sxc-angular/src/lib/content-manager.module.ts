import { Sxc } from './sxc/sxc-data';
import { NgModule } from '@angular/core';
import { SxcToolbarDirective } from './beta/edit';
// important: for funny reasons this must really got to the real path - if you get it from '.' index it will fail building
import { SxcTagToolbarDirective } from './toolbar/tag-toolbar';

/**
 * This module provides content-editing / management features to Angular.
 * It ensures that you can use attributes like sxc-toolbar
 * and tags like <sxc-toolbar>
 *
 * @export
 * @class ContentManagerModule
 */
@NgModule({
  declarations: [
    SxcToolbarDirective,
    SxcTagToolbarDirective,
  ],
  providers: [
    Sxc,
  ],
  exports: [
    SxcToolbarDirective,
    SxcTagToolbarDirective,
  ]
})
export class ContentManagerModule { }
