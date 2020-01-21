import { Environment } from './Environment';
export declare class EnvironmentDnnSfLoader {
    env: Environment;
    constructor(env: Environment);
    dnnSfFallback(): void;
    private dnnSfLoadWhenDocumentReady;
}
