import * as Public from '../../../sxc-typings/index';
import { SxcRootWithInternals } from '../SxcRoot/SxcRootInternals';

export interface Window extends Public.WindowWith$2sxc { 
    $2sxc: SxcRootWithInternals; 
}

// export interface WindowInternal extends Pub 

declare global {
    interface Window {
        $2sxc : SxcRootWithInternals;
    }
}
