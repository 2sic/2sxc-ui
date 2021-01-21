import { ModifierContentBlock, ModifierDnnModule, PositionCoordinates, Positioning, QeSelectors, QuickEditConfig, QuickEditOverlay } from '.';
import { $jq, $original } from '../interfaces/sxc-controller-in-page';
import { HasLog, Insights } from '../logging';

const configAttr: string = 'quick-edit-config';
const classForAddContent = 'sc-content-block-menu-addcontent';
const classForAddApp = 'sc-content-block-menu-addapp';

/**
 * the quick-edit object
 * the quick-insert object
 */
class QuickESingleton extends HasLog {
    body = $jq('body');
    main = $jq("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>") as QuickEditOverlay.Main;
    template =
        `<a class='${classForAddContent} sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>&nbsp;</a>`
        + `<a class='${classForAddApp} sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>&nbsp;</a>`
        + `${QuickEditOverlay.btn('select', 'ok', 'Select', true)}${QuickEditOverlay.btn('paste', 'paste', 'Paste', true, true)}`;
    selected = QuickEditOverlay.selectedOverlay;
    // will be populated later in the module section
    contentBlocks: JQuery = null;
    cachedPanes: JQuery = null;
    modules: JQuery = null;
    nearestCb: PositionCoordinates = null;
    nearestMod: PositionCoordinates = null;
    // add stuff which depends on other values to create
    cbActions = $original(this.template);
    modActions = $original(this.template.replace(/QuickInsertMenu.AddBlock/g, 'QuickInsertMenu.AddModule'))
        .attr('data-context', 'module')
        .addClass('sc-content-block-menu-module');

    //
    config = QuickEditConfig.getNewDefaultConfig();

    bodyOffset: PositionCoordinates;

    constructor() {
        super('Q-E.Main');
        Insights.add('Q-E', 'manager', this.log);
        this.modActions.on('click', ModifierDnnModule.onModuleButtonClick);
        this.cbActions.on('click', ModifierContentBlock.onCbButtonClick);
    }

    start(): void {
        try {
            this.loadPageConfig();
            if (this.config.enable) {
                // initialize first body-offset
                this.bodyOffset = Positioning.getBodyPosition();
                this.enable();
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
        const configs = $jq(`[${configAttr}]`);
        let confJ: string;

        if (configs.length > 0) {
            cl.add('found configs', configs);
            // go through reverse list, as the last is the most important...
            let finalConfig = {} as QuickEditConfig.FullConfig;
            for (let c = configs.length; c >= 0; c--) {
                confJ = configs[0].getAttribute(configAttr);
                try {
                    const confO = JSON.parse(confJ) as Partial<QuickEditConfig.FullConfig>;
                    cl.data('additional config', confO);
                    finalConfig = {...finalConfig, ...confO };
                    cl.data('merged config', finalConfig);
                } catch (e) {
                    cl.add('had trouble with json');
                    console.warn('had trouble with json', e);
                }
            }
            const defConfig = QuickEditConfig.getNewDefaultConfig();
            this.config = {...defConfig, ...finalConfig, buttons: { ...defConfig.buttons, ...finalConfig.buttons }};
            // expand/merge configs on the sub-nodes module/block
            const c = this.config;
            c.innerBlocks.buttons = { ...c?.buttons, ...c?.innerBlocks?.buttons };
            c.modules.buttons = { ...c?.buttons, ...c?.modules?.buttons };
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
        const innerCBs = $jq(QeSelectors.blocks.cb.listSelector);
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

    prepareToolbarInDom(): void {
        const cl = this.log.call('prepareToolbarInDom');
        this.body
            .append(this.main)
            .append(this.selected);
        this.main
            .append(this.cbActions)
            .append(this.modActions);

        // use config to enable/disable some buttons
        QuickEditOverlay.setButtonActivationClasses(this.config.innerBlocks.buttons, this.cbActions);
        QuickEditOverlay.setButtonActivationClasses(this.config.modules.buttons, this.modActions);
        cl.done();
    }


    /**
     * cache the panes which can contain modules
     */
    private initPanes(): void {
        const cl = this.log.call('initPanes');
        this.cachedPanes = $jq(QeSelectors.blocks.mod.listSelector);
        this.cachedPanes.addClass('sc-cb-pane-glow');
        cl.done();
    }


    /**
     * start watching for mouse-move
     */
    private initWatchMouse() {
        const cl = this.log.call('initWatchMouse');
        let refreshTimeout: number = null;
        $jq('body').on('mousemove', (e) => {
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
        this.log.add(`config enabled: ${this.config.enable}, mod: ${this.config.modules.enable}, cb: ${this.config.innerBlocks.enable}. ${JSON.stringify(this.config)})`);
    }

}

export const QuickE = new QuickESingleton();
