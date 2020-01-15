import { JsInfo } from './JsInfo';
import { Log } from '../tools/Log';
import { EnvironmentMetaLoader } from './envMetaLoader';
export declare class Environment {
    private header;
    ready: boolean;
    source: string;
    log: Log;
    metaLoader: EnvironmentMetaLoader;
    constructor();
    load(newJsInfo: JsInfo, source?: string): void;
    api(): string;
    apiRoot(name: string): string;
    page(): number;
    rvt(): string;
    private ensureReadyOrThrow;
}
