import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { SxcControllerInternals } from './SxcControllerInternals';
import { SxcController } from './SxcController';
import { SxcRootV2 } from '../$2/SxcRootV2';
declare function SxcController(id: number | HTMLElement, cbid?: number): SxcInstanceWithInternals;
export declare function buildSxcController(newRoot: SxcRootV2): SxcController & SxcControllerInternals;
export {};
