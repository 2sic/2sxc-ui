import { JsInfo } from './JsInfo';
import { EnvironmentMetaLoader } from './envMetaLoader';
import { HasLog } from '../logging/HasLog';
export declare class Environment extends HasLog {
    private header;
    ready: boolean;
    source: string;
    metaLoader: EnvironmentMetaLoader;
    constructor();
    load(newJsInfo: JsInfo, source?: string): void;
    api(): string;
    apiRoot(name: string): string;
    page(): number;
    rvt(): string;
    private ensureReadyOrThrow;
}
