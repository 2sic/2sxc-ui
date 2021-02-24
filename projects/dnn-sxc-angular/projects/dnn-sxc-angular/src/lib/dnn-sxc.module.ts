import { BrowserModule } from '@angular/platform-browser';
import { Context } from './context/context.service';
import { Data } from './sxc/data';
import { DnnInterceptor } from './http/dnn.interceptor';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    // Note: it's extremely important that HttpClientModule is _not_ imported
    // anywhere. Otherwise it will break sub-modules
    // because it will create a new HttpClientModule which won't have the interceptor
    // HttpClientModule,
    BrowserModule
  ],
  providers: [
    Data,
    Context,
    DnnInterceptor,
  ]
})
export class DnnSxcModule { }
