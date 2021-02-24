import { Context } from './context/context.service';
import { Data } from './sxc/data';
import { NgModule } from '@angular/core';
import { SxcToolbarDirective } from './beta/edit';
// important: for funny reasons this must really got to the real path - if you get it from '.' index it will fail building
import { SxcTagToolbarDirective } from './toolbar/tag-toolbar';

@NgModule({
  // Note: it's extremely important that HttpClientModule is _not_ imported
  // anywhere. Otherwise it will break sub-modules
  // because it will create a new HttpClientModule which won't have the interceptor
  // imports: [
  //   HttpClientModule
  // ],
  declarations: [
    SxcToolbarDirective,
    SxcTagToolbarDirective,
  ],
  providers: [
    Context,
    Data,
  ],
  exports: [
    SxcToolbarDirective,
    SxcTagToolbarDirective,
  ]
})
export class ContentManagerModule { }
