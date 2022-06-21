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
    }
}
