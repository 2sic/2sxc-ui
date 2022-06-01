import { WindowWith$2sxc } from '../plumbing';
import { $2sxcGlobal } from '../sxc-root';

/** @internal */
export interface Window extends WindowWith$2sxc {
    $2sxc: $2sxcGlobal;
    // debugger;
    $: JQueryStatic & DnnJQueryExtensions;
}

// export interface WindowInternal extends
/** @internal */
declare global {
    interface Window {
        $2sxc: $2sxcGlobal;
    }
}

/** @internal */
interface DnnJQueryExtensions {
    /** the generator for the DNN ServicesFramework */
    dnnSF: (id?: number) => any;
    /** The DNN Services Framework */
    ServicesFramework: (id: number) => any;
}
