import { Context } from './context/context.service';
import { SxcApp } from './sxc/sxc-app';
import { DnnInterceptor } from './http/dnn.interceptor';
import { NgModule, Optional, SkipSelf } from '@angular/core';

/**
 * The Root module which must be included in the application root.
 * It ensures that context etc. is singleton across the entire application
 * @export
 * @class DnnSxcRootModule
 */
@NgModule({
  imports: [
    // Note: it's extremely important that HttpClientModule is _not_ imported
    // anywhere. Otherwise it will break sub-modules
    // because it will create a new HttpClientModule which won't have the interceptor
    // HttpClientModule,
  ],
  providers: [
    SxcApp,
    Context,
    DnnInterceptor,
  ]
})


export class DnnSxcRootModule {

  // This constructor is a special helper to prevent use in sub-modules
  // https://angular.io/guide/singleton-services#prevent-reimport-of-the-greetingmodule
  constructor(@Optional() @SkipSelf() parentModule?: DnnSxcRootModule) {
    if (parentModule)
      throw new Error('DnnSxcRootModule is already loaded. Import it in the root AppModule only');
  }
}
