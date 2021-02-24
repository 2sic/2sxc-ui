import { BrowserModule } from '@angular/platform-browser';
import { Context } from './context/context.service';
import { Data } from './sxc/data';
import { DnnInterceptor } from './http/dnn.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    Data,
    Context,
    DnnInterceptor,
  ]
})
export class DnnSxcModule { }
