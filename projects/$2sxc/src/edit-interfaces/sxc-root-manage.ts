import { SxcInstanceWithInternals } from '../instance/SxcInstanceWithInternals';

export interface SxcRootManage {
    initInstance(sxc: SxcInstanceWithInternals): void;
}