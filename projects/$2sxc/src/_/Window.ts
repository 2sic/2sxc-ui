import * as Public from '../../../sxc-typings/index';
import { SxcRootWithInternals } from '../sxc-root/sxc-root-internals';

export interface Window extends Public.WindowWith$2sxc { 
    $2sxc: SxcRootWithInternals; 
}

// export interface WindowInternal extends
declare global {
    interface Window {
        $2sxc : SxcRootWithInternals;
    }
}
