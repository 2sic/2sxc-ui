import { prepareToAddContent } from './templates';

/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 *
 * Maybe ToDo 2cb:
 * 2sxc should have one entry point (interface to browser context) only.
 * Otherwise, we cannot know, when which part will be executed and debugging becomes very difficult.
 *
 */
export class MainContentBlock {
  // constants
  static cViewWithoutContent: string = '_LayoutElement'; // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
  static cUseExistingTemplate = -1;
  prepareToAddContent = prepareToAddContent;
  //updateTemplateFromDia = updateTemplateFromDia;
}

/**
 * The main content-block manager
 */
// ReSharper disable once InconsistentNaming
export let _contentBlock = new MainContentBlock();
