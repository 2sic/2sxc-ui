/*
  Primary exports
  The exports here must be chosen wisely, because they should really only contain the publicly used / created / typed objects.
*/

// ------------------------- Modules -------------------------

// The root module which should be in the application root
export { DnnSxcRootModule } from "./dnn-sxc-root.module";

// The data module
// export { SxcDataModule} from './sxc-data.module';

// The content-manager module with toolbars and content-management functionality
export { ContentManagerModule } from "./content-manager.module";


// ------------------------- Modules -------------------------

export { DnnAppComponent } from './dnn-app.component'
export * from './context';
export * from './sxc';
export { DnnInterceptor } from './http/dnn.interceptor';

export { SxcToolbarDirective } from "./beta/edit"
export { SxcTagToolbarDirective } from "./toolbar/tag-toolbar"
