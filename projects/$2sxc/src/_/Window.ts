import * as Public from '../../../sxc-typings/index';
import { SxcRootWithInternals } from '../sxc-root/sxc-root-internals';

export interface Window extends Public.WindowWith$2sxc {
    $2sxc: SxcRootWithInternals;
    // debugger;
    $: JQueryStatic & DnnJQueryExtensions;
    // debugger;
    $2sxc_jQSuperlight: JQueryStatic;
}

// export interface WindowInternal extends
declare global {
    interface Window {
        $2sxc: SxcRootWithInternals;
    }
}

interface DnnJQueryExtensions {
    /** the generator for the DNN ServicesFramework */
    dnnSF: (id?: number) => any;
    /** The DNN Services Framework */
    ServicesFramework: (id: number) => any;
}
