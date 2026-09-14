/*
  Primary exports
  The exports here must be chosen wisely, because they should really only contain the publicly used / created / typed objects.
*/

export { initializeSxc, provideSxc } from './provide-sxc';
export type { SxcConfig } from './provide-sxc';
export * from './context';
export * from './sxc';
export { SxcToolbarDirective } from './beta/edit';
export { SxcTagToolbarDirective } from './toolbar/tag-toolbar';
