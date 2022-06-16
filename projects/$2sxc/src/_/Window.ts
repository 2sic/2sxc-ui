import { SxcGlobal } from '../sxc-global';

/**
 * export interface WindowInternal extends
 */
declare global {
    interface Window {
        /**
         * The global $2sxc object / function to generate Sxc instances
         */
        $2sxc: SxcGlobal;

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
