import { SxcInstance } from './SxcInstance';
import { Environment } from '../environment/Environment';
import { SxcControllerInternals } from '../$2sxc/SxcControllerWithInternals';
import { SxcController } from '../$2sxc/SxcController';
export declare class SxcInstanceWithEditing extends SxcInstance {
    id: number;
    cbid: number;
    protected $2sxc: SxcController & SxcControllerInternals;
    readonly env: Environment;
    manage: any;
    constructor(id: number, cbid: number, $2sxc: SxcController & SxcControllerInternals, env: Environment);
    isEditMode(): any;
}
