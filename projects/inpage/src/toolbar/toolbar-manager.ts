// import { context } from '../context/context';
import { ToolbarRenderer } from '.';
import { ToolbarConfigFinderAndInitializer } from '.';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog, Insights, Log } from '../logging';
import { ToolbarConfigLoader } from './config-loaders/toolbar-config-loader';
import { Toolbar } from './config/toolbar';
import { ToolbarInitConfig } from './initialize/toolbar-init-config';

/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 */
class ToolbarManagerGlobal extends HasLog {
    private readonly toolbarFinder: ToolbarConfigFinderAndInitializer;

    constructor() {
        super('Tlb.Mngr', null, 'init');
        Insights.add('system', 'toolbar-manager', this.log);
        this.toolbarFinder = new ToolbarConfigFinderAndInitializer(this);
    }

    buildModule(parentTag: JQuery, optionalId?: number) {
        this.toolbarFinder.buildDnnModule(parentTag, optionalId);
    }

    build(node: JQuery) {
        this.toolbarFinder.build(node);
    }

    // generate button html
    generateButtonHtml(context: ContextComplete, groupIndex: number) {
        new ToolbarRenderer(context).button.render(context, groupIndex);
    }

    generateToolbarHtml(context: ContextComplete) {
        return new ToolbarRenderer(context).render();
    }

    loadConfig(context: ContextComplete, config: ToolbarInitConfig): Toolbar {
        const loader = this.getLoader(JSON.stringify(config.toolbar || ''));
        return loader.load(context, config);
    }

    /** Generate a single-use loader. It must be single use so the logs work */
    getLoader(instanceName: string) {
        const loader = new ToolbarConfigLoader(this);
        Insights.add('toolbar', instanceName, loader.log);
        return loader;
    }
}

export const ToolbarManager = new ToolbarManagerGlobal();
