/*
  Primary exports
  The exports here must be chosen wisely, because they should really only contain the publicly used / created / typed objects.
*/

export { provideSxc } from './provide-sxc';
export { SxcInitializer } from './sxc-initializer.service';
export type { SxcConfig } from './sxc-initializer.service';
export * from './context';
export * from './sxc';
/** @internal */ export { SxcHttpInterceptorProvider } from './http/sxc.interceptor-provider';
export { SxcToolbarDirective } from './beta/edit';
export { SxcTagToolbarDirective } from './toolbar/tag-toolbar';
