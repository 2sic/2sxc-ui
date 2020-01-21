import { SxcRootInternals } from '../SxcRoot/SxcRootInternals';
import { SxcRoot } from '../SxcRoot/SxcRoot';

export interface Window { 
    $2sxc: SxcRoot & SxcRootInternals; 
}
