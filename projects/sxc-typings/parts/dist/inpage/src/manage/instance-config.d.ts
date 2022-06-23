import { ContextComplete } from '../context/bundles/context-bundle-button';
/**
 * used to build instance config
 * @internal
 */
export declare class InstanceConfig {
    tabId: number;
    moduleId: number;
    version: string;
    contentGroupId: string;
    cbId: number;
    appPath: string;
    isList: boolean;
    static fromContext(contextOfButton: ContextComplete): InstanceConfig;
}
