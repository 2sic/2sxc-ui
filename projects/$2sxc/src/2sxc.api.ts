// this is the 2sxc-javascript API
// 2sxc will include this automatically when a user has edit-rights
// a template developer will typically use this to use the data-api to read 2sxc-data from the server
// read more about this in the wiki: https://github.com/2sic/2sxc/wiki/JavaScript-%242sxc

// Keep our super-slimmed down jQuery for AJAX
import './jquery-ajax/ajax203.js'
import { Window } from './_/Window';
import { buildSxcRoot } from './SxcRoot/sxc-root-builder';

declare const window: Window;

if (!window.$2sxc) // prevent double execution
  window.$2sxc = buildSxcRoot();
