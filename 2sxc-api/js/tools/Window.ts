import * as Public from '../../../typings/index';
import { SxcRootInternals } from '../SxcRoot/SxcRootInternals';
import { SxcRoot } from '../SxcRoot/SxcRoot';

export interface Window extends Public.Window { 
    $2sxc: SxcRoot & SxcRootInternals; 
}
