import { SxcGlobal } from '../sxc-global';
/**
 * Expand the global namespace to ensure Window has $2sxc
 */
declare global {
    /**
     * Window is extended with a `$2sxc` property, which is a reference to the global $2sxc object.
     */
    interface Window {
        /**
         * The global $2sxc object / function to generate Sxc instances
         */
        $2sxc: SxcGlobal;
    }
}
