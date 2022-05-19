import { WindowWith$2sxc } from '../plumbing';
import { SxcRootWithInternals } from '../sxc-root/sxc-root-internals';

/** @internal */
export interface Window extends WindowWith$2sxc {
    $2sxc: SxcRootWithInternals;
    // debugger;
    $: JQueryStatic & DnnJQueryExtensions;
}

// export interface WindowInternal extends
/** @internal */
declare global {
    interface Window {
        $2sxc: SxcRootWithInternals;
    }
}

/** @internal */
interface DnnJQueryExtensions {
    /** the generator for the DNN ServicesFramework */
    dnnSF: (id?: number) => any;
    /** The DNN Services Framework */
    ServicesFramework: (id: number) => any;
}
