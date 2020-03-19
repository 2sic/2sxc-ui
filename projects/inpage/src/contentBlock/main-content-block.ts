/*
 * This just holds some constants, but it looks like _LayoutElement is unused - but I think it should be!
 */
export class MainContentBlock {
  // constants
  static cViewWithoutContent: string = '_LayoutElement'; // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
  static cUseExistingTemplate = -1;
}
