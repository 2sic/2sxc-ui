// import { context } from '../context/context';
import { ToolbarRenderer } from '.';
import { ToolbarConfigFinderAndInitializer } from '.';
import { ContextBundleButton } from '../context/bundles/context-bundle-button';
import { $2sxcInPage } from '../interfaces/sxc-controller-in-page';
import { HasLog, Log } from '../logging';
import { ToolbarConfigLoader } from './config-loaders/toolbar-config-loader';
import { Toolbar } from './config/toolbar';
import { ToolbarInitConfig } from './initialize/toolbar-init-config';
import { Insights } from '../insights/insights';

/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 */
class ToolbarManagerGlobal extends HasLog {
    private readonly toolbarFinder: ToolbarConfigFinderAndInitializer;

    /** Contains a log for each toolbar which was initialized */
    // logs = new Array<{ key: string, log: Log}>();

    constructor(parentLog: Log) {
        super('Tlb.Mngr', parentLog, 'init');
        this.toolbarFinder = new ToolbarConfigFinderAndInitializer(this);
    }

    buildModule(parentTag: JQuery, optionalId?: number) {
        this.toolbarFinder.buildDnnModule(parentTag, optionalId);
    }

    build(node: JQuery) {
        this.toolbarFinder.build(node);
    }

    // generate button html
    generateButtonHtml(context: ContextBundleButton, groupIndex: number) {
        new ToolbarRenderer(context).button.render(context, groupIndex);
    }

    generateToolbarHtml(context: ContextBundleButton) {
        return new ToolbarRenderer(context).render();
    }

    loadConfig(context: ContextBundleButton, config: ToolbarInitConfig): Toolbar {
        const loader = new ToolbarConfigLoader(this);
        Insights.add('toolbars', JSON.stringify(config.toolbar || ''), loader.log);
        // this.logs.push({ key: JSON.stringify(config.toolbar || ''), log: loader.log });
        return loader.load(context, config.toolbar, config.settings);
    }

// 2020-03-20 2dm - seems unused
//   toolbarTemplate = ToolbarTemplateManager.Instance(this.log).get('default');
}

// 2dm 2018-03-22 this seems to be unused
// const sharedTbm = new ToolbarManager(null);
export const ToolbarManager = new ToolbarManagerGlobal(null);

// attach to global object, so we can check the logs if we need them
$2sxcInPage._toolbarManager = ToolbarManager;
