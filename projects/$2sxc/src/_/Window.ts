import { SxcRoot, WindowWith$2sxc } from '../plumbing';

/** @internal */
export interface Window extends WindowWith$2sxc {
    $2sxc: SxcRoot;
    // debugger;
    $: JQueryStatic & DnnJQueryExtensions;
}

// export interface WindowInternal extends
/** @internal */
declare global {
    interface Window {
        $2sxc: SxcRoot;
    }
}

/** @internal */
interface DnnJQueryExtensions {
    /** the generator for the DNN ServicesFramework */
    dnnSF: (id?: number) => any;
    /** The DNN Services Framework */
    ServicesFramework: (id: number) => any;
}
