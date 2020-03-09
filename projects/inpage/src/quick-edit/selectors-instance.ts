import { CbOrMod } from './cb-or-mod';
import { Selectors } from './selectors';

/**
 * selectors used all over the in-page-editing, centralized to ensure consistency
 */
export const selectors = {
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
    listSelector:
      '.DNNEmptyPane, .dnnDropEmptyPanes, :has(>.DnnModule)', // Found no better way to get all panes - the hidden variable does not exist when not in edit page mode
    context: null,
  } as CbOrMod,
  eitherCbOrMod: '.DnnModule, .sc-content-block',
  selected: 'sc-cb-is-selected',
} as Selectors;
