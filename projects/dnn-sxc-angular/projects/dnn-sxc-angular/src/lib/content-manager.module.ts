import { Context } from './context/context.service';
import { Data } from './sxc/data';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SxcToolbarDirective } from './beta/edit';
// important: for funny reasons this must really got to the real path - if you get it from '.' index it will fail building
import { SxcTagToolbarDirective } from './toolbar/tag-toolbar';

@NgModule({
  imports: [
    HttpClientModule
  ],
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
