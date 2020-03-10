import { SxcInstanceWithInternals } from '../../../$2sxc/src';
import { EditManager } from '../manage/create';


export interface SxcIntanceEditable extends SxcInstanceWithInternals {
  manage: EditManager;
}
