import { SxcControllerInternals } from '../$2sxc/SxcControllerInternals';
import { SxcController } from '../$2sxc/SxcController';
import { SxcRootV2 } from '../$2/SxcRootV2';

export interface Window { 
    $2: SxcRootV2;
    $2sxc: SxcController & SxcControllerInternals; 
}
