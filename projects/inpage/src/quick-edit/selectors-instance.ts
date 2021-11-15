/**
 * selectors used all over the in-page-editing, centralized to ensure consistency
 */

const contentBlockAndModuleSelectors: { [key: string]: CbOrMod } = {
    cb: {
        id: 'cb',
        class: 'sc-content-block',
        selector: '.sc-content-block',
        findAllLists: () => Array.from(document.querySelectorAll<HTMLElement>('.sc-content-block-list')),
        findClosestList: (element: HTMLElement) => element.closest<HTMLElement>('.sc-content-block-list'),
        context: 'data-list-context',
        singleItem: 'single-item',
    },
    mod: {
        id: 'mod',
        class: 'DnnModule',
        selector: '.DnnModule',
        // Found no better way to get all panes - the hidden variable does not exist when not in edit page mode
        findAllLists: () => {
            // jquery :has selector (https://api.jquery.com/has-selector/) is not a compatible with css selector
            // and doesn't work without jquery (https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
            // and has absolutely terrible performance (380-560 ms)
            // $('.DNNEmptyPane, .dnnDropEmptyPanes, :has(>.DnnModule)')

            // compact javascript solution is still very slow (10-15 ms)
            // Array.from(document.querySelectorAll('*')).filter((e) => e.matches('.DNNEmptyPane, .dnnDropEmptyPanes') || Array.from(e.children).some((c) => c.matches('.DnnModule')))

            // as fast as can be (3-5 ms)
            const found: HTMLElement[] = [];
            const all = document.querySelectorAll<HTMLElement>('*');
            for (let i = 0; i < all.length; i++) {
                const el = all[i];
                if (el.matches('.DNNEmptyPane, .dnnDropEmptyPanes')) {
                    found.push(el);
                    continue;
                }
                const children = el.children;
                for (let j = 0; j < children.length; j++) {
                    const child = children[j];
                    if (child.matches('.DnnModule')) {
                        found.push(el);
                        break;
                    }
                }
            }
            return found;
        },
        findClosestList: (element: HTMLElement) => {
            if (!element) return null;
            if (element.matches('.DNNEmptyPane, .dnnDropEmptyPanes')) {
                return element;
            }
            for (let i = 0; i < element.children.length; i++) {
                const child = element.children[i];
                if (child.matches('.DnnModule')) {
                    return element;
                }
            }
            return contentBlockAndModuleSelectors.mod.findClosestList(element.parentElement);
        },
        context: null,
    },
};

export const QeSelectors = {
    blocks: contentBlockAndModuleSelectors,
    eitherCbOrMod: '.DnnModule, .sc-content-block',
    selected: 'sc-cb-is-selected',
};


/**
 * Structure for constants in the selectors, to guarantee we got everything
 */
interface CbOrMod {
    id: string;
    class: string;
    selector: string;
    findAllLists: () => HTMLElement[];
    findClosestList: (element: HTMLElement) => HTMLElement;
    context: string;
    singleItem?: string;
}
