import { $2sxcGlobal } from '../sxc-root';

/** @internal */
export interface Window {
    $2sxc: $2sxcGlobal;
    // debugger;
    /** @internal */
    $: JQueryStatic & DnnJQueryExtensions;
}

// export interface WindowInternal extends
declare global {
    interface Window {
        $2sxc: $2sxcGlobal;

        /** @internal */
        $: JQueryStatic & DnnJQueryExtensions;
    }
}

/** @internal */
interface DnnJQueryExtensions {
    /** the generator for the DNN ServicesFramework */
    dnnSF: (id?: number) => any;
    /** The DNN Services Framework */
    ServicesFramework: (id: number) => any;
}
