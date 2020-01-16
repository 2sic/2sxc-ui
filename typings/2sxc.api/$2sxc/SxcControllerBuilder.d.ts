import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { SxcControllerInternals } from './SxcControllerInternals';
import { SxcController } from './SxcController';
declare function SxcController(id: number | HTMLElement, cbid?: number): SxcInstanceWithInternals;
export declare function buildSxcController(): SxcController & SxcControllerInternals;
export {};
