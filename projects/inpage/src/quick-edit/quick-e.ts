import { ModifierContentBlock, ModifierDnnModule, PositionCoordinates, Positioning, QeSelectors } from '.';

const configAttr: string = 'quick-edit-config';
const classForAddContent = 'sc-content-block-menu-addcontent';
const classForAddApp = 'sc-content-block-menu-addapp';
const selectedOverlay = $("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
    .append(
    btn('delete', 'trash-empty', 'Delete'),
    btn('sendToPane', 'move', 'Move', null, null, 'sc-cb-mod-only'),
    "<div id='paneList'></div>",
    ) as QuickEdit.SelectionOverlay;

selectedOverlay.toggleOverlay = (target: boolean | JQuery) => {
    if (!target || (target as JQuery).length === 0) {
      selectedOverlay.hide();
    } else {
      const coords = Positioning.get(target as JQuery);
      coords.yh = coords.y + 20;
      Positioning.positionAndAlign(selectedOverlay, coords);
      selectedOverlay.target = target as JQuery;
    }
};

/**
 * the quick-edit object
 * the quick-insert object
 */
class QuickESingleton {
    body = $('body');
    win = $(window);
    main = $("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>") as QuickEdit.MainOverlay;
    template =
        `<a class='${classForAddContent} sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>x</a>`
        + `<a class='${classForAddApp} sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>x</a>`
        + `${btn('select', 'ok', 'Select', true)}${btn('paste', 'paste', 'Paste', true, true)}`;
    selected = selectedOverlay;
    // will be populated later in the module section
    contentBlocks: JQuery = null;
    cachedPanes: JQuery = null;
    modules: JQuery = null;
    nearestCb: PositionCoordinates = null;
    nearestMod: PositionCoordinates = null;
    // add stuff which depends on other values to create
    cbActions = $(this.template);
    modActions = $(this.template.replace(/QuickInsertMenu.AddBlock/g, 'QuickInsertMenu.AddModule'))
        .attr('data-context', 'module')
        .addClass('sc-content-block-menu-module');

    //
    config: QuickEdit.QuickEConfiguration = {
        enable: true,
        innerBlocks: {
          enable: null, // default: auto-detect
        },
        modules: {
          enable: null, // default: auto-detect
        },
    };

    bodyOffset: PositionCoordinates;

    constructor() {
        this.modActions.click(ModifierDnnModule.onModuleButtonClick);
        this.cbActions.click(ModifierContentBlock.onCbButtonClick);
    }

    prepareToolbarInDom(): void {
        this.body
            .append(this.main)
            .append(this.selected);
        this.main
            .append(this.cbActions)
            .append(this.modActions);
    }

    start(): void {
        try {
            this.loadPageConfig();
            if (this.config.enable) {
                // initialize first body-offset
                this.bodyOffset = Positioning.getBodyPosition();
                enable();
                toggleParts();
                watchMouse();
            }
        } catch (e) {
            console.error("couldn't start quick-edit", e);
        }
    }
    /**
     * reset the quick-edit
     * for example after ajax-loading a content-block, which may cause changed configurations
     */
    reset(): void {
        this.loadPageConfig();
        toggleParts();
    }

    loadPageConfig() {
        let conf = this.config;
        const configs = $(`[${configAttr}]`);
        let confJ: string;

        // a.ny inner blocks found? will currently affect if modules can be inserted...
        const hasInnerCBs = ($(QeSelectors.blocks.cb.listSelector).length > 0);

        if (configs.length > 0) {
            // go through reverse list, as the last is the most important...
            let finalConfig = {} as QuickEdit.QuickEConfiguration;
            for (let c = configs.length; c >= 0; c--) {
                confJ = configs[0].getAttribute(configAttr);
                try {
                    const confO = JSON.parse(confJ) as QuickEdit.QuickEConfiguration;
                    finalConfig = {...finalConfig, ...confO };
                } catch (e) {
                    console.warn('had trouble with json', e);
                }
            }
            conf = this.config = {...conf, ...finalConfig};
        }

        // re-check "auto" or "null"
        // if it has inner-content, then it's probably a details page, where quickly adding modules would be a problem, so for now, disable modules in this case
        if (conf.modules.enable === null || conf.modules.enable === 'auto')
            conf.modules.enable = !hasInnerCBs;

        // for now, ContentBlocks are only enabled if they exist on the page
        if (conf.innerBlocks.enable === null || conf.innerBlocks.enable === 'auto')
            conf.innerBlocks.enable = hasInnerCBs;
    }

}

export const QuickE = new QuickESingleton();




function btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?: boolean, classes?: string): string {
  return `<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-${icon} ${invisible ? ' sc-invisible ' : ''}${
    unavailable ? ' sc-unavailable ' : ''}${classes}' data-action='${action
    }' data-i18n='[title]QuickInsertMenu.${i18N}'></a>`;
}


function enable(): void {
    // build all toolbar html-elements
    QuickE.prepareToolbarInDom();
    // Cache the panes (because panes can't change dynamically)
    initPanes();
}

/**
 * start watching for mouse-move
 */
function watchMouse() {
    let refreshTimeout: number = null;
    $('body').on('mousemove', (e) => {
        if (refreshTimeout === null)
            refreshTimeout = window.setTimeout(() => {
                requestAnimationFrame(() => {
                    Positioning.refresh(e);
                    refreshTimeout = null;
                });
            },
            20);
        });
}

/**
 * cache the panes which can contain modules
 */
function initPanes(): void {
    QuickE.cachedPanes = $(QeSelectors.blocks.mod.listSelector);
    QuickE.cachedPanes.addClass('sc-cb-pane-glow');
}

/**
 * enable/disable module/content-blocks as configured
 * TODO: 2dm - unclear why this is commented out, probably a bug that was never fixed
 */
function toggleParts(): void {
    //// content blocks actions
    // quickE.cbActions.toggle(quickE.config.innerBlocks.enable);

    //// module actions
    // quickE.modActions.hide(quickE.config.modules.enable);
}


