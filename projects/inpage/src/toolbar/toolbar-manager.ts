import { ToolbarConfigFinderAndInitializer } from '.';
import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog, Insights } from '../logging';
import { ToolbarConfigLoader } from './config-loaders/toolbar-config-loader';
import { Toolbar } from './config/toolbar';
import { ToolbarInitConfig } from './initialize/toolbar-init-config';

/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 */
export class ToolbarManager extends HasLog {

    /** Singleton */
    public static singleton(): ToolbarManager {
        return this._singleton ?? (this._singleton = new ToolbarManager());
    }
    private static _singleton: ToolbarManager;

    private readonly toolbarFinder: ToolbarConfigFinderAndInitializer;

    private constructor() {
        super('Tlb.Mngr', null, 'init');
        Insights.add('system', 'toolbar-manager', this.log);
        this.toolbarFinder = new ToolbarConfigFinderAndInitializer(this);
    }

    buildModule(parentTag: HTMLElement) {
        this.toolbarFinder.buildDnnModule(parentTag);
    }

    build(node: HTMLElement) {
        this.toolbarFinder.build(node);
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

// export const ToolbarManager = new ToolbarManagerGlobal();
