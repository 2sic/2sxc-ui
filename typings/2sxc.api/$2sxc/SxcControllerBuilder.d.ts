import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';
import { SxcControllerInternals } from './SxcControllerWithInternals';
import { SxcController } from './SxcController';
export interface Window {
    $2sxc: SxcController & SxcControllerInternals;
}
declare function SxcController(id: number | HTMLElement, cbid?: number): SxcInstanceWithInternals;
export declare function buildSxcController(): SxcController & SxcControllerInternals;
export {};
