import * as Public from '../../../typings/index';
import { SxcRootInternals } from '../SxcRoot/SxcRootInternals';
import { SxcRoot } from '../SxcRoot/SxcRoot';

export interface Window extends Public.WindowWith$2sxc { 
    $2sxc: SxcRoot & SxcRootInternals; 
}
