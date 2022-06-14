/**
 * This just holds some constants, but it looks like _LayoutElement is unused - but I think it should be!
 * @internal
 */
export class ContentBlock {
// constants
static cViewWithoutContent: string = '_LayoutElement'; // needed to differentiate the "select item" from the "empty-is-selected" which are both empty
static UseExistingTemplate = -1;
}


/**
 * ContentBlock constants
 * @internal
 */
export const ContentBlockIds = {
    classes: {
    name: 'sc-content-block',
    },
    selectors: {
    ofName: '.sc-content-block',
    },
};
