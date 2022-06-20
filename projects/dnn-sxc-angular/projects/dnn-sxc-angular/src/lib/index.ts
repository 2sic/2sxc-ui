/*
  Primary exports
  The exports here must be chosen wisely, because they should really only contain the publicly used / created / typed objects.
*/

// ------------------------- Modules -------------------------

// The root module which should be in the application root
/** @internal */ export { SxcRootModule } from './sxc-root.module';

// The data module
// export { SxcDataModule} from './sxc-data.module';

// The content-manager module with toolbars and content-management functionality
/** @internal */ export { ContentManagerModule } from './content-manager.module';


// ------------------------- Modules -------------------------

/** @internal */ export { SxcAppComponent } from './sxc-app.component';
/** @internal */ export * from './context';
/** @internal */ export * from './sxc';
/** @internal */ export { SxcHttpInterceptorProvider } from './http/sxc.interceptor-provider';

/** @internal */ export { SxcToolbarDirective } from './beta/edit';
/** @internal */ export { SxcTagToolbarDirective } from './toolbar/tag-toolbar';
