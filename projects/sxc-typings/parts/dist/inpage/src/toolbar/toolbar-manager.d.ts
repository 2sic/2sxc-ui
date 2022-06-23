import { ContextComplete } from '../context/bundles/context-bundle-button';
import { HasLog } from '../core';
import { ToolbarConfigLoader } from './config-loaders/toolbar-config-loader';
import { Toolbar } from './config/toolbar';
import { ToolbarInitConfig } from './initialize/toolbar-init-config';
/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 * @internal
 */
export declare class ToolbarManager extends HasLog {
    /** Singleton */
    static singleton(): ToolbarManager;
    private static _singleton;
    private readonly toolbarFinder;
    private constructor();
    buildModule(parentTag: HTMLElement): void;
    build(node: HTMLElement): void;
    loadConfig(context: ContextComplete, config: ToolbarInitConfig): Toolbar;
    /** Generate a single-use loader. It must be single use so the logs work */
    getLoader(instanceName: string): ToolbarConfigLoader;
}
