import { CbOrMod } from './cb-or-mod';

/**
 * selectors used all over the in-page-editing, centralized to ensure consistency
 */

const contentBlockAndModuleSelectors: { [key: string ]: CbOrMod} = {
    cb: {
            id: 'cb',
            class: 'sc-content-block',
            selector: '.sc-content-block',
            listSelector: '.sc-content-block-list',
            context: 'data-list-context',
            singleItem: 'single-item',
        } as CbOrMod,
        mod: {
            id: 'mod',
            class: 'DnnModule',
            selector: '.DnnModule',
            // Found no better way to get all panes - the hidden variable does not exist when not in edit page mode
            listSelector: '.DNNEmptyPane, .dnnDropEmptyPanes, :has(>.DnnModule)',
            context: null,
        } as CbOrMod,
 };

export const selectors = {
  blocks:contentBlockAndModuleSelectors,
  eitherCbOrMod: '.DnnModule, .sc-content-block',
  selected: 'sc-cb-is-selected',
};
