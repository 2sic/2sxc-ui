import { SxcInstance } from './SxcInstance';
import { SxcControllerInternals } from '../$2sxc/SxcControllerInternals';
import { SxcController } from '../$2sxc/SxcController';
export declare class SxcInstanceWithEditing extends SxcInstance {
    id: number;
    cbid: number;
    protected $2sxc: SxcController & SxcControllerInternals;
    manage: any;
    constructor(id: number, cbid: number, $2sxc: SxcController & SxcControllerInternals);
    isEditMode(): any;
}
