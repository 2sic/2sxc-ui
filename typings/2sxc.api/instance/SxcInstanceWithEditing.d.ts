import { SxcInstance } from './SxcInstance';
import { SxcRootInternals } from '../SxcRoot/SxcRootInternals';
import { SxcRoot } from '../SxcRoot/SxcRoot';
export declare class SxcInstanceWithEditing extends SxcInstance {
    id: number;
    cbid: number;
    protected $2sxc: SxcRoot & SxcRootInternals;
    manage: any;
    constructor(id: number, cbid: number, $2sxc: SxcRoot & SxcRootInternals);
    isEditMode(): boolean;
}
