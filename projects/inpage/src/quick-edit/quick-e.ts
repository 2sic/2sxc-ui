import { ModifierContentBlock, ModifierDnnModule, PositionCoordinates, Positioning, QeSelectors } from '.';
import { HasLog, Insights } from '../logging';


function btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?: boolean, classes?: string): string {
    return `<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-${icon} ${invisible ? ' sc-invisible ' : ''}${
      unavailable ? ' sc-unavailable ' : ''}${classes}' data-action='${action
      }' data-i18n='[title]QuickInsertMenu.${i18N}'></a>`;
  }

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

function getNewDefaultConfig(): QuickEdit.QuickEConfiguration {
    return {
        enable: true,
        innerBlocks: {
            enable: null, // default: auto-detect
        },
        modules: {
            enable: null, // default: auto-detect
        },
    } as QuickEdit.QuickEConfiguration;
}

/**
 * the quick-edit object
 * the quick-insert object
 */
class QuickESingleton extends HasLog {
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
    config = getNewDefaultConfig();

    bodyOffset: PositionCoordinates;

    constructor() {
        super('Q-E.Main');
        Insights.add('Q-E', 'manager', this.log);
        this.modActions.click(ModifierDnnModule.onModuleButtonClick);
        this.cbActions.click(ModifierContentBlock.onCbButtonClick);
    }

    prepareToolbarInDom(): void {
        const cl = this.log.call('prepareToolbarInDom');
        this.body
            .append(this.main)
            .append(this.selected);
        this.main
            .append(this.cbActions)
            .append(this.modActions);
        cl.done();
    }

    start(): void {
        try {
            this.loadPageConfig();
            if (this.config.enable) {
                // initialize first body-offset
                this.bodyOffset = Positioning.getBodyPosition();
                this.enable();
                // this.toggleParts();
                this.initWatchMouse();
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
        const cl = this.log.call('reset');
        this.loadPageConfig();
        // this.toggleParts();
        cl.done();
    }


    /**
     * This checks if the page has any alternate configuration
     * Note that it's also used after ajax refreshes, which can change the config
     * So if it does reconfigure itself, it will start with the default config again
     */
    loadPageConfig() {
        const cl = this.log.call('loadPageConfig', null, null, {config: this.config});
        this.logConfig();
        const configs = $(`[${configAttr}]`);
        let confJ: string;

        if (configs.length > 0) {
            cl.add('found configs', configs);
            // go through reverse list, as the last is the most important...
            let finalConfig = {} as QuickEdit.QuickEConfiguration;
            for (let c = configs.length; c >= 0; c--) {
                confJ = configs[0].getAttribute(configAttr);
                try {
                    const confO = JSON.parse(confJ) as QuickEdit.QuickEConfiguration;
                    cl.data('additional config', confO);
                    finalConfig = {...finalConfig, ...confO };
                    cl.data('merged config', finalConfig);
                } catch (e) {
                    cl.add('had trouble with json');
                    console.warn('had trouble with json', e);
                }
            }
            this.config = {...getNewDefaultConfig(), ...finalConfig};
        } else
            cl.add('no configs found, will use exiting');

        this.logConfig();

        this.detectWhichMenusToActivate();

        cl.done();
    }



    

    /**
     * existing inner blocks found? Will affect if modules can be quick-inserted...
     */
    private detectWhichMenusToActivate() {
        const conf = this.config;
        const cl = this.log.call('detectWhichMenusToActivate');
        const innerCBs = $(QeSelectors.blocks.cb.listSelector);
        const hasInnerCBs = (innerCBs.length > 0);
        cl.add(`has Content Blocks marked with ${QeSelectors.blocks.cb.listSelector}: ${hasInnerCBs}`, innerCBs);
        // if it has inner-content, then it's probably a details page, where quickly adding modules would be a problem, so for now, disable modules in this case
        if (conf.modules.enable === null || conf.modules.enable === 'auto')
            conf.modules.enable = !hasInnerCBs;
        // for now, ContentBlocks are only enabled if they exist on the page
        if (conf.innerBlocks.enable === null || conf.innerBlocks.enable === 'auto')
            conf.innerBlocks.enable = hasInnerCBs;
        cl.add(`module.enable: ${conf.modules.enable}`);
        cl.add(`innerBlocks.enable: ${conf.innerBlocks.enable}`);
        cl.done();
    }

    private enable(): void {
        const cl = this.log.call('enable');
        // build all toolbar html-elements
        this.prepareToolbarInDom();
        // Cache the panes (because panes can't change dynamically)
        this.initPanes();
        cl.done();
    }


    /**
     * cache the panes which can contain modules
     */
    private initPanes(): void {
        const cl = this.log.call('initPanes');
        this.cachedPanes = $(QeSelectors.blocks.mod.listSelector);
        this.cachedPanes.addClass('sc-cb-pane-glow');
        cl.done();
    }


    /**
     * start watching for mouse-move
     */
    private initWatchMouse() {
        const cl = this.log.call('initWatchMouse');
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
        cl.done();
    }

    private logConfig() {
        this.log.add(`config enabled: ${this.config.enable}, mod: ${this.config.modules.enable}, cb: ${this.config.innerBlocks.enable}`);
    }

}

export const QuickE = new QuickESingleton();



// 2020-04-10 2dm - disabled all this - it didn't do anything before, and doesn't seem needed
// tried to rewrite but it only causes problems and really seems unneeded. 

// /**
//  * enable/disable module/content-blocks as configured
//  * TODO: 2dm - unclear why this is commented out, probably a bug that was never fixed
//  */
// function toggleParts(): void {
//     //// content blocks actions
//     // quickE.cbActions.toggle(quickE.config.innerBlocks.enable);

//     //// module actions
//     // quickE.modActions.hide(quickE.config.modules.enable);
// }


    // /**
    //  * enable/disable module/content-blocks as configured
    //  * TODO: 2dm - unclear why this is commented out, probably a bug that was never fixed
    //  */
    // private toggleParts(): void {
    //     const cl = this.log.call('toggleParts', 'disabled!!');
    //     // content blocks actions
    //     const cbMenuState = !!this.config.innerBlocks.enable;
    //     const modMenuState = !!this.config.modules.enable;
    //     cl.add(`cbMenuState: ${cbMenuState}, modMenuState: ${modMenuState}`);
    //     // this.cbActions.toggle(cbMenuState);

    //     // module actions
    //     // TODO: 2020-04-10 2dm - not sure why the previous code did a .hide(this.config.modules.enable)
    //     // this.modActions.toggle(modMenuState);
    //     // if (modMenuState)
    //     //     this.modActions.hide();
    //     cl.done();
    // }